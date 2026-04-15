

目前針對「直接更新」與「Disconnected 更新」的差異，希望能優化直接更新的效率。在直接更新時，如果需要更新負責的 Scaler 或 PD 等元件，CMD (命令) 順序會變為：`Tool → HID → USB Hub → I2C → Scaler`。

想將「直接更新」與「Disconnected 更新」的流程合併，觀察其速度與效率是否能提升。具體做法是不論採用哪種更新方式，一律將韌體 (FW) 先搬移至 USB Hub 的 Flash。如果是「直接更新」，再由 Tool 端發送指令，請 USB Hub 開始將 FW 從 Flash 搬移到後端的元件。

如果要實施此優化且不破壞原有的順序，或許可以結合下述的「同步更新」功能會更易於實作。這部分需要與您們進一步討論可行性。

此功能先前已與 Bernie 討論過。未來希望將此功能專注導入於 Disconnected 更新部分。這樣做既可避免修改到 FW 本身，同時也能強化 Disconnected 更新的優勢。

此功能打算採用 549pm 進行實作。

上次已與 Gavin 討論過調整資料夾放置其他 Framework 的事宜。後續請協助整理，並將相關說明寫入文件中，以利後續提供給 ODM 參考。

另外想再次確認 macOS 版本的 Disconnected FW Update 功能是否已完成？如果尚未，後續我們也許可以用 732xk 來進行 POC。

此外，想請您們開發後續壓力測試的 Tool，讓 ODM 可以做降板升版測試。

## Linux SDK 文件準備
請貴司協助整理 Linux 部分相關的 SDK 開發文件說明。

[未有直接 Source 錨點，待確認] 我方將開始接洽幾家廠商進行後續的整合開發工作。

1. [`Camera 透過我們驗證 code sign`](./camera-透過我們驗證-code-sign.html)
2. [`Code sign Flow`](./code-sign-flow.html)
3. [`HID Code Sign 記錄`](./hid-code-sign-記錄.html)