---
title: Standard ISP Tool Instruction
domain_tags:
  - hub
  - tools
task_tags:
  - firmware-update
  - log
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: c6f35602-b97c-4100-9228-308b63473a1c
notion_url: >-
  https://www.notion.so/Standard-ISP-Tool-Instruction-c6f35602b97c41009228308b63473a1c
notion_updated_at: '2026-01-21T09:24:00.000Z'
exported_at: '2026-04-12T16:13:59.689Z'
is_summarized: false
relations: []
---

[UNSUPPORTED_BLOCK: child_page]

[UNSUPPORTED_BLOCK: child_database]

註: PdCount與ISPType的功用

程式在開啟時, 會先下C0 A9 0A去問PD的ISP Type與PD count, 當有問到結果時, 會以問到的為結果, 而忽略這兩項設定

但有可能板子上的Hub FW沒支援C0 A9 0A的指令, 因此問不到東西時, 就會以INI內的這兩個設定為主

舉例來說, 如果程式一開始下C0 A9 0A問到PD的ISP Type為I2C, PD count為1, 之後燒錄PD就會走I2C, UI上的PD也只會有一個欄位可以選, 這時候INI這兩個欄位不管怎麼設定都不會有差別

[UNSUPPORTED_BLOCK: child_page]

## BU5 / SW Standard ISP Tool 改版會議記錄

[UNSUPPORTED_BLOCK: link_to_page]

[UNSUPPORTED_BLOCK: link_to_page]

---

## 介面 - 2020/12/24

