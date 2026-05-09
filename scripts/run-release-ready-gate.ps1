param(
  [string]$RevRange = "HEAD~1..HEAD",
  [switch]$Staged,
  [string]$PipelineRunId = ""
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot
$pythonExe = "C:\Users\daish\AppData\Local\Programs\Python\Python312\python.exe"
if (!(Test-Path $pythonExe)) {
  $pythonExe = "python"
}

Write-Host "[release_ready_gate] start"

# Step 1: P3-1 schema_evolution evidence draft generation (non-blocking scaffold)
if ($Staged) {
  & $pythonExe scripts/generate-schema-evolution-evidence.py --staged
} else {
  & $pythonExe scripts/generate-schema-evolution-evidence.py --rev-range $RevRange
}

# Step 2: P3-2 post pipeline evidence summary (always generate artifact)
if ([string]::IsNullOrWhiteSpace($PipelineRunId)) {
  $PipelineRunId = (Get-Date -Format "yyyyMMddTHHmmssZ")
}
if ($Staged) {
  & $pythonExe scripts/post-pipeline-evidence-summary.py --staged --pipeline-run-id $PipelineRunId
} else {
  & $pythonExe scripts/post-pipeline-evidence-summary.py --rev-range $RevRange --pipeline-run-id $PipelineRunId
}

# Step 3: P2-2 pre-release promotion gate (blocking)
& $pythonExe scripts/check-release-promotion-gate.py
$gateExit = $LASTEXITCODE

Write-Host "[release_ready_gate] done gate_exit=$gateExit"
exit $gateExit
