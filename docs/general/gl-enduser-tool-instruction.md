---
title: GL EndUser Tool Instruction
category: general
notion_id: 834f7a65-41b7-4ed3-b3b1-a9d1f605cb39
notion_url: >-
  https://www.notion.so/GL-EndUser-Tool-Instruction-834f7a6541b74ed3b3b1a9d1f605cb39
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:22:22.537Z'
is_summarized: false
---

GL EndUser Tool ini 參數
# 如何修改程式Icon
程式的左上角與左方的Icon是可以更換或是新增的, 請參考以下步驟
例如現在要新增TypeA+C.ico的新圖
1. 將要新增的Icon放到res資料夾內
2. 回到Visual Studio內, 開啟GLISPDocking.rc, 找到Icon段落並新增一個ID
3. 開啟resource.h, 新增ID
下方的也要_APS_NEXT_RESOURCE_VALUE記得修改, 要比剛剛新增的數字+1
4. 開啟IconDefine.h, 新增一個新的Type
5. 開啟ISPDockingDlg.cpp, 找到InitializeIconOnUi(), 加入以下code
6. 以上就完成新增的流程, 之後要換Icon, 只要去IconDefine.h修改ICON_TYPE後面的值即可
