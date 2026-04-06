---
title: Lenovo FWUpdateTool
category: general
notion_id: 0a4adf45-3d44-46b3-8c3a-f927d5d12261
notion_url: 'https://www.notion.so/Lenovo-FWUpdateTool-0a4adf453d4446b38c3af927d5d12261'
notion_updated_at: '2026-01-21T09:28:00.000Z'
exported_at: '2026-04-06T11:24:31.970Z'
is_summarized: false
---

# ISP by Part Number (料號)
## 說明
Lenovo有T27q-20與T24i-2L兩種model, 但每個model都有使用MTK和RTK的scaler, 同一個scaler下又可能分不同的panel, 而每個panel用的FW都不相同. 如果使用原始的Command Line Tool, 需要每一種都包一個Tool, 而且螢幕外觀都一樣, 可能無法分辨要用哪一包Tool, 因此Lenovo希望我們能只出一包Tool, 可以同時更新各種不同組合
## 實作方法
Lenovo的螢幕, 可以透過DDCCI的方式問到一些資訊, 其中有一項是料號(Part Number). 每一個不同的Panel會有不同的料號, 不同Panel的料號不會一樣, 因此可以藉由料號的方式來決定要更新的資訊
## 文件與程式
客戶提供的投影片
下DDCCI的程式, 需透過治具, 指令可參考上方投影片
## Command Line Tool設定
### GLhub.ini
[Scaler]
MStar_Scaler: 這部份一定要設定, 但可以隨便指定, 只是要讓程式有讀到東西, 不然還沒到ISP就會出現error, 真正的chip會在另一個檔案做設定
CheckPartNumber: 設為1才會開啟用Part Number燒錄的功能
I2cWriteLength: 此為RTK專用, 指定每一筆Write最多寫多少
[RTDxxxx]: RTK Scaler的設定, 與其他Tool設定都一樣, 只要有用到的Scaler Chip都要設定在GLHub.ini
### PartNumber.ini
以下範例為兩組, 可以自行修改, 設定幾組都可以
[XXX.XXXXX.XXXX]: 料號, 長度固定為14, 格式的說明在上方投影片Page7有詳細介紹
BinFile: Bin檔路徑
IspStartAddress: 燒錄在flash內的開始位置
Flag1, Flag2: UserFlag的值, 通常是0xAA55
FlagAddress: UserFlag燒錄的位置
ScalerChip: RTK或MTK的Scaler chip type, 如果是RTK的Scaler, 設定的內容需要在GLHub.ini內有對應的設定 
## 程式流程
Step0: Command Line Tool下/pu開始流程, 會從GLHubUpdateTool_Lenovo.cpp的ManualUpdateScalerByPartNumber()開始
Step1: 先問料號, 函式為RealtekScalerCtrl和CMStarScalerCtrl class內的GetPartNumber(), 程式會顯示問到的料號
Step2: 根據料號去PartNumber.ini內找對應的Section, 如果沒找到, 顯示錯誤訊息並結束程式
Step3: 找到對應的料號, 進入RealtekScalerCtrl和CMStarScalerCtrl的Isp()內
Step4: 兩個class都會呼叫ReadIniSetting(), 在ReadIniSetting()後需要根據PartNumber.ini的內容讀取燒錄的資訊
Step5: 繼續燒錄流程至結束