- **Dialog**

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/d4fcc0c2-d648-47ca-9d0b-b388d71a4420/UI6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDF4WISA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHeswvEUQXWs323PI9kbUWZboYcqUnhQmkPhsK17xUpoAiEAwdbiLqZbQHKfm5DMRcyd0%2FoHIG%2FbG6Y0NE0QY3QjGO0q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDGhOy9G8WJMj4N3aeSrcA0Sg78B7UfbLTgf7R6eL3zNNjAP2hPjVLpoBNAwU4quJ6oMukws65iXg2VCSpUZ0s%2FTYVQ3T6VVkWFKqWgCOWmG1NRDJ5Ozce77COVcBato1c67Xr%2FaP7Jw4Oq92fi29wuXxazSLQh30tHD7ko%2F7cDYFn0uAM1%2FRoek2v5x1UYdBR%2ByylPjF6BDpkvO2mXq1kk9PqZWsdoLX0kbswi8ZwCFkr6n1u5cJLgByKv724fJb8mswvfBJuahZB8z92VTK6r1MrX4wX9oAlq%2F2i2%2BSAoWiD8j93WuqUaTKrc%2FPvHBKffoVpXpRdYlWxmfC%2FRBe5hMK%2B6dUMI9lyODgX8flFkH5XAwNQ3JkKsMkZwYrH4eEXwv2nhHfBNOgZJNE95Qy%2FlQ0odvKy5fz1AHtz5Xt3d%2BGHTSxhcpzvs36iw6TEn1C5A%2BAjIwTqs4O%2FmyhUkFkQvF0Ir%2FH20l2JGfsw3KZglj2oJi5WlI6kzJozWA%2FcT5lfKDiU0JryRQ6EJ3UfK%2BWASXIzclz9g%2Bx%2BjCKQvgi5UvGyhy3hP2d2vTdJStn%2Bm58N%2FZpiM%2BtWYHgj7iUazwtyVUYHFKkGjOgHQoNOgM8qABIUqq%2FmffYw0rhoSNw2ueEZucjAkubF82BrXwnMJyQ7s4GOqUB2KkLQAKvjCcw5Y2eYjBBtnc5qyJlJDuExzvWaFg1256OxIlth2LjP%2BHUf5KOJIB%2BBK2NV%2BMXnTo%2BZSgeOA%2FDOLhH1wARR2puFJCptsMrN9JukqiR4QHHw3fi%2BaL2h3BdiOoS32v7mLnBt8Wlq2ARldHCZ14E2Xe9C4iT21dFZjW1cF9Vhe7h7SRMW0s%2FuLgGdzmzpKBFkgIFJYf4d8asBBiIqiWv&X-Amz-Signature=56927306bf7b56afa22b7cb95c3908cdf8035b84005cb2995c54da65ea7c951d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **Main menu**

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/4d17a53d-3a1c-45c1-ad1a-aebdf0cb9960/mainmenu_-_Setting.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDF4WISA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHeswvEUQXWs323PI9kbUWZboYcqUnhQmkPhsK17xUpoAiEAwdbiLqZbQHKfm5DMRcyd0%2FoHIG%2FbG6Y0NE0QY3QjGO0q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDGhOy9G8WJMj4N3aeSrcA0Sg78B7UfbLTgf7R6eL3zNNjAP2hPjVLpoBNAwU4quJ6oMukws65iXg2VCSpUZ0s%2FTYVQ3T6VVkWFKqWgCOWmG1NRDJ5Ozce77COVcBato1c67Xr%2FaP7Jw4Oq92fi29wuXxazSLQh30tHD7ko%2F7cDYFn0uAM1%2FRoek2v5x1UYdBR%2ByylPjF6BDpkvO2mXq1kk9PqZWsdoLX0kbswi8ZwCFkr6n1u5cJLgByKv724fJb8mswvfBJuahZB8z92VTK6r1MrX4wX9oAlq%2F2i2%2BSAoWiD8j93WuqUaTKrc%2FPvHBKffoVpXpRdYlWxmfC%2FRBe5hMK%2B6dUMI9lyODgX8flFkH5XAwNQ3JkKsMkZwYrH4eEXwv2nhHfBNOgZJNE95Qy%2FlQ0odvKy5fz1AHtz5Xt3d%2BGHTSxhcpzvs36iw6TEn1C5A%2BAjIwTqs4O%2FmyhUkFkQvF0Ir%2FH20l2JGfsw3KZglj2oJi5WlI6kzJozWA%2FcT5lfKDiU0JryRQ6EJ3UfK%2BWASXIzclz9g%2Bx%2BjCKQvgi5UvGyhy3hP2d2vTdJStn%2Bm58N%2FZpiM%2BtWYHgj7iUazwtyVUYHFKkGjOgHQoNOgM8qABIUqq%2FmffYw0rhoSNw2ueEZucjAkubF82BrXwnMJyQ7s4GOqUB2KkLQAKvjCcw5Y2eYjBBtnc5qyJlJDuExzvWaFg1256OxIlth2LjP%2BHUf5KOJIB%2BBK2NV%2BMXnTo%2BZSgeOA%2FDOLhH1wARR2puFJCptsMrN9JukqiR4QHHw3fi%2BaL2h3BdiOoS32v7mLnBt8Wlq2ARldHCZ14E2Xe9C4iT21dFZjW1cF9Vhe7h7SRMW0s%2FuLgGdzmzpKBFkgIFJYf4d8asBBiIqiWv&X-Amz-Signature=39b44ae15259a1f8834e85ccf2aefcbfdfd7ae3effbd8c7a7f93c50f76dae258&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/a012004a-b504-46b6-aecb-631e610c3178/mainmenu_-_Configuration.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDF4WISA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHeswvEUQXWs323PI9kbUWZboYcqUnhQmkPhsK17xUpoAiEAwdbiLqZbQHKfm5DMRcyd0%2FoHIG%2FbG6Y0NE0QY3QjGO0q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDGhOy9G8WJMj4N3aeSrcA0Sg78B7UfbLTgf7R6eL3zNNjAP2hPjVLpoBNAwU4quJ6oMukws65iXg2VCSpUZ0s%2FTYVQ3T6VVkWFKqWgCOWmG1NRDJ5Ozce77COVcBato1c67Xr%2FaP7Jw4Oq92fi29wuXxazSLQh30tHD7ko%2F7cDYFn0uAM1%2FRoek2v5x1UYdBR%2ByylPjF6BDpkvO2mXq1kk9PqZWsdoLX0kbswi8ZwCFkr6n1u5cJLgByKv724fJb8mswvfBJuahZB8z92VTK6r1MrX4wX9oAlq%2F2i2%2BSAoWiD8j93WuqUaTKrc%2FPvHBKffoVpXpRdYlWxmfC%2FRBe5hMK%2B6dUMI9lyODgX8flFkH5XAwNQ3JkKsMkZwYrH4eEXwv2nhHfBNOgZJNE95Qy%2FlQ0odvKy5fz1AHtz5Xt3d%2BGHTSxhcpzvs36iw6TEn1C5A%2BAjIwTqs4O%2FmyhUkFkQvF0Ir%2FH20l2JGfsw3KZglj2oJi5WlI6kzJozWA%2FcT5lfKDiU0JryRQ6EJ3UfK%2BWASXIzclz9g%2Bx%2BjCKQvgi5UvGyhy3hP2d2vTdJStn%2Bm58N%2FZpiM%2BtWYHgj7iUazwtyVUYHFKkGjOgHQoNOgM8qABIUqq%2FmffYw0rhoSNw2ueEZucjAkubF82BrXwnMJyQ7s4GOqUB2KkLQAKvjCcw5Y2eYjBBtnc5qyJlJDuExzvWaFg1256OxIlth2LjP%2BHUf5KOJIB%2BBK2NV%2BMXnTo%2BZSgeOA%2FDOLhH1wARR2puFJCptsMrN9JukqiR4QHHw3fi%2BaL2h3BdiOoS32v7mLnBt8Wlq2ARldHCZ14E2Xe9C4iT21dFZjW1cF9Vhe7h7SRMW0s%2FuLgGdzmzpKBFkgIFJYf4d8asBBiIqiWv&X-Amz-Signature=845a1da196ae01741ce27d476667bb83ce857216dd08c596f0183084aae13717&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **Dump / Erase Flash**

