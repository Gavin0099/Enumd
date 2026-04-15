以下是根據提供的內容所撰寫的 HP End User Tool 封裝方式的文件報告:

# HP End User Tool 封裝方式


## PackageForTheWeb400
`[PackageForTheWeb400](./tools/hp-end-user-tool-封裝方式.html#packageforweb400)`

## InstallShield
`[InstallShield](./tools/hp-end-user-tool-封裝方式.html#installshield)`
- 提供 script 作客製化設定

`[Ini parameter description](./tools/hp-end-user-tool-封裝方式.html#ini-parameter-description)`
1. **Model Name**: 可設定 Update Tool 的標題
2. **USB20SupportPidVid & USB30SupportPidVid**: 填入監控裝置的 PID VID 用於初步判斷
3. **Hub File Name**: 需要更新的 Bin 檔案名稱
4. **Panel Type**: 顯示器面板類型，可填入多種面板類型
5. **BinFiles**: 對應不同面板的 Scaler 韌體 Bin 檔案名稱
6. **Mstar_Scaler**: Scaler 晶片型號，需填入正確的型號以進行更新

## PackageForTheWeb400 封裝流程
`[PackageForTheWeb400](./tools/hp-end-user-tool-封裝方式.html#packageforweb400)`
1. 安裝 PackageForTheWeb v400 工具
3. 啟動 PackageForTheWeb4 並依照精靈步驟設定自動解壓縮安裝檔
