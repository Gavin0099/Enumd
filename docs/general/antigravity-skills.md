---
title: '**antigravity skills**'
domain_tags:
  - general
task_tags:
  - install
  - config
authority_level: source
is_deprecated: false
category: general
notion_id: 2f064f6b-c656-80c9-8550-dde37514fef9
notion_url: 'https://www.notion.so/antigravity-skills-2f064f6bc65680c98550dde37514fef9'
notion_updated_at: '2026-01-26T10:27:00.000Z'
exported_at: '2026-04-12T16:21:11.357Z'
is_summarized: false
relations: []
---

[UNSUPPORTED_BLOCK: child_page]

**如果您經常需要 UI/UX 設計協助**：

- 在每個需要的專案中執行

  ```plain text
  uipro init --ai antigravity
  ```

- 這樣每個專案都有獨立的 skill 副本

- 可以使用  統一更新所有專案

  ```plain text
  uipro update
  ```

**如果只是偶爾使用**：

- 保持當前專案的安裝即可

- 需要時再到其他專案安裝

[UNSUPPORTED_BLOCK: child_page]

NaniTextbookSkill

```javascript
import requests
from bs4 import BeautifulSoup
import os
import time
import re
import urllib3
from typing import List, Tuple, Dict, Optional

# 忽略 SSL 警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class NaniTextbookSkill:
    """
    南一版國語生字 XML 下載技能
    功能：自動繞過 CSRF 防護，下載指定年級的生字資料
    """

    # --- 常數設定 ---
    BASE_URL = "https://pedia.cloud.edu.tw"
    LIST_URL_TEMPLATE = "https://pedia.cloud.edu.tw/Bookmark/Textword?year={year}_{sem}&degree={grade}&category=%E5%9C%8B%E8%AA%9E"
    DETAIL_URL_TEMPLATE = "https://pedia.cloud.edu.tw/Bookmark/TCollection?TextNameId={id}"
    EXPORT_URL = "https://pedia.cloud.edu.tw/Bookmark/Export"
    
    GRADE_MAP = {1: "一年級", 2: "二年級", 3: "三年級", 4: "四年級", 5: "五年級", 6: "六年級"}
    SEM_MAP = {1: "上學期", 2: "下學期"}

    def __init__(self, output_dir: str = "data_engineering/source_xmls/南一"):
        """
        初始化技能
        :param output_dir: 檔案存檔的根目錄
        """
        self.output_dir = output_dir
        self.session = requests.Session()
        self._setup_session()
        
        # 設定要抓取的學期年份配置
        # 格式: (學期代碼 1=上/2=下, 年份字串)
        self.semester_config = [
            (1, "114"), 
            (2, "113")
        ]

    def _setup_session(self):
        """設定 Session Headers 與偽裝"""
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Origin": "https://pedia.cloud.edu.tw",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        })

    def run(self, target_grades: List[int] = [1, 2, 3, 4, 5, 6]):
        """
        執行下載任務的主入口
        :param target_grades: 要下載的年級列表 (預設 1~6)
        """
        print(f"🚀 [NaniSkill] 開始執行下載任務...")
        print(f"📂 存檔路徑: {self.output_dir}")

        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

        total_downloaded = 0
        
        for grade in target_grades:
            total_downloaded += self._process_grade(grade)
            
        print(f"\n🎉 [NaniSkill] 全部完成！總計下載 {total_downloaded} 課。")

    def _process_grade(self, grade: int) -> int:
        """處理單一年級的所有學期"""
        grade_name = self.GRADE_MAP.get(grade, f"{grade}年級")
        print(f"\n📘 分析：{grade_name} ...")
        
        count = 0
        for sem_code, year in self.semester_config:
            sem_name = self.SEM_MAP.get(sem_code, "未知學期")
            
            # 建立學期資料夾
            save_dir = os.path.join(self.output_dir, grade_name, sem_name)
            if not os.path.exists(save_dir):
                os.makedirs(save_dir)
            
            # 取得列表並下載
            count += self._fetch_semester_lessons(grade, year, sem_code, sem_name, save_dir)
            
        return count

    def _fetch_semester_lessons(self, grade: int, year: str, sem_code: int, sem_name: str, save_dir: str) -> int:
        """抓取特定學期列表並觸發下載"""
        list_url = self.LIST_URL_TEMPLATE.format(year=year, sem=sem_code, grade=grade)
        download_count = 0

        try:
            resp = self.session.get(list_url, verify=False, timeout=10)
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            table = soup.find('table')
            if not table:
                if year != "114": # 114 沒資料通常是正常的
                    print(f"   ⚠️  {sem_name} (Year {year}) 無資料表格")
                return 0

            rows = table.find_all('tr')[1:] # 跳過標題
            
            for row in rows:
                row_text = row.get_text()
                # 再次確認是南一版
                if "南一" not in row_text: 
                    continue
                
                # 尋找含有 ID 的 td
                target_td = row.find('td', class_='textname')
                
                if target_td and 'id' in target_td.attrs:
                    text_id = target_td['id']
                    
                    # 抓標題
                    title_tag = target_td.find('strong')
                    if title_tag:
                        full_title = title_tag.get_text().strip()
                        safe_title = re.sub(r'[\\/*?:"<>|]', "", full_title)
                        
                        filename = f"{safe_title}.xml"
                        file_path = os.path.join(save_dir, filename)
                        
                        # 若檔案已存在，可選擇跳過 (這裡預設覆蓋)
                        # if os.path.exists(file_path): continue

                        print(f"   [{sem_name}] ⬇️  {safe_title} (ID:{text_id})...", end="")
                        
                        # 執行二段式下載
                        if self._download_file_secure(text_id, safe_title, file_path):
                            print(" 成功")
                            download_count += 1
                        else:
                            print(" 失敗")
                        
                        # 禮貌性延遲
                        time.sleep(0.5)
            
            if download_count > 0:
                print(f"   ✅  {sem_name} 共下載 {download_count} 課")
            
            return download_count

        except Exception as e:
            print(f"   ❌ 列表頁讀取錯誤: {e}")
            return 0

    def _download_file_secure(self, text_id: str, lesson_title: str, save_path: str) -> bool:
        """
        核心邏輯：二段式 Token 竊取 + POST 下載
        """
        detail_url = self.DETAIL_URL_TEMPLATE.format(id=text_id)
        
        try:
            # Step 1: GET 詳情頁拿 Token
            resp_detail = self.session.get(detail_url, verify=False, timeout=10)
            soup = BeautifulSoup(resp_detail.text, 'html.parser')
            
            form = soup.find('form', id='formExport')
            if not form:
                return False
            
            token_input = form.find('input', attrs={'name': '__RequestVerificationToken'})
            if not token_input:
                return False
                
            token = token_input['value']
            
            # 嘗試抓取 strName，若無則使用課名
            str_name_input = form.find('input', attrs={'name': 'strName'})
            str_name = str_name_input['value'] if str_name_input else lesson_title

            # Step 2: POST 提交表單
            payload = {
                "__RequestVerificationToken": token,
                "strName": str_name,
                "strShare": "",
                "textNameId": text_id,
                "isAllWords": "false",
                "createtype": "textbook",
                "s": "All"
            }
            
            headers = {
                "Referer": detail_url,
                "Content-Type": "application/x-www-form-urlencoded"
            }
            
            resp_post = self.session.post(self.EXPORT_URL, data=payload, headers=headers, stream=True, verify=False)
            
            if resp_post.status_code == 200:
                # 檢查是否為錯誤 HTML
                if "text/html" in resp_post.headers.get("Content-Type", ""):
                    return False
                
                with open(save_path, 'wb') as f:
                    for chunk in resp_post.iter_content(chunk_size=8192):
                        f.write(chunk)
                return True
            else:
                return False

        except Exception:
            return False

# --- 執行區 (當直接執行此檔案時) ---
if __name__ == "__main__":
    # 使用範例
    skill = NaniTextbookSkill()
    skill.run()
```