[UNSUPPORTED_BLOCK: column_list]

[UNSUPPORTED_BLOCK: column]

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/7b1d23b5-6005-40d4-a46a-3ab79474ac8f/UI7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6REK3NJ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFLYtGqyTJiALn5eGSIA4R%2FddBrkPgaU%2BbD%2FCaUOoymFAiAOd9ral%2B8Zko9l2HUZFrrOnhh9EPKV3NOZw8YXB3fB8Sr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMp%2FKuWrpgfmmtslgNKtwDFUHSWe111rJUs9Kr%2FnvL%2BOde4D3yyAmHlfiLnGzsuxZf%2BnqznsWh7jzBiNYx1Zv8umgFEItKNev3THas%2FCaK7L3GQkzALf3SaxEhffGPel%2FP%2BnJ8fdOWl4Blnfc6vC4pkNCgtUiEFuhxL1vP0o7DnD5zUbucO%2FyKR7XAnAnLkktLvVLQWr26MssZQrGLgRYrElDLFonWF151tbOKnsnDJj3SOoM%2F1l8%2FS35n6pUrKq4%2F%2BZ2ttQzOjICq942zN9vB5gB6bvGwVrBji1rvAatMF2BPkAvzrDML4eR5UGpTeuFb%2Fr5sxBFpIanb7xFgV0PihfAPxgUNUQbVFjTKyItc9w%2BxURw0d%2FmC5r5BZ40oVfnLLHbXrxFfMv4Q8GDsfpm5A84n2V%2B1T3C31ScrwRsZmKrHiuVja3wj9HdFqreND93UQ2WpBxXQPVzO%2FAds%2BszitLeDoMPEkLT4nxXg6ZwWwx0EZbxQfXONssz8odQfU7P8ePtTA6TJ0ZD8N6kV7GPWscxGzoXj4xFe2X4hrT3GWl2wwJ%2FVxoIS7q3OyO8ZZRM5a1kyykXf9z%2FzvzMQJ5KXAprRCG9Ji%2B6GNo8UmSlNlkXyDa5pLUzCUzicySAK8QlkXm1aERTFYNbpQL4wubfuzgY6pgFeTeANP6n4uPDflBZkRz%2FZO%2B6garb%2FtGqtv0g%2Fkwxe57AYdAe01msEBavx5bKtmhGcYFFs%2FMV%2F%2F1mc%2BGBDsDVDKBT8zqwC3y4Bl1PeOivBOWRf%2BctVCFtSzLBTvwpQqKz70pNR2KVJER41mI9aaRL3GkXPYo%2BVhDEvVFyGJV70TLDjDGdDIPlI2AiEldXrhq9BkduSaqvwivO35hcl%2FAx4QowhmfpZ&X-Amz-Signature=a729091bccbcd1d5787fca6a6e549ef1fa14167bc6648ce30041c312a5ed3ced&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: column]

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/7cd6aa57-6db5-40d0-b419-e0560ba173e8/UI8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQKLEE3K%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPU5woTyyj52R1p8f7FD7QJPecHeczbsuPvOQOfbI%2FLQIgcB9FCMSKYP2yf8l%2FgIHiVdBTkfA5A4Ink7%2FgEUM7E%2Bcq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDIXu8JdZfC8QJJsjyircA3EDsnfZj%2BsIE7%2B4J4dOy5sOEuXLhawlrG6LX1RdaFHrWtOcmFJfe2ZZy2vvum1RR%2F3NdCQZ1Wmnyu%2BUph0TfghWv6tZ9L1hUg0ZH1X2ZN1MgIY%2B6ckeaRyVm1Xt2uMe9Uc00oJXwqZVyfgGWvlhnpsmAvjICcGKie8lrnFXuhi3oGqFKAtz7qBkktpUmdyABQEqGtQivoRRXRF6yTx5aGmvt7zFYVv3eVPoUzVtLBxCLLe1%2FQqI9493KKmXYxE7U%2FQjlDHN78QUlnXzqjWeOqe867sd%2Botpq9JbiXj2poAZEYzbE9pAVjhiNo7gMCg8Odz3Vzjsj6QtaAotKNr%2FgzR90ZGWgJ7M6r0b5jup1gYMHeD57b1klPIeu%2FWInbxoqL7tQaZ2cyWLf0Tqh7EdmyaAjmCajgdSXHU0MIv2vmzva8Eu7lPFmhUx%2Fx0arvdHpJx9lr8Nhn%2FtGghPDO27ouEHMYa9eYPOp%2B%2BM%2BSSl7aK2BcDq6UzbHg5PT4W4JvN3HwEIqODGG7yeCrsuOkC1qeuDPnpHAMDEu9SBa1BvMggkOtgB25x741j9%2B7DQrYyOVHMfq1AjjF2wSCIuaNg4Zc6BR84nPzxrmyaQbuf2UGCyVUZk0uvriCyLq%2F71MPOV7s4GOqUBGEX8BapGm7M0d8ThhtgwY%2F3zHMPhCFmEtueudALzDq3SxlM2zTiQF64FC%2BbTUHvGX9b2sf%2FXe7pKseTVmyTvbrdROuLGdlZ8bPyAJduyJ7Kt%2Fzqn0wP0d8tTnWliAeWn3dwIPplpOy9eeEIUJQSMdaINYd0TAlOFTLp%2BU08wIEL5NJ7OF2hP%2BUt5sww1mskedn8tTMld3sf62Ye9P2RnqPvbOYXi&X-Amz-Signature=f6dec153d3712b641f2cb09cf4e1b4deda3444b0746018b7d119f67e428db082&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

