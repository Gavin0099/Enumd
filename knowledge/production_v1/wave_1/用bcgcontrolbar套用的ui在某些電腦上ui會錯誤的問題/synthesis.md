用Bcgcontrolbar套用的UI在某些電腦上UI會錯誤的問題

### 現象
在某些電腦上 check box, list item, close button 都會有UI顯示的問題。

### 原因
在 Windows Display Setting 裡面，如果變更「文字、應用程式和其他項目的大小」設定為 100% 以上，就會發生此問題。

### Re Try 過程
1. 檢查 BCG API 是否有問題。
2. 檢查程式碼寫法是否有問題。
[CHANGES_REQUESTED] 修改 DPI 感知並沒有用。

### 解法
修改 BCG API 裡面的 `EnableVisualManagerStyle` 函數:
```c
EnableVisualManagerStyle(TRUE, TRUE); -> EnableVisualManagerStyle(FALSE, TRUE);
```
但是這樣修改後的 UI 就沒有套上 Visual Manager style。

### 關鍵關係
1. 當 Windows Display Setting 中「文字、應用程式和其他項目的大小」設定為 100% 以上時，會導致 BCGControlBar 套用的 UI 出現錯誤。
2. 修改 `EnableVisualManagerStyle` 函數的參數可以解決 UI 錯誤的問題，但會導致 UI 沒有套上 Visual Manager style。

### 結論
本文提供了一個在某些電腦上 BCGControlBar 套用的 UI 會出現錯誤的問題，以及解決方案。關鍵在於修改 BCG API 中的 `EnableVisualManagerStyle` 函數參數。但這樣做會導致 UI 沒有套上 Visual Manager style，需要權衡取捨。