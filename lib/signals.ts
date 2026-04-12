import { CAPABILITY_BASELINE, TargetFidelity } from "./capabilities";

/**
 * Signal Schema v2.4 - Trusted Evidence Production System
 */

export interface BlockMetrics {
  seen: number;
  fully_rendered: number;
  degraded_rendered: number;
  dropped: number;
}

export interface FidelityMetric {
  total: number;
  preserved: number;
}

export interface ExtractionSignal {
  metadata: {
    schema_version: string;
    extractor_version: string;
    timestamp: string;
    validation?: {
      core_support_regressions: string[];
      has_failures: boolean;
      invariant_ok: boolean;
      audit_log: string[];
      integrity_report: {
        band: "HIGH" | "MEDIUM" | "LOW";
        reasons: string[];
      };
      coverage_alignment?: {
        source: "fixture_locked" | "discovered_source" | "none";
        expected_total?: number;
        discovered_total?: number;
        extracted_seen_total: number;
        by_type: Record<string, { 
          expected?: number; 
          discovered?: number; 
          extracted: number;
          delta: number;
          classification: "aligned" | "missing_in_extraction" | "unexpected_extra";
        }>;
      };
    };
  };
  source: {
    page_id: string;
    last_edited_time?: string;
    extracted_at: string;
  };
  metrics: {
    blocks: Record<string, BlockMetrics>;
    unknown_blocks: BlockMetrics;
    render_errors: string[];
    dropped_reasons: Record<string, string[]>;
    structure: {
      max_depth: number;
      truncated: boolean;
    };
  };
  fidelity: {
    rich_text: Record<string, FidelityMetric>;
    lossy_elements: Record<string, FidelityMetric>;
  };
}

export class SignalCollector {
  private startTime: string;
  private expectedCounts: { total?: number; byType?: Record<string, number> } = {};
  private discoverySource: "fixture_locked" | "discovered_source" | "none" = "none";
  private discoveryCounts: { total: number; byType: Record<string, number> } = { total: 0, byType: {} };
  
  private metrics: ExtractionSignal["metrics"] = {
    blocks: {},
    unknown_blocks: { seen: 0, fully_rendered: 0, degraded_rendered: 0, dropped: 0 },
    render_errors: [],
    dropped_reasons: {},
    structure: { max_depth: 0, truncated: false }
  };
  private fidelity: ExtractionSignal["fidelity"] = {
    rich_text: {
      links: { total: 0, preserved: 0 },
      bold: { total: 0, preserved: 0 },
      italic: { total: 0, preserved: 0 },
      strikethrough: { total: 0, preserved: 0 },
      underline: { total: 0, preserved: 0 },
      code: { total: 0, preserved: 0 }
    },
    lossy_elements: {
      mention: { total: 0, preserved: 0 },
      equation: { total: 0, preserved: 0 },
      synced_block: { total: 0, preserved: 0 }
    }
  };

  constructor(private pageId: string, private lastEditedTime?: string) {
    this.startTime = new Date().toISOString();
  }

  public registerEncounter(type: string) {
    if (!this.metrics.blocks[type]) {
      this.metrics.blocks[type] = { seen: 0, fully_rendered: 0, degraded_rendered: 0, dropped: 0 };
    }
    this.metrics.blocks[type].seen += 1;
  }

  public registerUnknownEncounter() {
    this.metrics.unknown_blocks.seen += 1;
  }

  public registerSuccess(type: string) {
    if (this.metrics.blocks[type]) {
      this.metrics.blocks[type].fully_rendered += 1;
    }
  }

  public registerDegradation(type: string) {
    if (this.metrics.blocks[type]) {
      this.metrics.blocks[type].degraded_rendered += 1;
    } else {
        this.metrics.unknown_blocks.degraded_rendered += 1;
    }
  }

  public registerDrop(type: string, reason: string = "unclassified") {
    if (this.metrics.blocks[type]) {
      this.metrics.blocks[type].dropped += 1;
    } else {
        this.metrics.unknown_blocks.dropped += 1;
    }
    
    if (!this.metrics.dropped_reasons[type]) {
      this.metrics.dropped_reasons[type] = [];
    }
    this.metrics.dropped_reasons[type].push(reason);
  }

  public registerError(type: string, message: string) {
    this.metrics.render_errors.push(`[${type}] ${message}`);
  }

  public assertCoverage(source: "fixture_locked" | "discovered_source", counts: { total?: number, byType?: Record<string, number> }) {
      this.discoverySource = source;
      this.expectedCounts = counts;
  }

  public setDiscoveryData(total: number, byType: Record<string, number>) {
      this.discoveryCounts = { total, byType };
      if (this.discoverySource === "none") this.discoverySource = "discovered_source";
  }