---

### 介面說明

- **Caption**

  - 在 Ini 自訂標題文字，預設 [ Genesys Logic USB3.2 Hub FW ISP Tool ]，注意空格。
  
  - 在 Ini 中，能決定是否在右上顯示文字 "**Internal mode 禁止外流**"。 PS：因用與Caption不同色需修改window的預設行為，較不建議，因此先不使用紅色。
  
  - 版本 v4.1.0.0
  
  - 加入 ICON

- **Main menu**

  1. Setting
  
    - Restore selective suspend function after exit
    
    - Using the same settings for all Hubs
    
    - Save as default：能將上述選項勾選狀況存成預設值
  
  1. configuration
  
    - Hub
    
    [UNSUPPORTED_BLOCK: to_do]
    
    - Save with checksum：輸出改為 Bin 檔。
    
      
  
  1. Ini Setting :
  
    [UNSUPPORTED_BLOCK: to_do]
  
  - 註：Caption 和 Mainmenu 要做個分別，如顏色不同。

- **Firmware List**

  列出該 Device 所支援的 Firmware，依數量自動調整高度；如果抓不到 Device，會顯示 Hub Firmware 並 Disable 所有相關按鈕；有以下幾種：
  
  1. Hub
  
    - 取消 sum 文字，改為"Select Hub FW Bin/Rom"
    
    1. [ Current Version ], [ New Version ], [ Select Hub FW Bin/Rom ] 相關設定之外，會多 EEP 相關設定。
    
    - 讀取 rom 檔時，config & EEP file 的設定要取消並且disable UI，讀取 bin 時要 Enable 。
  
  1. Host Bridge
  
  1. Internal PD ：顯示規則如下
  
    - IsSupportPowerDelivery為1
    
    - 勾選ISP PD FW
  
  1. External PD （EX : 9510 )：顯示規則如下
  
    - IsSupportPowerDelivery、SupportGL9510為1
    
    - 勾選ISP PD FW / ISP EX-PD FW
    
    - ISPType為ShareMemory / i2c / Billboard其中之一，且PdCount > 0；若ISPType為None或是無設定，則會尋問Device是否支援
  
  1. SIM
  
  1. SD

