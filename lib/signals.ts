/**
 * Signal Schema v2.3 - Trusted Evidence Production System
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
  };
  source: {
    page_id: string;
    last_edited_time?: string;
    extracted_at: string;
  };
  metrics: {
    blocks: Record<string, BlockMetrics>;
    unknown_blocks: BlockMetrics;
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
  private metrics: ExtractionSignal["metrics"] = {
    blocks: {},
    unknown_blocks: { seen: 0, fully_rendered: 0, degraded_rendered: 0, dropped: 0 },
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

  /**
   * INVARIANT: Always call this at the ENCOUNTER of a block, regardless of render success.
   */
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

  public registerDrop(type: string) {
    if (this.metrics.blocks[type]) {
      this.metrics.blocks[type].dropped += 1;
    } else {
        this.metrics.unknown_blocks.dropped += 1;
    }
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

  public getSignal(): ExtractionSignal {
    return {
      metadata: {
        schema_version: "2.3",
        extractor_version: "enumd-notion-exporter/1.0.0",
        timestamp: new Date().toISOString()
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
