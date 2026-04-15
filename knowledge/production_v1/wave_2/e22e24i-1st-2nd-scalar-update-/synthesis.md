
# E22/E24i 1st & 2nd Scalar Update


在 `[GLHub]` 區塊中, 我們定義了兩組 `USB20SupportPidVid` 和 `USB30SupportPidVid` 參數。這是為了讓同一個型號的顯示器可以支援不同代工廠的 Update Tool。根據不同的 PID/VID, 會指向 `Foundries_1` 或 `Foundries_2` 區塊來載入對應的參數。[Code-Sign 技術規格文件 (整合版)](path/to/code-sign-技術規格文件-整合版.html)中提到, 後續新 IC 如果在 Flash Block 構成或 Bank 切割方式上改動, `GL code sign info` 中 bit6=0 的「跟隨 FW 起始 Block」規則可能直接失效, 需要預留 fallback。

在 `Foundries_1` 和 `Foundries_2` 區塊中, 我們定義了 `Scaler1stBinFiles` 和 `Scaler2ndBinFiles` 參數。這是為了根據讀取到的 panel type 和 scaler hw version, 選擇合適的 scaler bin 檔案。由於 1st 和 2nd scaler 共用同一個 panel type 參數, 為了包含所有可能用到的 panel type, 沒用到的 panel type 會用 `***` 表示, 以便跳過。

## LNT E22 G4 和 E24i G4

針對 LNT 代工的 E22 G4 和 E24i G4 型號, 我們定義了 1st 和 2nd scalar 的 bin 檔案路徑。這些 bin 檔案包含了不同面板型號的 scaler 韌體。

## Qisda E22 G4 和 E24i G4

針對 Qisda 代工的 E22 G4 和 E24i G4 型號, 我們同樣定義了 1st 和 2nd scalar 的 bin 檔案路徑。


為了讓同一個型號的顯示器可以在不同代工廠之間相容, 我們在 `[GLHub]` 區塊中加入了多組 `USB20SupportPidVid` 和 `USB30SupportPidVid` 參數。這樣可以根據不同的 PID/VID 指向 `Foundries_1` 和 `Foundries_2` 區塊, 載入對應的參數。

另外, 我們在 `Foundries_1` 和 `Foundries_2` 區塊中定義了 `Scaler1stBinFiles` 和 `Scaler2ndBinFiles` 參數。這是為了根據讀取到的 panel type 和 scaler hw version, 選擇合適的 scaler bin 檔案。由於 1st 和 2nd scaler 共用同一個 panel type 參數, 為了包含所有可能用到的 panel type, 沒用到的 panel type 會用 `***` 表示, 以便跳過。


[Code-Sign 技術規格文件 (整合版)](path/to/code-sign-技術規格文件-整合版.html)中提到, 後續新 IC 如果在 Flash Block 構成或 Bank 切割方式上改動, `GL code sign info` 中 bit6=0 的「跟隨 FW 起始 Block」規則可能直接失效, 需要預留 fallback。這是未來需要考慮的一個潛在風險。