- **Check box**

  1. ISP Host Bridge FW
  
  1. ISP Internal Power Delivery FW
  
  1. ISP External Power Delivery FW
  
  1. Dual Bank FW

- **Button**

  1. Dump Flash
  
    - 按下後彈出一個 Dialog，列出 bank 列表，可選擇要下載的 bank
    
    - 增加 External PD，並在 INI 中新增 IsPdDumpRomCode 決定是否要 dump rom code
  
  1. Erase Flash
  
    - 按下後彈出一個 Dialog，列出 bank 列表，可選擇要清除的 bank
    
    - External PD 要區分 Bank
  
  1. Do ISP

- config f**ile**

  介面相關設定寫在 Standard Tool UI.cfg 

### 

---

## 操作

- 切換 Device：點擊 Device列表，或是新接上 Device 時

  1. Firmware List會刷新並列出該 Device 支援的 firmware，此時會依數量自動調整 Firmware List的高度，以適合的大小顯示。

- 拔除 Device：拔除 Device、或是偵測不到Device時

  1. Firmware List 會僅顯示 Hub firmware 且 Disable 所有 Hub 的相關介面。
  
  1. Disable [ Dump Flash ], [ Erase Flash ], [ Do ISP ]。

---

## 其它

[UNSUPPORTED_BLOCK: to_do]

[UNSUPPORTED_BLOCK: to_do]

[UNSUPPORTED_BLOCK: to_do]

[UNSUPPORTED_BLOCK: child_page]

[UNSUPPORTED_BLOCK: link_to_page]

[UNSUPPORTED_BLOCK: link_to_page]

[UNSUPPORTED_BLOCK: link_to_page]

1. Port Config功能整進Port mapping，所以Port Mapping顯示，Port Config便不顯示。

  

1. Port Power

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/04e084ba-c3a6-49aa-be0a-c6d54cf9bce7/U21.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIMNPICY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRDXDl0%2BvKS7uhcV2WRa7MyOeotWCzMRTFgD4nVU0ySwIgBwuyY2djn1G2qsT%2FvGWqvqu0%2FdkRL5vK4jJjM7KHd2oq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDLKnkSeADPfrTelOaCrcAxFyjO45kSmz4zFAEqLIRMQY9tvxGd5QYg%2F8rDzqhtPU7XSx8Vn%2FoExYnjq%2FZ%2BZ0CZdXNcYjmUrqxf38HCDKOrH1qO%2BnZMPrAUCwPrf8DUI%2BxSCnyfUSdSQyKzvtlql0u%2F4Rns92EsKYw5n0SJ015MmxTw2S%2Fsd4vHuYGxp%2F3Tw2jW7kXKQ2IE7BO82mEnvf29NYiWD6hsF%2BZnFpwv1Ro4JJkGMMg%2B9YVatCp2rUtn8aRUifXBcoEwFNQgNDFjTqi7ABRo5eGopD0WceecG7fEUx8TGWWtJWRSoNbCqvegPuGTsusxhHCxuNKPn2KgQLoWG2QCrRhPF4Ft27ZCx3zTpqvHYpzoGf8Z6y1WzOGBcBwsBcmjt%2FhC9kjRj8J3DuZe7OEuhME08ThivMLqT%2F5dYzDmTMs%2Bayp2IYgyVr79neuVGm%2FLIWgtCsFLaKyrCtT625yK4R%2Fpoox0KNi6SEwu3gRACpO2Kwa34tU7jt2M5w4rGfFvYuKtENlByoYnUUMdtJzb4KQ%2FsuWbCozlNuMs8UmKw1VUAUJmvyRmnleUpmQF%2FzD%2B1cqeblW1e87OO%2BoPUHmXTcoKNSdptm3LHT7P7hXowXz81popvd3r%2FBwvPgWYAoW2cMRDP%2B09V2MPqQ7s4GOqUBw4aM5TU0nxaQ%2FPanWneSWN1MIhbTc9w6BerIAbUDT3EzcEd2gKhV6Lzv%2FXHhUH9D9OavR20%2F7ZqeuppANG0ThMdlft%2Bfh7c2RHftlDn7AE8xWQ7gPVnreBnOhp9UHUBOwrLI12zx2vn4FEVp4fMeoqzQdxI9uxP2%2F7CI2bLcXtKMHy41JqPHbOawkenSygREXc6GNahFs922wv5mB1aTPiAQE6%2FX&X-Amz-Signature=d1c29e953cb4deb2b27951ad99b9a2039f626097ffdc966cf22062ca8ef1ba64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  - 加入 master 1~3 Mode 設定，儘在Config內容為新格式時顯示（目前僅GL3525）
  
  - 若 port mapping 頁面沒有使用該 master 的話必須反灰。

