用Bcgcontrolbar套用的UI在某些電腦上UI會錯誤的問題

在某些電腦上，check box、list item、close button等UI元件會出現顯示問題，如下圖所示。

問題出現的原因是，在Windows Display Setting中，如果將「文字、應用程式和其他項目的大小」設定為100%以上，就會導致此問題發生。


修改BCG API中的`EnableVisualManagerStyle`函數，將其參數從`TRUE, TRUE`改為`FALSE, TRUE`。

EnableVisualManagerStyle(FALSE, TRUE);

這樣做雖然可以解決UI顯示問題，但是UI將無法套用Visual Manager Style。

1. 在某些電腦上，如果Windows Display Setting中的「文字、應用程式和其他項目的大小」設定為100%以上，使用Bcgcontrolbar套用UI時會出現顯示問題。
2. 解決方案是修改BCG API中的`EnableVisualManagerStyle`函數，將其參數從`TRUE, TRUE`改為`FALSE, TRUE`。但這樣做會導致UI無法套用Visual Manager Style。