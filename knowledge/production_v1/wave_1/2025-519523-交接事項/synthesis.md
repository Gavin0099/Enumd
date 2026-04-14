以下為 2025 5/19~5/23 交接事項的綜合報告:

# 2025 5/19~5/23 交接事項


1. Richelieu Issue @Adam.Chen
2. Lenovo P27QD-40 @Standy Huang
3. Lenovo Mac One Key Update tool @Bernie.Hsieh
4. GLBin @Adam.Chen
5. HP Silent mode bat檔修改 @Adam.Chen
6. GenX AMD 7P Dragon Range Hub


1. [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
   - 告知如何Erase Camera 的方式 —> verify fail 要 erase 掉
   - 告知如何 Read Camera data —> hub security model 必須要 read 到 update 的 data 才可以算出hash
   - 告知我們所有的 update flow 以及相對應的文件，讓我們控制整個update

2. [Etoken System Code View](code-sign/etoken-system-code-view-.html)
   - 連線工作流程使用 detach 且無生命週期收斂,違反可預測關閉原則
   - 檔案大小與外部命令執行缺乏邊界控制,存在資源與執行風險
   - SQL 注入風險、shutdown race / UAF 風險、OOM/卡死風險

3. [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
   - HID update flow
   - Vendor Command 第二碼
   - 驗證 USB LOGO 問題
   - FW UPD 已經是 open source 了,但 SW 目前 Build 不起來,無法測試
   - 檢查不同 OS 平台（ex：mac, linux, chrome book）

1. **Richelieu Issue @Adam.Chen**
   - 需要瞭解 Richelieu 相關的問題,並確保在交接過程中能夠順利解決。

2. **Lenovo P27QD-40 @Standy Huang**
   - 需要瞭解 Lenovo P27QD-40 的相關情況,並確保在交接過程中能夠順利處理。

3. **Lenovo Mac One Key Update tool @Bernie.Hsieh**
   - 需要瞭解 Lenovo Mac One Key Update tool 的相關情況,並確保在交接過程中能夠順利處理。

4. **GLBin @Adam.Chen**
   - 需要瞭解 GLBin 的相關情況,並確保在交接過程中能夠順利處理。

5. **HP Silent mode bat檔修改 @Adam.Chen**
   - 需要瞭解 HP Silent mode bat檔修改的相關情況,並確保在交接過程中能夠順利處理。

6. **GenX AMD 7P Dragon Range Hub**
   - 需要瞭解 GenX AMD 7P Dragon Range Hub 的相關情況,並確保在交接過程中能夠順利處理。

在交接過程中,需要仔細瞭解上述各個重點,並確保能夠順利處理相關的技術和流程問題。同時,也需要注意與 [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)、[Etoken System Code View](code-sign/etoken-system-code-view-.html) 和 [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html) 等相關的背景知識,以確保交接過程中能夠順利進行。