1. Port Mapping

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/59927868-ccf2-415e-8735-722b03a8e247/UI_13.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EPHINCP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICYcTBhLnyoTVB2EDlouz%2Fh1cY1DV7wvGKqSoMvYJ%2BgbAiAnMAc8spkXR5XI5vyQhQ5SbupBbKfLPYqhT4C0uiwJ%2FCr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMojGER6TdO%2Ftd%2FBTOKtwDB6Ccj%2Fk6SKHN76z%2FbauxZ0qGD5IC%2BrRr4j4df%2FF97VAGrlYkzOhgh4%2BrEWssVwQ22SM2QTpbMus6X4yfs00ozpcYIvcWYdNtSw4Y5PKjaiDEzXUGnMXcbH3Wynzzx7h0dEpbcc43Cwv5PVUBB7Mt7Ri2tRyoIPyWHwvX0u7UzXolixBdILegcbBIszMbuladaEikZwzuzPIG2OpKzbmgyF1C1vnEVpJwOaeogSV9YzpO8FOmtVddr2znnxFt9b1ziEnIncFJdNHamjG56JjbmD%2F6cUCqyPKUOmGMml%2BaCMSCV3z4KKUKBoJ8k0EdJhfbSE2yvI1npn9IeztcCCLB%2Fw8uU3aMXxAY5wxpa5Ph1qjMs6SVHwLj%2BJBQTUIfV4lKBmqJdGlKc0X9cwhJeDydo5riCj3qtko27csrVmJ35tDvzL63D%2FgujicYXEXarxHfrt%2FCOYTZYMMkGaMkX6K54XHUO5yxmvydOHIm8o%2BBfaEicDbJnKDxKgyUn%2FDRuUiWwaVPPkjDzV6SAvYpTwMxXIjivYjYEynaBWDMFfLtys7g6TdR0%2Fg6mrXzwSdVqOzDxs2D%2Fgy9R8BrnCEaELlgThF3yN3NNX4fgMpXaHbLKBdQretU1hOzM%2B4x6ysw8fjtzgY6pgG4HPAj7ZzDfletOqTiSyDByFqWlOismAbN02khWR7g%2FCPrd2w%2FYd8Ei4bgSv3IDlaKVT5jui4PcxojCp%2BcAARyGZ41fw%2BJhaBpRzfQBIJLk7fKgD%2BWLptnkzxXLzwWRyvxWK4jMRx4oyhTNRFSPq7HGVBV5FtM0lPasoDmQ0lKRsHGaGXKkqhnVyAcZEEIQx5dXu6Rii1th%2B5AmSe3EYGDO268KWeV&X-Amz-Signature=61a21fb54762a328e64d76de58498c853663f9531b43538038a228c421fe9421&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  - 分頁顯示群組（示意圖，Tab 1~3 會改為 Group 1~3）
  
    1. 第一個分頁，所有數值都能設定。
    
    1. 二和三頁只能設定 VBUS 及 UFP欄位，而DFP數值和第一頁相同且鎖定。
    
    1. 多 Up Port 時：
    
      - up port + down port 總數固定，每多一個up port就少一個down port。
      
      - 任一個 Up port 用過的 PHY ，down port 都不能再使用。
  
  - 左方列表：
  
    1. 在GL3525S時，增加 VPAD 項目，儘供 VBUS 使用。
    
    1. 在GL3525S時，增加 PD 項目，僅供 UFP / DFP 使用。
  
  - 右方列表：
  
    1. 增加欄位
    
      - CHG type / Feature ：以 combo box 選擇：
      
        1. None
        
        1. Charging ( Hub )
        
        1. Charging ( PD )：PD欄位必須有設定 PD
        
        1. Charging ( Master 1 )
        
        1. Charging ( Master 2 )
        
        1. Charging ( Master 3 )
        
        1. Non-Removable
      
      - Tx Swap：數量同 USB 3的數量。
      
      - PD：儘 GL3525S 時能設定。
    
    1. Port在設定好 PD後，相對 USB Lane便設定為1。
    
    1. rename PIN/PHY 為 Pad/PHY

