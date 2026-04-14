🖥️ Windows 雙網卡企業分流設定 SOP（乙太公司內網＋Wi-Fi 外網）

## 1. 基本前提
- 乙太網卡（有線）：接公司內網（例：172.17.x.x）
- Wi-Fi：接外網（例：手機熱點、家用 AP、其他非公司網段）
- 需求： 公司內部所有 172.17.x.x 走乙太，其它流量都走 Wi-Fi

## 2. 乙太網卡設定
- 建議用自動取得（DHCP），確保不會 IP 衝突
- DNS 請設公司內部 DNS（例：172.17.50.64、172.17.50.65）
- 預設閘道可以先不動（後續手動處理）

## 3. Wi-Fi 設定
- 連到外網（例：手機 AP、一般網路）
- 保持自動取得 IP（DHCP），default gateway 自動帶出

## 4. 確認現有 IP 狀態
```plain text
ipconfig /all
```
- 乙太網卡有拿到公司內網 IP
- Wi-Fi 有正常對外 IP
- 兩張卡皆為「已啟用」

## 5. 刪除多餘的 Default Gateway
> Windows 會自動把 default gateway 加在兩張卡上，這時外網會走 metric 小的那張（很容易走錯）。
### 步驟
1. 查出 default gateway 現況
1. 刪掉乙太網卡上的 default gateway（以你公司網段為例）

## 6. 手動加回公司內網的 static route（分流）
### 標準指令（記得查乙太網卡的 interface index）
1. 查 interface index
1. 加回分流路由

## 7. 驗證
- 公司內網可通（例：）
- 外網可通（只走 Wi-Fi gateway）
- 再次 `route print`

## 8. 維護與常見陷阱提醒
- 拔插網線、重開機，有時 default gateway 會自動回來，要重做第 5 步
- 設定錯 interface（沒加 IF），會讓內網流量跑錯卡
- 公司 DHCP/網管如果鎖 MAC，靜態 IP 可能進不去，請與 IT 配合

## 疑難排解
- 169.254.x.x：代表線沒插好或沒拿到 DHCP，請先修好物理層
- 「路由新增失敗: 元素找不到」：必須 interface 有 gateway 才能加分流路由，先加回 default gateway 再加分流，再刪 default gateway

### 適用場景
- 企業雙網卡分流、筆電內外網同時保持、同時跑 VPN 不影響外網、混合辦公/外派工程師等