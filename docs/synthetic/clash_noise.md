---
title: Synthetic Clash Noise Test
slug: synthetic-clash-noise-test
category: Testing
task_tags:
  - calibration
  - noise
  - firmware
  - hr
  - finance
notion_id: synthetic-001
authority_level: 1
integrity_band: MEDIUM
relations:
  manual: []
  inferred:
    - target: hub-auto-test-
      title: 'Hub Auto Test '
      path: /hub/hub-auto-test-.html
      type: same_domain
      confidence: low
      score: 0.25
    - target: hub-virtual-device-stress-test-
      title: 'Hub virtual device stress test '
      path: /hub/hub-virtual-device-stress-test-.html
      type: same_domain
      confidence: low
      score: 0.1875
    - target: hp-monitor-test-flow
      title: HP Monitor Test Flow
      path: /monitor/hp-monitor-test-flow.html
      type: same_domain
      confidence: low
      score: 0.21428571428571427
    - target: low_integrity_noise
      title: Synthetic Low Integrity Noise
      path: /synthetic/low_integrity_noise.html
      type: tag_related
      confidence: medium
      score: 0.9
---

This is a synthetic node designed to test Sonnet's discipline when encountering disparate categories (Firmware vs HR).

- Related to: [[mt9052]]
- Related to: [[2021部門創新提案]]
