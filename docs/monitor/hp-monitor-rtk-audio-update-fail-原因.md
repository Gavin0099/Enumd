---
title: HP Monitor RTK Audio update fail 原因
domain_tags:
  - hub
  - driver
  - monitor
  - security
task_tags:
  - install
  - debug
authority_level: source
is_deprecated: false
category: hub
notion_id: 757eb512-ba9c-4b25-90d7-d248a961557a
notion_url: >-
  https://www.notion.so/HP-Monitor-RTK-Audio-update-fail-757eb512ba9c4b2590d7d248a961557a
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T13:16:03.606Z'
is_summarized: false
relations: []
---

## 現象
某些機器上會遇到 audio update fail 的現象，遇到此現象時RTK代理商阿信說明只要按照下面command 下，Audio 就可以正常update 
```c#
sc query rtsupx
sc stop rtsupx
sc delete rtsupx
```
## 真正原因
sc stop & stop delete 是刪除driver的服務，所以針對 rtsupxgoogle 看看 可以看到此driver的解釋
https://www.realtek.com/images/safe-report/Realtek_RtsUpx_Security_Advisory_Report.pdf
rtsupx 是 realtek 的 USB unility driver for Camera/Hub/Audio
代表這是Realtek Camera/Hub/Audio 都會用到的driver
透過sc query 可以看到 rtsupx  driver目前的狀態
audio & DSP update 時下sc query rtsupx
aduio & DSP update 後下 sc query rtsupx
看到的現象是 audio 時會安裝rtsupx driver ， update 後會把rtsupx driver移除掉
這時來看camera update 時的現象
camera update 時 sc query rtsupx
camera update 後 sc query rtsupx
看到的現象是 camera 時會安裝rtsupx driver ， update 後會並沒有把rtsupx driver移除掉
這時再做一次Audio update 就會 update fail ，所以可以確認rtsupx 沒有刪除的話下次audio initial 會認不到audio device
## 結論
camera 提供的dll檔必須要在update 後移除rtsupx driver ，應該就可以解決這個問題
