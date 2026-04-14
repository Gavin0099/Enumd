🖥️ Windows 雙網卡企業分流設定 SOP（乙太公司內網＋Wi-Fi 外網）

- Wi-Fi：接外網（例：手機熱點、家用 AP、其他非公司網段）
- 需求： 公司內部所有 172.17.x.x 走乙太，其它流量都走 Wi-Fi

- DNS 請設公司內部 DNS（例：172.17.50.64、172.17.50.65）

- 連到外網（例：手機 AP、一般網路）

## 4. 確認現有 IP 狀態
- Wi-Fi 有正常對外 IP

## 5. 刪除多餘的 Default Gateway
> Windows 會自動把 default gateway 加在兩張卡上，這時外網會走 metric 小的那張（很容易走錯）。

## 6. 手動加回公司內網的 static route（分流）
### 標準指令（記得查乙太網卡的 interface index）

- 外網可通（只走 Wi-Fi gateway）


