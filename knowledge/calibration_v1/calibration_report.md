# Model Calibration Benchmark Report (A/B Audit)

This report compares Claude 3 Haiku vs 3.5 Sonnet across stratified samples.

| Slug | Class | Topology | Noise | Haiku Sent. | Sonnet Sent. | Manual Winner | Over-synthesis? | Compare |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| mt9052 | Class | RECOVERABLE | HIGH | 1 | 1 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\mt9052) |
| 憑證檔案 | Class | RECOVERABLE | HIGH | 1 | 1 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\憑證檔案) |
| mtk-3rd-send-usb-hub-isp-event | Class | RECOVERABLE | HIGH | 1 | 1 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\mtk-3rd-send-usb-hub-isp-event) |
| mtk-scaler-update-flow | Class | STABLE_AT_A | HIGH | 28 | 28 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\mtk-scaler-update-flow) |
| p32p-30-reset-scaler-command | Class | RECOVERABLE | HIGH | 4 | 4 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\p32p-30-reset-scaler-command) |
| secure-firmware-recovery | Class | STABLE_AT_A | HIGH | 32 | 32 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\secure-firmware-recovery) |
| hp-mandatory-firmware-update-strategy-expansion-for-future-projects | Class | STABLE_AT_A | HIGH | 45 | 45 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\hp-mandatory-firmware-update-strategy-expansion-for-future-projects) |
| 2021部門創新提案 | Class | STABLE_AT_A | HIGH | 7 | 7 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\2021部門創新提案) |
| synthetic-clash-noise-test | Class | RECOVERABLE | HIGH | 3 | 3 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\synthetic-clash-noise-test) |
| synthetic-low-integrity-noise | Class | ISOLATED | HIGH | 7 | 7 | [ ] | [ ] | [View A/B](knowledge\calibration_v1\synthetic-low-integrity-noise) |


## Evaluation Instructions
1. Inspect each A/B pair.
2. Check for **Over-synthesis**: Did Sonnet create logical links that aren't in the raw context dump?
3. Decide the **Model Winner** for that specific condition.