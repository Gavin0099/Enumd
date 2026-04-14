2021 年重點目標報告

## 目標概述
2021 年的重點目標是將 HP Enduser Tool、 General Enduser Tool 和 Standard ISP Tool 整合成新的架構。在此過程中需要事先規劃好要測試的 HP Display Model 以及各種 code sign 方式。每週四的例會將檢視整合的進度。

## 閱讀書籍
為了達成上述目標，預計在 2.5 個月內閱讀完以下兩本書:
1. [設計模式的解析與活用](https://www.books.com.tw/products/0010844576)
2. [大話設計模式](https://www.books.com.tw/products/0010291950)

## 技術學習
除了閱讀書籍外，還需要學習並熟悉以下技術:
1. [Design pattern](https://zh.wikipedia.org/wiki/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)
2. C++11 常用部分

## 改善 LOG 系統
計劃嘗試將原有的 LOG 系統替換為 [SPD Log](https://github.com/SPDOfficial/SPDLog)，這是一個較為完整的開源 LOG 系統。

## 流程圖繪製
使用 [draw.io](https://app.diagrams.net/) 工具繪製流程圖。

## 其他方法論
此外，也計劃初步接觸以下方法論:
1. [戴明環 (PDCA)](https://zh.wikipedia.org/wiki/%E6%88%B4%E6%98%8E%E7%92%B0)
2. [Six Sigma](https://zh.wikipedia.org/wiki/Six_Sigma)
這些方法論可以幫助規劃並持續改善需求的執行過程。

## 相關背景知識
在完成上述目標的同時，也需要參考以下相關文件:
1. [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
2. [3rd party code signing specification (ECDSA)](code-sign/3rd-party-code-signing-specification-ecdsa.html)
3. [3rd party code signing specification (ECDSA)(EN)](code-sign/3rd-party-code-signing-specification-ecdsaen-.html)

這些文件描述了 Genesys Logic 為滿足 HP Code Signing 安全要求而設計的韌體簽署與驗證架構，以及相關的實作細節。