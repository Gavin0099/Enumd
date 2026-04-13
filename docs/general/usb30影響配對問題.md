---
title: USB3.0影響配對問題
domain_tags:
  - hub
  - code-sign
  - tools
task_tags:
  - firmware-update
  - debug
  - code-sign
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: de97d58e-aa31-4cdd-8407-640927deb83a
notion_url: 'https://www.notion.so/USB3-0-de97d58eaa314cdd8407640927deb83a'
notion_updated_at: '2022-08-05T06:03:00.000Z'
exported_at: '2026-04-06T13:10:25.686Z'
is_summarized: false
relations:
  manual: []
  inferred:
    - target: windows
      title: windows
      path: ''
      type: same_domain
      confidence: low
      score: 0.2
    - target: hp_display_firmware_update_specification
      title: HP_Display_Firmware_Update_Specification
      path: /firmware/hp_display_firmware_update_specification.html
      type: tag_related
      confidence: medium
      score: 0.745264903150195
    - target: vendor
      title: vendor
      path: ''
      type: tag_related
      confidence: medium
      score: 0.6396514171100957
    - target: 2021部門創新提案
      title: 2021部門創新提案
      path: /general/2021部門創新提案.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: flutter
      title: Flutter
      path: /general/flutter.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: log分類
      title: Log分類
      path: /general/log分類.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: mt9052
      title: MT9052
      path: /general/mt9052.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: osdmanager
      title: OSDManager
      path: /general/osdmanager.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: vibe
      title: vibe
      path: ''
      type: tag_related
      confidence: medium
      score: 0.8818324653304117
    - target: w25x21cl
      title: w25x21cl
      path: ''
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: zeroplus_lap
      title: zeroplus_lap
      path: ''
      type: tag_related
      confidence: medium
      score: 0.562006756775364
    - target: 交叉評核作業
      title: 交叉評核作業
      path: /general/交叉評核作業.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 取消使用stdafxh
      title: 取消使用stdafxh
      path: ''
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 新架構導入新的chip
      title: 新架構導入新的chip
      path: ''
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 用bcgcontrolbar套用的ui在某些電腦上ui會錯誤的問題
      title: 用Bcgcontrolbar套用的UI在某些電腦上UI會錯誤的問題
      path: /general/用bcgcontrolbar套用的ui在某些電腦上ui會錯誤的問題.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 研發投扺專案資料列印流程
      title: 研發投扺專案資料列印流程
      path: /general/研發投扺專案資料列印流程.html
      type: tag_related
      confidence: medium
      score: 0.562006756775364
    - target: 自動化測試
      title: 自動化測試
      path: /general/自動化測試.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 自評
      title: 自評
      path: /general/自評.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: xcode
      title: xcode
      path: ''
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 如何在mac
      title: 如何在mac
      path: ''
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: vmware
      title: vmware
      path: ''
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: usbview
      title: usbview
      path: ''
      type: same_domain
      confidence: low
      score: 0.2
    - target: 工作目標
      title: 工作目標
      path: /general/工作目標.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: 新人參考資料
      title: 新人參考資料
      path: /general/新人參考資料.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: 短期行動
      title: 短期行動
      path: ''
      type: same_domain
      confidence: low
      score: 0.2
    - target: 遠端會議相關資料
      title: 遠端會議相關資料
      path: /general/遠端會議相關資料.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: usb31
      title: usb31
      path: ''
      type: same_domain
      confidence: low
      score: 0.2
    - target: z24ng3
      title: z24ng3
      path: ''
      type: same_domain
      confidence: low
      score: 0.2
---

### USB Container ID Capability Descriptor 
- 相同的USB Container ID Capability Descriptor：在mask code or 透過燒錄器燒錄 or code sign 的FW下回報的都是一樣，因此同時插入兩個hub會發生合併錯誤。過去ISP tool都是使用這種。
- 合併的流程
### Companion device
USB xHCI host controller回報的Companion device互相指到對方： tool曾經有用這種，後來遇到幾次host回報錯誤的資訊就不再使用。
- port 6的companion device在USB#ROOT_HUB30#XXX的port 22
- port 22的companion device在USB#ROOT_HUB30#XXX的port 6
- 錯誤案例
        HOST1的L1 USB2 hub沒有回報有companion，HOST2的L1 USB3 hub也沒有回報有companion，因此tool才把這兩個hub當成獨立的兩個裝置。
### port location
使用port location：PCB上的電路設計導致USB tree看到的L1/L2裝置的位置不對稱。遇到當下有想用更複雜的方式做合併hub，後來放棄複雜的做法，直接使用USB2就可以解決。
