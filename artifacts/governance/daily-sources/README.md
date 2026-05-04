Place daily input JSON files here before 23:00:
- cli-latest.json
- cfu-latest.json

Task Scheduler will read these two files and run:
python scripts/collect-ai-governance-daily.py --date <today> --cli-json ... --cfu-json ...