### 💡 如何使用這個 Skill

**方法 1：直接執行 (Standalone)**
這個檔案保留了 `if __name__ == "__main__":` 區塊，所以你可以直接像之前一樣執行它：

Bash

`py data_engineering/skills/nani_fetcher.py`

**方法 2：在其他腳本中引用 (Import)**
如果你有另一個 `main.py` 或自動化流程腳本，可以這樣呼叫：

Python

`from data_engineering.skills.nani_fetcher import NaniTextbookSkill

# 初始化 (可以指定存檔路徑)
downloader = NaniTextbookSkill(output_dir="./my_downloads")

# 執行下載 (可以指定只要下載特定年級)
downloader.run(target_grades=[1, 2])`

### 🧱 此版本的改進點

1. **封裝性 (Encapsulation)**：所有的 URL、Header、Session 邏輯都收斂在 class 內部，外部呼叫者不需要知道 CSRF Token 是怎麼破解的。

1. **可配置性 (Configurability)**：年級、存檔路徑都可以透過參數傳入。

1. **狀態管理 (State Management)**：`self.session` 會自動維持 Cookie，不需要在每個函式間傳遞。

1. **結構清晰**：區分了 `run` (主流程)、`_process_grade` (年級邏輯)、`_download_file_secure` (底層下載邏輯)，方便日後維護。
