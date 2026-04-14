
# HP SDLC Master Compliance Checklist (2025 Edition)

本文件概述了 HP 在 2025 年版本的 SDLC 主要合規檢查清單。它涵蓋了從定義與架構到驗證與發布的整個軟體開發生命週期。

## 🏗️ Phase 1: 定義與架構 (Definition & Architecture)
### 3.1 安全需求定義 (Security Requirements)
- [PM/SW] 撰寫 [Security Requirements Document](https://en.wikipedia.org/wiki/Software_requirements_specification) 以定義軟體系統的安全需求。

### 3.2 資料清單 (Inventory of Data)
- [SW] 建立 [Data Inventory Document](https://www.sans.org/white-papers/33193/) 以詳細列出系統中處理的所有資料。

### 3.3 威脅建模 (Threat Modeling)

## 🛡️ Phase 2: 開發與自動化 (Dev & Automation)
### 3.4 生成式 AI 規範 (Generative AI)
- [PM] 準備合規證書 (Certificate of Compliance) 以確保生成式 AI 的使用符合相關法規和政策。

### 3.5 靜態掃描 (SAST)
- [SW] 執行 [SAST (Static Application Security Testing)](https://owasp.org/www-community/controls/Static_Code_Analysis) 以識別程式碼中的安全漏洞。

### 3.6 軟體成分分析 (SCA / SBOM)
- [SW] 執行 [SCA (Software Composition Analysis)](https://www.synopsys.com/software-integrity/security-testing/software-composition-analysis.html) 以識別使用的第三方軟體元件並生成 SBOM (Software Bill of Materials)。

### 3.7 模糊測試 (Fuzz Testing)
- [SW] 執行 [Fuzzing](https://owasp.org/www-community/Fuzzing) 以發現程式碼中的潛在缺陷和漏洞。

### 3.8 動態掃描 (DAST)
- [SW] 執行 [DAST (Dynamic Application Security Testing)](https://owasp.org/www-community/controls/Dynamic_Analysis_Security_Testing) 以識別運行時的安全問題。

## 🔒 Phase 3: 驗證與簽署 (Verify & Sign)
### 3.9 滲透測試 (Penetration Testing)

### 3.11 代碼簽章 (Code Signing) - ⚠️ 重點戰場
- [SW/DevOps] 建置 [Code Signing](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/code-signing) 流程以確保軟體的完整性和真實性。
- [SW] 實作 [Code Signing Verification](https://docs.microsoft.com/en-us/windows/win32/seccrypto/cryptography-tools) 以驗證軟體簽名。

## 📝 Phase 4: 合規與發布 (Compliance & Release)
### 3.10 日誌與隱私 (Logging Rules) - ⚠️ 紅線區
- [SW] 檢查程式碼以確保符合日誌和隱私規則。

### 3.12 韌體安全 (Firmware Security)
- (僅適用於 Mutable Firmware，不適用 OS Driver/App)
- [PM] 準備符合 [NIST SP 800-193](https://csrc.nist.gov/publications/detail/sp/800-193/final) 的合規證書 (PDF, 主管簽名)。
- [SW] 實作 Corruption/Recovery 的事件記錄 (Logging)。

### 3.13 維護與回應 (Maintenance)

總之，本文件概述了 HP 在 2025 年版本的 SDLC 主要合規檢查清單。它涵蓋了從定義與架構到驗證與發布的整個軟體開發生命週期,確保軟體系統的安全性和合規性。