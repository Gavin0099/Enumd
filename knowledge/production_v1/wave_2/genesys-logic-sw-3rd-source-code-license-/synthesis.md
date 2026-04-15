報告書：Genesys Logic SW 3rd Source Code License

本報告旨在概述 Genesys Logic 公司針對第三方開源軟體所採用的各類授權模式。根據提供的上下文資訊,Genesys Logic 主要使用以下五種開源授權:

1. GNU General Public License 2.0（GPL）
2. GNU Lesser General Public License 2.1（LGPL）
3. BSD License（BSD）
4. MIT License（MIT）
5. Apache License 2.0（Apache 2.0）

這些授權模式各有不同的特點和使用場景,涵蓋了從嚴格的 copyleft 到寬鬆的 permissive 授權範疇。Genesys Logic 根據具體的軟體需求和開發目標,靈活選用適合的授權方式,以確保公司的知識產權得到適當的保護,同時也能充分利用開源社區的成果,加速產品開發進度。

### GNU General Public License 2.0（GPL）
[GNU General Public License 2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)是一種強大的 copyleft 授權,要求所有衍生作品必須採用相同的 GPL 授權。這種授權模式可確保開源軟體的源代碼永遠保持開放,但也對商業應用帶來一定限制。

### GNU Lesser General Public License 2.1（LGPL）
[GNU Lesser General Public License 2.1](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html)是 GPL 的一種寬鬆版本,允許開發者在閉源應用中使用 LGPL 授權的軟體庫,而無需將整個應用開源。這種授權適用於希望最大化開源貢獻,同時又需要保護商業利益的場景。

### BSD License（BSD）
[BSD License](https://opensource.org/licenses/BSD-3-Clause)是一種非常寬鬆的 permissive 授權,僅要求在使用、修改或重新發佈時保留原作者版權聲明。這種授權模式為開發者提供了極大的自由度,適用於希望最大化軟體普及率的場景。

### MIT License（MIT）
[MIT License](https://opensource.org/licenses/MIT)與 BSD 授權非常相似,同樣屬於 permissive 類型。MIT 授權的主要特點是簡潔明了,為開發者提供了極大的靈活性。

### Apache License 2.0（Apache 2.0）
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)是一種兼具 copyleft 和 permissive 特點的授權模式。它要求在修改或重新發佈時保留原作者版權聲明,同時也允許在閉源應用中使用 Apache 2.0 授權的軟體。這種授權平衡了開源貢獻和商業利益的需求。

## 與 Genesys Logic 韌體簽署相關的上下文
根據提供的相關背景資訊,Genesys Logic 在實現韌體安全簽署和驗證流程時,需要滿足以下關鍵要求:

1. 所有簽署操作必須符合 FIPS 140-2 Level 3 安全標準。
2. 採用 ECDSA nistp256 加密演算法進行數位簽章。

為了實現這些安全合規性要求,Genesys Logic 選擇使用 FIPS L3 認證的 USB eToken 硬體作為金鑰儲存設備,並開發了自有的 SDK 應用程式來管理簽署流程。這種方案不僅能夠確保金鑰的安全性,還能實現高度客製化的簽署工作流程和嚴格的稽核管控。

Genesys Logic 公司在使用第三方開源軟體時,靈活採用了 GPL、LGPL、BSD、MIT 和 Apache 2.0 等多種授權模式,以滿足不同產品和業務需求。同時,Genesys Logic 在實現韌體安全簽署流程時,也充分考慮了 FIPS 140-2 Level 3 的合規性要求,並採用了 ECDSA 數位簽章演算法和 FIPS L3 認證的 eToken 硬體設備,建立了一套兼具成本效益、可擴展性和災難恢復能力的內部簽署系統。