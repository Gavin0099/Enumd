---
title: USB Device Class
domain_tags:
  - monitor
task_tags:
  - spec
authority_level: source
is_deprecated: false
category: monitor
notion_id: 09bb5fc6-5513-451f-9f7e-59b09e159483
notion_url: 'https://www.notion.so/USB-Device-Class-09bb5fc65513451f9f7e59b09e159483'
notion_updated_at: '2020-04-29T08:28:00.000Z'
exported_at: '2026-04-06T13:16:53.374Z'
is_summarized: false
relations: []
---

多數的USB 裝置與其他的裝置會有類似的功能，當有許多裝置的屬性或是行為相近時，便會把此產品歸為一類，定義成一套相同的協定。
03h Human Interface Device
HID 裝置包含 滑鼠,鍵盤,遊戲搖桿等等，主機端接收資料為人類輸入，如按鈕或滑鼠移動，主機必須對這些動作反應夠快，使用者才覺得沒有延遲
HID 資料傳輸都是透過定義好的資料結構，稱為 報告記述(Report)—>簡稱 報告，報告中的使用標籤，為告知主機或裝置如何使用接收到的資料
e.g.: Usage Page = 0x09 表示一個按鍵，Usage ID 為告知哪個鍵被按壓
HID Usage Table 有各項裝置的數值
1. Class Definition for Physical Interface Device(PID) 輸入會產生力回饋的搖桿
1. The Monitor Control 定義顯示器使用者控制和電源管理的數值
1. Usage Table for HID Power Device 定義了 UPS 與主機能夠監控的電池設備
1. Point of Sale (POS) Usage Table 定義條碼機，秤重裝置與磁帶讀卡機數值
HID 通信 —> 透過 控制傳輸或是中斷傳輸來通信，以報告(Report)來交換資料
輸入報告，輸出報告 —> 採用 控制傳輸 or 中斷傳輸
特徵報告 —> 控制傳輸
報告敘述表格會定義每個報告的大小和報告資料的使用值
敘述表格
機能介面表格
bInterfaceClass = 0x03
bInterfaceClass 指出HID 是否支援一種啟動的協定 (Boot Protocol)
開機 or 報告協定
# 1.HID Device 能力
主要能力和限制
a.所有資料交換儲存在固定長度的結構，稱為報告(Report)，主機藉由控制傳輸或中斷傳輸來要求或接收報告
b.HID 必須有一個中斷IN端點，用來送出輸入報告(Input Reports)
c.一個 HID裝置必須最多一個中斷 IN & OUT 端點，僅有多機能介面的複合性裝置(Composite Device)才有多個中段端點
d.中斷IN端點送資料給主機的時間是不可預期的
e.g: 主機端無法知道使用者什麼時候去按鍵盤，只能透過
I.主機 polling 方式
II.USB 3. 0 SS—>送 ERDY 交易封包給主機，告知有資料要送
e.資料交換的速率有差
慢速和中斷端點: 800 byte /s
全端端點: 64K Byte / s
預設機能介面端點 :64K Byte / s
端點(EndPoint)
HID 傳輸模式與典型用法
報告(Report)
HID 在 報告敘述表格(Report Description)
輸入報告:必須項目
輸出報告 & 特徵報告:選擇性項目
控制傳輸
提供6個類別相依的專屬命令
中斷傳輸
提供了另外一種交換資料的傳輸方式，特別是接收器需要讀取週期性資料或是最低延遲的場合
如果是介面非常忙碌，控制傳輸有可能會被延遲，但是中斷傳輸擁有頻寬上的保證
敘述表格(Description)
HID 敘述表格會告知主機和裝置通信該知道的需求
主機在列舉時，會送出 Get Description 要求組態表格
Report Description
char ReportDescriptor[50] = {
0x05, 0x01, // USAGE_PAGE (Generic Desktop) —>裝置的一般功能，像是 通用桌面控制，遊戲控制，字母數字顯示等等 如果是廠商定義
HID Usage Tables文件，提供了不同Usage Page數值，如果是廠商定義的，會在
0xFF00 ~ 0xFFFF
0x09, 0x02, // USAGE (Mouse) —>指定了 Usage Page 各項功能，如通用桌面控制的用途，包括滑鼠，搖桿，鍵盤等等
0xa1, 0x01, // COLLECTION (Application) —> 一群項目的集合，該群項目就是用來共同實現單一的功能，例如鍵盤或滑鼠等等
0x09, 0x01, // USAGE (Pointer)
0xa1, 0x00, // COLLECTION (Physical)
0x05, 0x09, // USAGE_PAGE (Button)
0x19, 0x01, // USAGE_MINIMUM (Button 1)
0x29, 0x03, // USAGE_MAXIMUM (Button 3)
0x15, 0x00, // LOGICAL_MINIMUM (0)
0x25, 0x01, // LOGICAL_MAXIMUM (1)
0x95, 0x03, // REPORT_COUNT (3)
0x75, 0x01, // REPORT_SIZE (1)
0x81, 0x02, // INPUT (Data,Var,Abs)
0x95, 0x01, // REPORT_COUNT (1)
0x75, 0x05, // REPORT_SIZE (5)
0x81, 0x03, // INPUT (Cnst,Var,Abs)
0x05, 0x01, // USAGE_PAGE (Generic Desktop)
0x09, 0x30, // USAGE (X)
0x09, 0x31, // USAGE (Y)
0x15, 0x81, // LOGICAL_MINIMUM (-127)
0x25, 0x7f, // LOGICAL_MAXIMUM (127)
0x75, 0x08, // REPORT_SIZE (8)
0x95, 0x02, // REPORT_COUNT (2)
0x81, 0x06, // INPUT (Data,Var,Rel)
0xc0, // END_COLLECTION
0xc0 // END_COLLECTION
};
Collection 包含下面項目
- 廠商定義的 Usage
- 一個 Logical Minimum & Logical Maximun，指定了報告的數值範圍，從0~255
- Report Size 資料傳輸的位元數
- Report Count 報告含有的資料項目數目
- 指定是輸入(0x81) , 輸出(0x91) , 特徵報告(0xB1)
HID 相關命令
# 2.HID Device 報告
報告(Report) 可能是一個簡單的位元緩衝器，也有可能是一個複雜的項目組合，具有指定的功能和單元，本章示範如何來製作出報告，來迎合特定的需求
HID 報告的構造(Report Structure)
報告敘述表格提供了HID送收資料的訊息，敘述表格確認了
1.裝置的功能
2.報告資料的用法和單位
3.控制項目是一個按鈕,開關或其他實體物
4.資料項目敘述了報告傳送的數值
控制與資料項目數值
項目格式(Item Format)
