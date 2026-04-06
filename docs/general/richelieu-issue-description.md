---
title: Richelieu Issue description
category: general
notion_id: 1f164f6b-c656-8056-9297-d483c45380a5
notion_url: >-
  https://www.notion.so/Richelieu-Issue-description-1f164f6bc65680569297d483c45380a5
notion_updated_at: '2026-01-21T09:37:00.000Z'
exported_at: '2026-04-06T11:21:47.461Z'
is_summarized: false
---

## 需求
目前客戶所使用的 Dock 裝置為兩層 Hub 串接架構，並透過燒錄器進行 Hub 韌體更新。然而，由於燒錄器在燒錄過程中未個別處理每層 Hub 的 Container ID，導致兩層 Hub 擁有相同的 Container ID。在此情況下，Windows 系統會將兩層 Hub 下方連接的 SSD 或 HDD 裝置皆誤判為掛載於上層（L1）Hub 底下，進而造成辨識錯誤或操作異常。
我們發現若改以 standard ISP 工具進行更新後，系統即可正確辨識各層 Hub 的 Container ID 並回復正常。因此，客戶希望我們提供一套包含 command line 工具及 PowerShell 腳本的解決方案，用以協助在更新後自動修正 Container ID，避免此類識別問題再次發生。
## 問題點
- 找不到Device ，推測是driver 安裝問題，提供 GUI 版本讓客戶先移除driver 
- update 成功後，客戶回覆說    Container ID   還是一樣，
### 工廠端執行環境問題回報
### 問題描述
當將工具部署至客戶工廠端電腦後，出現以下異常情況：
- 在客戶的 CMD 視窗中，路徑中的反斜線 \ 被顯示為日圓符號 ¥
- 執行時發生錯誤代碼 -1073741819
## ✅ 解決方式：將執行階段程式庫設定從 /MD 改為 /MT
### 原設定（/MD）：
- 多執行緒 DLL（/MD）：程式在執行時會依賴外部的 MSVCP140.dll / MSVCP140D.dll 等 C++ runtime DLL。
- 問題：若使用 debug DLL (MSVCP140D.dll)，部署到沒有安裝 Debug Runtime 的機器上，會導致：
### 修改後設定（/MT）：
- 多執行緒靜態連結（/MT）：將 C++ runtime library 直接編譯進可執行檔中。
- 好處：
---
### 建議補充說明段落（可加在文件中）
> 本次 crash 問題主要是由 /MD 設定導致執行時載入 Debug Runtime（如 MSVCP140D.dll），造成 mutex 尚未初始化即被鎖定，進而導致 0xC0000005 存取違規錯誤。將 C++ 執行階段程式庫設定調整為 /MT 可避免外部相依性，提升穩定性並簡化部署。
## 重build 一版後
