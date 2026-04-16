

Lenovo 正在與 TPV 合作開發一款新的 HID 裝置。為了讓 TPV 提供的驗證工具能夠正確識別這個 HID 裝置,需要修改 Hub 韌體的 `usage_page` 和 `usage` 參數。

1. 根據 TPV 提供的資訊,需要修改 Hub 韌體的 `usage_page` 和 `usage` 參數,以便 TPV 的驗證工具能夠正確識別 HID 裝置。[`3rd party code signing specification (ECDSA)`](/code-sign/3rd-party-code-signing-specification-ecdsa.html)
2. TPV 將提供修改過的驗證工具,供 Lenovo 進行驗證。

[未有直接 Source 錨點，待確認] 1. 由於這次 demo 不需要導入程式碼簽署,因此暫時不需要執行程式碼簽署的流程。

Lenovo 正在與 TPV 合作開發新的 HID 裝置,需要修改 Hub 韌體的參數以便 TPV 的驗證工具能夠正確識別。目前暫時不需要導入程式碼簽署,但未來如果需要,可以參考 Genesys Logic 的相關文件。