---
title: 新架構導入新的chip update(MT9052) 方式
domain_tags:
  - tools
task_tags:
  - firmware-update
  - spec
  - config
authority_level: source
is_deprecated: false
category: tools
notion_id: dc170d85-7218-4ab6-a2a2-d91478f1f3e8
notion_url: 'https://www.notion.so/chip-update-MT9052-dc170d8572184ab6a2a2d91478f1f3e8'
notion_updated_at: '2022-12-19T06:16:00.000Z'
exported_at: '2026-04-06T13:10:15.551Z'
is_summarized: false
relations: []
---

以command line 新增mcu 的 MT9052 為例

- command line 
1. GlModel.cpp 裡面的FW_INDICATE_NAME
1. SupportCtrl.h 加上要update的.h檔
1. MT905xMcuCtrl.h 要繼承 IspCtrl
1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要導入MT9052 update 功能
1. GLHubUpdateTool.cpp 裡面的ManualUpdateFwNew 時就可以透過這些設定導到mt9052 mcu update
1. DeviceAgent.cpp 裡面的 UpdateFw
1. DeviceAgent.cpp 裡面的 IspFlash
1. MT905xMcuCtrl.cpp 裡面的 Isp
