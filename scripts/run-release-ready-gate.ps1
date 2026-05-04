param(
  [string]$RevRange = "HEAD~1..HEAD",
  [switch]$Staged,
  [string]$PipelineRunId = ""
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host "[release_ready_gate] start"

# Step 1: P3-1 schema_evolution evidence draft generation (non-blocking scaffold)
if ($Staged) {
  python scripts/generate-schema-evolution-evidence.py --staged
} else {
  python scripts/generate-schema-evolution-evidence.py --rev-range $RevRange
}

# Step 2: P3-2 post pipeline evidence summary (always generate artifact)
if ([string]::IsNullOrWhiteSpace($PipelineRunId)) {
  $PipelineRunId = (Get-Date -Format "yyyyMMddTHHmmssZ")
}
if ($Staged) {
  python scripts/post-pipeline-evidence-summary.py --staged --pipeline-run-id $PipelineRunId
} else {
  python scripts/post-pipeline-evidence-summary.py --rev-range $RevRange --pipeline-run-id $PipelineRunId
}

# Step 3: P2-2 pre-release promotion gate (blocking)
python scripts/check-release-promotion-gate.py
$gateExit = $LASTEXITCODE

Write-Host "[release_ready_gate] done gate_exit=$gateExit"
exit $gateExit
