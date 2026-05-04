$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$date = Get-Date -Format "yyyy-MM-dd"

$cli = Join-Path $repoRoot "artifacts/governance/daily-sources/cli-latest.json"
$cfu = Join-Path $repoRoot "artifacts/governance/daily-sources/cfu-latest.json"

if (!(Test-Path $cli)) {
  throw "Missing input file: $cli"
}
if (!(Test-Path $cfu)) {
  throw "Missing input file: $cfu"
}

Set-Location $repoRoot
python scripts/collect-ai-governance-daily.py --date $date --cli-json $cli --cfu-json $cfu --window-days 3
