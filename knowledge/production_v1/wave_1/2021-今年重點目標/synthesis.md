
2021 年的重點目標是整合 HP Enduser Tool、 General Enduser Tool 和 Standard ISP Tool 成為新的架構。在此過程中需要事先規劃好要測試的 HP Display Model 以及各種 code sign 方式，並在每週四的例會中檢視進度。[`目標是年底將 HP Enduser Tool、 General Enduser Tool、Standard ISP Tool 整合成新架構， 並且需事先規劃好，要測試哪些 HP Display Model、包含各種code sign方式； 將在每週四例會檢視進度。`]

3. 嘗試加入 SPD Log（一個較完整的開源 LOG 系統），取代原有的 LOG 系統。[`試著加入 SPD Log （Open source 中較完整的 LOG系統） ，取代原本的 LOG 系統。`]

- 使用 draw.io 繪製流程圖。[`流程圖可使用draw IO繪製。`]

在整合工具的過程中，需要了解 Genesys Logic Firmware 的安全簽署和驗證流程（Code Signing）。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`]


Genesys Logic 設計了一套內部簽署系統，使用 FIPS L3 認證的 USB eToken 硬體作為金鑰儲存，並搭配自行開發的 SDK 應用程式。[`我們選擇採用「經 FIPS L3 認證的 USB eToken 硬體，並搭配自行開發的 SDK 應用程式」方案。此方案將金鑰安全地儲存在防竄改硬體中，同時透過自研的金鑰管理系統（KMS）實現高度客製化的簽署流程與嚴格的稽核管控。`]

此外，也可以參考 3rd party code signing specification (ECDSA) 的相關文件，了解 Genesys Logic 的程式碼簽署和驗證流程。[`3rd party code signing specification (ECDSA)`]