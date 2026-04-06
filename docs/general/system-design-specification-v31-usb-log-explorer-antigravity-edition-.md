---
title: |
  System Design Specification v3.1: USB Log Explorer (Antigravity Edition)
domain_tags:
  - tools
task_tags:
  - install
  - spec
  - log
authority_level: source
is_deprecated: false
category: tools
notion_id: 2dc64f6b-c656-8000-8e7c-ccd489e93a2e
notion_url: >-
  https://www.notion.so/System-Design-Specification-v3-1-USB-Log-Explorer-Antigravity-Edition-2dc64f6bc65680008e7cccd489e93a2e
notion_updated_at: '2026-01-05T08:02:00.000Z'
exported_at: '2026-04-06T13:11:07.794Z'
is_summarized: false
relations: []
---

## 1. 專案概述 (Project Overview)
USB Log Explorer 是一個基於瀏覽器 (Client-side WASM) 的高效能日誌分析工具。它專門解決傳統 Text Log 難以閱讀 Vendor Command 的痛點，透過 Context-Aware Parsing 還原 USB 通訊語意，並利用虛擬捲動技術流暢展示數十萬行日誌。
### 1.1 核心原則 (Core Principles)
1. Vendor Command Awareness: 將晦澀的 HID Report Hex 還原為具體的 ISP, I2C, PD 語意。
1. No Guessing (不猜測): Replay Binary 匯出時，若 payload 不連續或中斷，直接捨棄該 Frame，確保資料正確性。
1. Performance First: 採用虛擬渲染 (Virtual Rendering)，確保在瀏覽器中能秒開 50MB+ 的文字檔。
1. Privacy: 全程本地執行 (Local Execution)，無伺服器上傳。
---
## 2. 資料真相模型 (Data Truth Model)
系統資料結構嚴格區分三個層次，UI 渲染與匯出邏輯需依此為準：
### Layer 1: HID_HDR (Event Layer)
- 定義: Log 中標示 _HidSetFeatureReport 或 _HidGetFeatureReport 的行。
- 功能: 確立事件發生的時間 (Timestamp)、執行緒 (Thread) 與方向。
- 狀態: 即使沒有 Payload，事件依然存在。
### Layer 2: HID_META (Semantic Layer)
- 定義: 從 Payload 前 8 bytes (Setup Packet) 解析出的五元組：(bmRequestType, bRequest, wValue, wIndex, wLength)。
- 屬性: 包含 SemanticConfidence (FULL/PARTIAL)。
- UI 行為: 只要 Meta 存在，UI 必須顯示對應的 Semantic Pill (e.g., ISP_WRITE).
### Layer 3: HID_RAW (Payload Layer)
- 定義: Log 中緊隨 HDR 之後的 Hex Dump 行。
- UI 行為: 預設摺疊/隱藏，僅在使用者勾選 "Show Hex Dump" 或匯出 Bin 時使用。
---
## 3. 核心資料結構 (Domain Models)
### 3.1 Constants & Enums
```javascript
from enum import IntFlag, auto, StrEnum

class LogTags(IntFlag):
    NONE = 0
    HUB = auto()      # 包含 Hub 關鍵字
    SCALER = auto()   # 包含 Scalar/ISP 關鍵字
    PD = auto()       # 包含 PD 關鍵字
    HID_HDR = auto()  # Event Row
    HID_RAW = auto()  # Payload Row
    ERROR = auto()    # Error Highlight

class CmdFamily(StrEnum):
    ISP = "ISP"
    I2C = "I2C"
    PD = "PD"
    SECURITY = "SEC"
    FUNC = "FUNC"
    UNKNOWN = "UNK"

class ReplayPolicy(StrEnum):
    SAFE = "SAFE"
    CAUTION = "CAUTION"     # UI 需顯示紅框 (e.g., Erase)
    FORBIDDEN = "FORBIDDEN" # 禁止匯出

class SemanticConfidence(StrEnum):
    FULL = "FULL"          # 完整 8-byte setup packet
    PARTIAL = "PARTIAL"    # 截斷
    INFERRED = "INFERRED"  # 文字推論
```
### 3.2 Data Classes
```javascript
@dataclass
class VendorCmd:
    """HID_META"""
    bmRequestType: int
    bRequest: int
    wValue: int
    wIndex: int
    wLength: int
    name: str          # e.g. "GL_REQUEST_ISP_WRITE"
    sub_op: str        # e.g. "FLASH_ERASE"
    family: CmdFamily
    replay_policy: ReplayPolicy
    confidence: SemanticConfidence

@dataclass
class LogEntry:
    """單行 Log 結構 (Memory Optimized)"""
    index: int
    timestamp: float | None
    time_str: str
    thread_id: str
    level: str
    message: str
    tags: int = 0
    
    # Optional Data Layers
    vendor_cmd: VendorCmd | None = None
    raw_payload: bytes | None = None
```
---
## 4. Vendor Command Registry (語意註冊表)
解析器需內建 Lookup Logic，將 bRequest + wValue 映射至語意。
### 4.1 關鍵映射規則 (Key Mappings)
- ISP (Critical):
- I2C: 0x78~0x7B (Novatek/MTK I2C).
- PD: 0xB4/0xB5 (Realtek PD Read/Write).
- Security: 0xA4 (CS_SIGN - FORBIDDEN for replay).
---
## 5. UI 實作規格 (Antigravity Implementation)
### 5.1 佈局架構 (Layout)
- Root: flex flex-col h-screen bg-gray-50
- Header (H: ~50px):
- Body: flex flex-1 overflow-hidden
### 5.2 虛擬列表 (Virtual Scrolling) 核心機制
為解決 DOM 效能瓶頸，必須實作 VirtualTable Class。
- 參數設定:
- DOM 結構:HTML
- 渲染邏輯 (on_scroll):
### 5.3 視覺編碼 (Visual Coding) - Semantic Pills
使用 _render_pill 函數在 Message 前方插入標籤。
- Style: inline-flex px-1.5 rounded border text-[9px] font-bold mr-2 uppercase
- 顏色映射:
---
## 6. 解析流程 (Parsing Pipeline)
### Stage A: Tokenize (Fast Pass)
- 使用 Regex 快速提取 Timestamp, Thread, Level, Raw Message。
- 支援格式：
### Stage B: Classify & Stitch (Context Pass)
1. Tagging: 標記 HID_HDR (_HidSetFeature...), HID_RAW (Hex Regex).
1. Stitching:
---
## 7. Replay Export 合約 (Strict Contract)
### 7.1 有效性檢查
匯出 usb_tx.bin 時，每個 Frame 必須通過檢查：
1. 必須有 HID_HDR (SetFeature)。
1. vendor_cmd.replay_policy != FORBIDDEN。
1. Payload 連續性: 緊隨 Header 後的 HID_RAW 行必須連續 (Offset 000, 010, 020...) 且無中斷。
1. Error Handling: 若 Payload 不完整，整筆捨棄，不得匯出部分資料。
---
## 8. 非功能需求 (SLO)
- 效能: 10MB Log 解析 < 3秒；Filter 切換 < 100ms。
- 相容性: 支援 Chrome / Edge (Chromium based)。
- 狀態: 無狀態設計 (Stateless)，F5 刷新後清空記憶體。
---
## 9. 測試驗證 (Acceptance Tests)
1. Rendering Test: 載入 50MB Log，快速捲動 Scrollbar，畫面不應卡頓或白屏 (驗證 Virtual Table)。
1. Semantic Test: 載入包含 0x83 0x01 的 Log，應顯示紅色的 [ISP: FLASH_ERASE] 標籤。
1. Filter Test: 勾選 "Hide HID Hex Dump"，所有 Hex 行應消失，且 Scrollbar 高度應自動重新計算縮短。
Disconnected fw update stress:
UI的部分:
