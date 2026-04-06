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
relations: []
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