  public addFidelity(category: 'rich_text' | 'lossy_elements', key: string, total: number, preserved: number) {
    const target = category === 'rich_text' ? this.fidelity.rich_text : this.fidelity.lossy_elements;
    if (!target[key]) {
      target[key] = { total: 0, preserved: 0 };
    }
    target[key].total += total;
    target[key].preserved += preserved;
  }

  public updateDepth(depth: number) {
    if (depth > this.metrics.structure.max_depth) {
      this.metrics.structure.max_depth = depth;
    }
  }

  public setTruncated(truncated: boolean) {
    this.metrics.structure.truncated = truncated;
  }

  public validateInvariants(): { ok: boolean; log: string[] } {
    const log: string[] = [];
    let ok = true;

    Object.entries(this.metrics.blocks).forEach(([type, m]) => {
      const sum = m.fully_rendered + m.degraded_rendered + m.dropped;
      if (m.seen !== sum) {
        ok = false;
        log.push(`FATAL_INVARIANT_DRIFT: Accounting mismatch for [${type}]. Seen=${m.seen}, Sum=${sum}`);
      }
      
      if (m.dropped > 0 && (!this.metrics.dropped_reasons[type] || this.metrics.dropped_reasons[type].length < m.dropped)) {
          ok = false;
          log.push(`FATAL_INVARIANT_DRIFT: Missing dropped reasons for [${type}]. Dropped=${m.dropped}, Reasons=${this.metrics.dropped_reasons[type]?.length || 0}`);
      }
    });

    const unknownSum = this.metrics.unknown_blocks.fully_rendered + this.metrics.unknown_blocks.degraded_rendered + this.metrics.unknown_blocks.dropped;
    if (this.metrics.unknown_blocks.seen !== unknownSum) {
      ok = false;
      log.push(`FATAL_INVARIANT_DRIFT: Accounting mismatch for unknown_blocks. Seen=${this.metrics.unknown_blocks.seen}, Sum=${unknownSum}`);
    }

    if (ok) log.push("All invariants satisfied.");
    return { ok, log };
  }

  public getSignal(): ExtractionSignal {
    const regressions: string[] = [];
    const reasons: string[] = [];
    let extractionSeenTotal = this.metrics.unknown_blocks.seen;
    const typeAlignment: Record<string, { expected?: number; discovered?: number; extracted: number; delta: number; classification: any }> = {};

    Object.entries(this.metrics.blocks).forEach(([type, metric]) => {
      extractionSeenTotal += metric.seen;
      
      const target = CAPABILITY_BASELINE[type];
      if (target === "fully_supported" && (metric.degraded_rendered > 0 || metric.dropped > 0)) {
        regressions.push(type);
        reasons.push(`core_support_regression: ${type}`);
      }

      // v2.7.1 Detailed Classification
      const discovered = this.discoveryCounts.byType?.[type] || 0;
      const delta = metric.seen - discovered;
      let classification: "aligned" | "missing_in_extraction" | "unexpected_extra" = "aligned";
      if (delta < 0) classification = "missing_in_extraction";
      else if (delta > 0) classification = "unexpected_extra";

      typeAlignment[type] = {
          expected: this.expectedCounts.byType?.[type],
          discovered,
          extracted: metric.seen,
          delta,
          classification
      };

      if (classification !== "aligned") {
          reasons.push(`coverage_alignment_mismatch [${type}]: ${classification} (delta ${delta})`);
      }
    });

    const audit = this.validateInvariants();
    if (!audit.ok) {
        reasons.push(...audit.log);
    }
    if (this.metrics.render_errors.length > 0) {
        reasons.push(`render_errors_present: ${this.metrics.render_errors.length} errors`);
    }

    // Integrity Band Logic
    let band: "HIGH" | "MEDIUM" | "LOW" = "HIGH";
    if (!audit.ok || regressions.length > 0) band = "LOW";
    else if (this.metrics.render_errors.length > 0 || Object.values(typeAlignment).some(v => v.classification !== "aligned")) {
        band = "MEDIUM";
    }

    return {
      metadata: {
        schema_version: "2.7.1",
        extractor_version: "enumd-notion-exporter/1.5.0",
        timestamp: new Date().toISOString(),
        validation: {
          core_support_regressions: regressions,
          has_failures: this.metrics.render_errors.length > 0,
          invariant_ok: audit.ok,
          audit_log: audit.log,
          integrity_report: {
              band,
              reasons
          },
          coverage_alignment: {
              source: this.discoverySource,
              expected_total: this.expectedCounts.total,
              discovered_total: this.discoverySource === "discovered_source" ? this.discoveryCounts.total : undefined,
              extracted_seen_total: extractionSeenTotal,
              by_type: typeAlignment
          }
        }
      },
      source: {
        page_id: this.pageId,
        last_edited_time: this.lastEditedTime,
        extracted_at: this.startTime
      },
      metrics: JSON.parse(JSON.stringify(this.metrics)),
      fidelity: JSON.parse(JSON.stringify(this.fidelity))
    };
  }
}
