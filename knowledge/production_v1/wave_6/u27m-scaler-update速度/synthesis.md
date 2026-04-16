
# U27m Scaler Update速度

`[U27m Scaler Update速度](u27m-scaler-update速度.html)`

本文件探討了 U27m Scaler 韌體更新的速度優化過程。主要包括以下幾個關鍵點:

1. **Scaler bin Size**: 1536260 bytes
3. **RTK Hub Update 時間**


## RTK Hub Update 時間
- RTK Hub Update 時間 = 1236000 / 240 = 5150 ms


[未有直接 Source 錨點，待確認] 1. **WaitStatusReady 優化**:
   - 原先做法是先等 5 ms 再確認 Flash 是否 Ready
   - 現在改為直接確認 Flash 是否 Ready，若沒有 Ready 再等 300 us 後再確認一次
   - 寫入一個 Sector (4K Bytes) 需要寫 16 次,約 80 ms,共 380 個 Sector,可以節省約 30 秒

2. **Erase 後 Blank Check 優化**:
   - 原先 Erase 完會檢查是否 Flash 資料都被清空 (Blank Check)
   - 現在可以省略這個步驟,因為每個 Sector 都有 Retry 機制,Erase、Write、Read、Verify,如果 Verify 錯誤就會重新 Erase
   - 讀取一個 Sector (4K Bytes) 大約 230 ms,1.5 MB 大約 380 個 Sector,可以節省約 88 秒

- 原先時間: 14:13:36.223
- 優化後時間: 14:09:36.152

- Genesys Logic (GL) Scaler: 1536260 bytes / 237 s = 6482.1 bytes/s
- RTK Hub: 1236000 bytes / 240 s = 5150 bytes/s
- 速度比: 6482.1 / 5150 = 1.258 倍