1. Functional mapping

  - 隱藏 HUB_VUSIN、HB_VBUSIN
  
  - GPIO P&O在GL3525S要能設

1. PD Control

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/95b57ddb-0347-4d65-aeac-d27c843a031d/UI20.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Z7NLDSM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAJm%2BB4ioI%2FEKyb5RGKgi1oUHbpqBuIKYmXc1hBGcyqnAiEAr0FDxl08OEt5lvdmPIsf%2FL7HsNYClwWi6VR5gYm5yN8q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDDiWaLLEjZ6sB%2B1MJyrcA%2BCBx2G4YjzeB1T2%2BFqYHuwWX6iZiaAp3UzI68uSQNVclypbdlsYJ9rFi3Q64Z7oTs0qN3MNC0Kyhg3not7AsQz0cJ2QhfGtXYXttYATlNyVzhwNxMnKIC%2Fz6trexqipkmCtFCvffaoBK3A9zNCJMX7OXsiu25%2Fp2ABAUcxaOQZVT1pa5naVqYGVsMaXPhJatmALY09YormHYfyAb%2Bf7u54YTZXbvkgjClZveREGmyYq1K0r1BeR9cX9fZCdBWHNlE2K%2BuYsOOqPcGqh8ngJMA62SRbz%2BT5xgcN%2BoyzvyY42gAW0iVn5xwq0TkxSqR9K%2BbyR9Dx6uqffPyCKSNO7x8UaD0ZbofERWpilTWcSYYcR8ur7df4kBHyT5vv0gdLZbtfLwevm6RQy1J1tRfEkIV0t52TQ6K40AXQ%2Fos%2BFM8pip9F%2FiYHe9mKDPqvo4KN2wD0%2FC2s2S9Us%2FQRu9SVsvg6Rh2m6giqNnC54%2F1AvDtC%2F6bVXMv9FGs96AW3xGKLrLha3iEYqxcWydK8Xi4WuSS3I6nGWrVDFc9uWivmP%2FdfUxZYf3cbAEF%2Bjy%2FMV7wNUahVQ09ZxB7%2FOSdVIwddDx6964V%2BeCqRXnJNJAwIJi%2BOCmd03fT5F2LNz6SPgML2a7s4GOqUBdK2LrmzbBuMZhNz3U8fyGFEpDopJC2DE%2FKolHBpMwcd%2FMMVNP1jyshjZHPyNGOoEb6QZVVjHGetXEJJKs3ed1QfqlTQkUII89yclibybSy8Zuh2CyZxY9SejrJ4loiu0WVThKmAxdauPNkExNa3MGf3T45WYEwhbH8j0q338DEusnrEel8ny6PRMA0%2BFQFyZZ4kFp4rmactCtzm8sMKURmQWqqRG&X-Amz-Signature=14e4a0f9b407e9c73b7eb604133bcfbc8edf6fe99e3990936db0c51e1dd41703&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  - 增加 PD control 設定頁面可設定 PIN 由PD控制
  
  - 該 PIN 不能在 Function 使用過，兩者互斥，要防呆。

1. Hub config 欄位 0x111 (CHG P0)定義更改，原 bit-4移至 bit-5，然後 bit-4~2 的 3 bits 分別代表 Master # Mode 是否啟用。

  

1. 0x2F3~0x2F5 ( CHGR_MST1~3 )中，後 4 bits 改成 PHY值。
