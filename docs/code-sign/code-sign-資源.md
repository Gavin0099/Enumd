---
title: Code Sign 資源
domain_tags:
  - code-sign
  - sdk
  - tools
  - security
task_tags:
  - code-sign
authority_level: derived
is_deprecated: false
category: code-sign
notion_id: e84fd949-7e1f-4991-b023-8081b7f802ff
notion_url: 'https://www.notion.so/Code-Sign-e84fd9497e1f4991b0238081b7f802ff'
notion_updated_at: '2025-08-20T02:34:00.000Z'
exported_at: '2026-04-06T13:12:22.976Z'
is_summarized: false
relations: []
---

目前有3種方式可以做到此功能
### eToken
此方式會提供usb dongle + SDK ，廠商會提供sample Tool + Sample Code + SDK，讓你自己做Sign Tool ，紅框的部分都要透過RD 實作
費用大概1~3W
### HSM(Hardware Security Module)
廠商應該會提供Tool & HSM 機器，讓你可以透過他們的Tool 來 signed bin file 
費用大概30~50W
## AWS CloudHSM
AWS CloudHSM 在 AWS 雲中提供硬件安全模塊。硬件安全模塊 (HSM) 是一種計算設備，它處理加密操作並為加密密鑰提供安全存儲。
當您使用來自 AWS CloudHSM 的 HSM 時，您可以執行各種加密任務：
- 生成、存儲、導入、導出和管理加密密鑰，包括對稱密鑰和非對稱密鑰對。
- 使用對稱和非對稱算法來加密和解密數據。
- 使用加密散列函數來計算消息摘要和基於散列的消息身份驗證代碼 (HMAC)。
- 對數據進行加密簽名（包括代碼簽名）並驗證簽名。
- 生成加密安全的隨機數據。
如果您想要一個用於創建和控制加密密鑰的託管服務，但您不想或不需要操作自己的 HSM，請考慮使用AWS Key Management Service.
費用未知
