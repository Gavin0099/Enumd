---
title: HID Code Sign Update Rule
domain_tags:
  - code-sign
  - tools
  - security
task_tags:
  - firmware-update
  - code-sign
  - spec
  - sop
authority_level: reference
is_deprecated: false
category: code-sign
notion_id: 33e33bcf-c850-4314-9d00-b9174d82bb75
notion_url: >-
  https://www.notion.so/HID-Code-Sign-Update-Rule-33e33bcfc85043149d00b9174d82bb75
notion_updated_at: '2026-04-13T07:08:00.000Z'
exported_at: '2026-05-16T12:36:40.994Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

## Protocol

- 驗證方式只存在GLbinTool 以及 FW本身，ISP Tool只有做update data 動作

- 不同Model 不能互燒

- Flash 內沒有 signature 時，在ISP時要先用 Vender command 送。

- Vendor Command 

  - 一般 command 為 8X
  
  - 一般 command + code sign 為 AX

- 不能 run 的 code 不能留在裡面。

## HP ISP Flow

- 說明

  - Bin檔格式，**0xC0 ~ 0xFF **（以下稱為 X Data）**會移到檔案後面**，原位址會亂數填寫資料。
  （注意：計算 FW check sum 時會以**原本的值**計算，而不是以亂數值計算）
  
  - Verification Data：即 **Public key + Signature + Check Data + Empty Data + X Data**，共 0x380 bytes。

- HID Code Sign Bin Format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/92d9e78a-7a0b-4221-88a2-8df5aece533f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6SFYB4O%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2FsFUEp1V8vF1%2BH4SvbXtd0XdANn2w9Hd8dEtSsfQiZAiBUxWFG1qL3AID0ySUKDPfm3YIXMlPSL78yT3Mq3wmonSqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMe4wNtpJQK81DAnQkKtwDa4U%2B4JFDAovLaKVNF9upRo8Gyy59jkoSa0sWLmTWKrT2h5swN8bQdcge7p8us%2BZAkuHdSOJTmwBQvKkSvFvi0GQ%2FfhEk3hqH3PMk6RC6K3galW53uejgdCOO2tuVKPFYzJvnQYI4s2hqx5D%2FtvvVD3JSXBWyvp7tSILKG2v4iku77SFMbCLpcPS1XIwO1tBBdmRv4o%2FI%2BJHHLkJ2M%2BUW1O9QJGw16B57Y7zu8fEOQ01mAtu%2BjiX0gkSDqdsHlNx6Z7VV7Si4cZJ3Uvp5ZF8V1NlVX45U27CGH5DXy3qd4OAdKwAhDHInnO%2FY5mr%2BFzEBR4mzFgYT%2FDCWULiHd2%2Fmw9K81xEys1bAv7UhSsdzEjuN52C4%2Fv31Yd5QqgyuHQS7aHVJyc3ZVLZZupzOQZUJ90uF4SLwgSD5kZ280%2FV81ujKG6Bg6uf6OD651OrH8Rq1tN6CIMLPfPyAPrMgGUVhN7YnJYvRfS1wdlLE%2FmP8zNshK4tHdgmNJtr1gz63sxG8jbCNcRrVvMsFNU8nLF4MVoQQfeqqlsu9UVYIFjMFFF0JWW2dI7XZUNfFdxBaqU2gkRmcpI4tFoe066HoTOTq4%2Fe%2B9F98l0%2FyzWzKfhep9NFRODHLJ%2FgvpuzNjEsw0%2Bmg0AY6pgFzFghzDLWX3LLSTD5AmV8gZgMzrbWgdDyeyNsgV5IEb4Rzn4fi7VCwxNX4FQOviZr0Tp%2FbM3uZmLagS961Tn22lVjtlz%2Fkz%2FFv487PtctGgpQe0sHXqNxO8H1NoDORNWSGssPPuODKLKj8x84vRMadTPKPM%2FCncb5rZE4Wb98XkuGpJCL8sAenrNMRtl7Ue1O%2BSE5U4kHBjPE6pvrixgMHEvvF2Rew&X-Amz-Signature=0cb8c46ca557d6cf4b3e4d43567b50e88d3dc1f7d5b47570ae5f09a5e8fd8ebd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HID Code Sign Bin Format (`GL9511`)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/01edf68a-1e2f-4e9a-88b5-577a1f8dda04/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD6GWU5E%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGBjC3y1NzppwLPb5bQgjKAgqEXMZXhiY2hZ0Y7%2BS1%2BtAiAB1F9Vv7v5u4hI6AUM9RXtL51Kr4k%2BWE264EsDnUl5syqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMo0ie0gJa5f0p46h0KtwD0grGGDZDLG8XcMPYtq2CPXtGDOST1u4NByeGGoVyRnzqJ1ZyzGc%2FOYWAFeQUJQXhIblW1k0vxLF5P2eLvpQoIzIx%2B3dsQfwgBeetBoxCJPVg2Ic8KxkrjiQnSbseAo0GXQGC1uFePfiPHmlcEm1LRH8y9vcFuRXIsEIszQcFqjyburBU%2Bv9DLyZaPa8DlFoOUr1X6rRrCl48J0NZOSaUQbfPOGqJv62Rj5%2BiT0p1tgImKb8RESqziS5FaHGZzYm%2B5XSOyWP7%2Ba6C8JGU6G1yhSeaBjF34MLzu%2FxRkIS1t3383y%2FQtordtV09%2BlTf%2F3UEbNEphQBz6QZvi3YXWGgH9eu%2FUQNr9QKjj%2FqpOoqSch%2FKsNji%2Fzt45wdapOk6GdOSdD2K8lE9RGRZCAT%2BVL621RcNYNDr7iJSpeRZwmPwypdZtfXcCRkHwhlJGHqa29cSQ1weCa%2BczEQjF6p44%2FW2g5R9bfjKW9mXbiPdwNgwvN15emn6P%2F3XmV9CkmvLZT6ud50sdKaNzwp%2BvqBwaXp%2BxGg60%2BPGXHFmo0MYOEoOkv3tPneEgAUo9WYYKVsBUxZRI2%2B%2BZI9y5Bwscg1ImI%2F7wP68hP23a2WV7SGTm5rtvEeVWT%2FCD01pKvfKWMEwjuug0AY6pgHE2UZRRy%2FcVPwh8yxrXaq6UYV6yUOlO8dKuvNS3wsBubry2R2bcoEIXUc%2BjmsXkJGZzUCM79AVmeV0A3o8oLyoHXPWDSp1snRKvVhF%2BwxhcY4%2BaLgXZZzDdM4e1zeYKMjj6NQ6TaWKFo%2FNcPmVbPPbFRTppsm3k%2BUeyxm%2FVVp4r1tadVz9ZRkPyzXmSNuL70bbJYgGEDgZpubG%2BCIVmTSvytL6UhSA&X-Amz-Signature=6e4565b17b3fc362812cc9489cc8d1dc9c66f9c077eb3365b1016baad0f21653&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### Version 2.0

- ISP Command ：Tool 會指定 Address 與長度並將整份檔案送下去，FW 需自己分析各資料位置。

[UNSUPPORTED_BLOCK: column_list]

[UNSUPPORTED_BLOCK: column]

- ISP Flow ( GL3523-50 )

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/a60d7da6-120a-48ad-abfb-b05dc0f50191/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZV5XOAG5%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFcqJrpnoXQdNhwZk5CAd2fiACpU4PyjGMkp0WhQfCJ7AiBvtqKhNFVEb3YXVzw5TJC62k1ifuRkqBMxxO6Orlmm%2BSqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMc815%2FrOAByc%2BOSGZKtwDlLFA5Uk%2B%2B6jvBZ5sq6b8b%2BnLBhZBqsXAA3e7FmZDGvKoq%2FauW3spaLS%2BLijKGtuEYN38hKtpB%2Ba9y7goh3FQ2%2F7QxE6VyoIYAT8Bzyyy8GSMTVIaf34E9URZL9YUBY85mfY9rmuN1IMHKRxHpN%2Ff7I5jDKJapz33xt1S5XxNk594DWKIODCkIJT1WE8wvAZ6nM8KcLpwMuasM%2BltFfFgRg00LD%2BR7DyzVTPevvGKQkZh3nYJ1N8K2XW%2FEpxITDWLJFowedJOCEPwPTGesSDlvTmVMSNtA4fr0iBFx5XcxEAwrubMj6DfJuUFyHm29ubZN0qWOZyZKRksV90HhV3Cv%2B8KTerNxZWm02SFArYHIxBBdxM1x40vSMSlrXBHJHDDuPGH2ksdOAiMTGm%2FdvAs2XI3yg2TU%2FaHQd4Uu8ZMSNaxE0p7lxuxtd1kSWm7x8k7kzlSqZ0YcPEU7pvNiirmSKz%2BMvX6Fj65%2BtFMrQpfJZTkvzCbTBRh8mD8uldhSI4t%2FmiBmbltlJwDsQDG1oRhZgVOoauwUyZM7J2gWCQm36mUuqCcc63TG9GYMC5imfH6yu6yyaKfPBaoC8LL7ODUnXWlHPQQYaHjXh2xSo7XLhPSb5c5YvE3xHfSEEsw%2B%2Bqg0AY6pgFtg8iSQ26hhseAeRmG19WF2y8z24xwXi2xbpZUOUDRoSVSr4Fk9WQXZJj5J6HfZj3ITOAolPhloHIXU2%2FcF8EXBSqWAMmVAfkq5IMjRMbtXs1Glb20Uiqgh1Qi%2Ba6bX2nuxWVr1oBoZtPAs%2FDotk326qPnm7%2Bz863cxIcifXBVzt7gI4IQATqymzlLMAg%2B14xDl%2FtZNM7FE7Ey1Pbnzzd%2FpiM8DfJz&X-Amz-Signature=b1a084015ee6b0b7d567a7bdbea9079c1827066f8c14878ab970d802b4c9d110&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: column]

- Description ( for GL3523-50, 藍色為 Tool 做的事，紅色為FW做的事）

  1. 取得 devices
  
  1. Load Bin 檔
  
  1. 檢查 bin file 和 Chip 是否匹配。
  
  1. Tool ISP Command : **FW Data + Vertification Data** （Address **0x00**, Length **Code Size * 1k + 0x380**），即整份檔案，
  然後會 polling FW 是否更新成功。
  
  1. FW 在收到 ISP Command 後，**需跳過 X Data 不燒**（即 **0xC0 **~** 0xFF**），
  然後 ISP 剩下的 FW Data （Address **0x00 **~** 0xBF **, **0x100 **~** ** **Code Size * 1k**）
  
  1. Address **Code Size * 1k** 開始是 Vertification Data （Length** 0x380**），FW 需 ISP 至內定位址。
  
  1. Address **Code Size * 1k + 0x212** 開始是 **Signature** （Length** 0x100**）以及 **Check Data **（Length** 0x10**），
  FW 驗證 Public Key & Signature 是否合法，方式於下方[驗證方式](/33e33bcfc85043149d00b9174d82bb75#f5e7b55b32de4e819c2de82290ee7e75)，**驗證失敗則結束**。
  
  1. Address **Code Size * 1k + 0x340** 開始是 **X Data **（Length** 0x40**）
  驗證 FW Check Sum 是否正確，注意計算範圍是 Address **0x00** ~** 0xBF** + **X Data  **（Length** 0x40**） + Address **0x100** ~ **Code Size * 1k - 2**，**驗證失敗則結束**。
  
  1. ISP **X Data** （Address **0xC0**, Length** 0x40**）
  
  1.  Tool 收到結果後結束。

[UNSUPPORTED_BLOCK: column_list]

[UNSUPPORTED_BLOCK: column]

- ISP Flow ( GL3525 )

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/66d72b17-9d2b-4374-a3bb-e3d175bf797e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHF26W56%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCTH4160DZEfoBgrE5zBV4YfnEuksV4%2BRru8TOZ5pYVDAIgexR0ORnweq2Y3MZrt4rMYNYI7iZOeWUSBA6B149s2wkqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPqANj6VjSCZDIk1QircAyV865%2Bf94A8GuTCAD3HI6TKOQPRvOPQ9lZBUmnguN91kxqFE2ok50TCnoupdq3LfnANuz3PcocZdM3WIgcc6K%2BgedhKE3wAzVXEG%2BneT0vD0GsZsQlHD%2BTKJextQYFsCgsuqDgIgvLcQ96gRf1cUORc%2F8bIfrws4cLxXUQiw%2FW1ndSMDvg1Aikmp2Shkiqk8j5gm9qsbp%2B6IO2epV%2F1tjTwC1w5KTB4omL2gOrDVgPfwwn3zqv%2BlgSqrKj1SwLgBOTJOgxMQorLYnotetl6Edux9XRONaRTKV6G80hUca5DeUJDifUfKQdwWigu5oFbm0s4X0MZH9IOC%2BmsDyk3pCja%2Bx1xdw7SspIUrSBGtTlHgQEDnglkgt1dHtQNlQfI4CJ42a25rR9B4oDCFzJ7gLqsa5XlEjrIIBdkGXp9HCka533gXwYdy%2FV3DbnGUqAuiMd5M%2BAwNaVSZhcl2TXiT7KCtFrqXHt4OsJZGzem9GC%2FpA%2BzsH3BGoatRUj7hwtbV5G7xcoAAv08VrMmLIq7msILXF155KhLsNnLorlZeiWnTPFouIRFAG1H7SPMvB5rfbicmsx5N34tVvOzrTS%2Fwmk5njjRpFCGpxcDdNriBYXpOa3y7p1RIzreVq5XML7qoNAGOqUBWgaR%2BnP%2FzctR8f7Olpp8QEZ5%2FD6NIUZEP9mzoFwNtgFca5B5FDVmjoVdkhnqfIeWsWu69RawpVkf%2B84ewfEHA91dJICBH3fEUBYckHc5EHw1uLOVAR%2F%2BQEF9nmB0%2BsxwE5lTsXMKsmfIWh7QhgpHj6tYDQ8pPUIQumsVaD%2Bycl3t1xJXfN5zlCD%2F1FmuTzQblZ8td%2BKJUH6xirIDcAg%2FvXut7aNV&X-Amz-Signature=f04c3cfb2e7375be598e27dc367dd8ecde782941afd289cdab896cb9ae0eb1c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: column]

- Vertification Data Address : Vertification Data 的 Flash Address Bank 1 **0x16000**, Bank 2 **0x17000**

- Description ( for GL3525, 藍色為 Tool 做的事，紅色為FW做的事）

  1. 取得 devices
  
  1. Load Bin 檔
  
  1. 檢查 bin file 和 Chip 是否匹配。
  
  1. Tool ISP Command : **FW Data** （Address **0x00**, Length **Code Size * 1k**）。
  
  1. FW 在收到 ISP Command 後，**需跳過 X Data 不燒**（即 **0xC0 **~** 0xFF**），
  然後 ISP 剩下的 FW Data （Address **0x00 **~** 0xBF **, **0x100 **~** ** **Code Size * 1k**）
  
  1. Tool ISP Command : **Vertification Data **( Vertification Data Address, Length **0x380**）
  然後會 polling FW 是否更新成功。
  
  1. FW 需 ISP Vertification Data （Length** 0x380**） 至  Vertification Data Address。
  
  1. Vertification Data Address +** 0x212** 開始是 **Signature** （Length** 0x100**）以及 **Check Data **（Length** 0x10**），
  FW 驗證 Public Key & Signature 是否合法，方式於下方[驗證方式](/33e33bcfc85043149d00b9174d82bb75#f5e7b55b32de4e819c2de82290ee7e75)，**驗證失敗則結束**。
  
  1. Vertification Data Address +** 0x340** 開始是 **X Data **（Length** 0x40**）
  驗證 FW Check Sum 是否正確，注意計算範圍是 Address **0x00** ~** 0xBF** + **X Data  **（Length** 0x40**） + Address **0x100** ~ **Code Size * 1k - 2**），**驗證失敗則結束**。
  
  1. ISP **X Data** （Address **0xC0**, Length** 0x40**）
  
  1.  Tool 收到結果後結束。

## 驗證方式

- 驗證 Public Key & Signature

  1. Public Key + Signature 轉成 checksum-8 
  
    ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/939fba8f-8a95-481c-8915-609ad1302553/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TKBDVZ2%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICST1dWvws2c5dPt78NPbRazoos0lEkT7HuupWAv6uibAiEA3IEm3pf%2BaXLE1vyiWXNbiBL7i6d9mwSJUqVz%2Fq9YUL8qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBu0xIfv34ZR1hvjSyrcA5tp0p5wu1oQD0n40ZnOOMAVKnNHqfO3X8RMv5Srv2IsVqaWAbpAvccTll9P%2FN4hcOV8a0c1n30U872rMdTejRFpXdgl8skCyLvp2f1yTyZSPrnicUM%2BMbnRS17FZrwwDxUPfNOyUPRKZuTnpYoYmvxC7pbBHix%2FgQta1TA3niPTyROMKW%2BC7f84U5Ey3DbsmBA%2FPBTm0bzDlvABBi6U2ZuKHhZEdZiz9mMKuY%2BZcRYbxEv2FD16fS6ZIQ4Dp4oIFESwQGgWqFQnTJXODXSkV7KkFA7vqrl%2Bkwwvar%2FRxVKYTe74odZI00wVVJSqKGMV8ekoEsb5dDq7UtfysfZZGHcs5Ql8IMKmrwdWjGZTTN1bnmaf6gG3EuCO2PRmQt%2BLnWncwDlVkQBob08u7yuthOWMsS%2BEM0p17MM2Df2CurEMz5lkJneAbrlV0OycYAvv522d11XiJJOiSb0gkj%2FC7adFIJm7Zeu%2FqEe32O8iZA8OCcfaN2XbRDruXAISBM4OmhNr%2F7ZFRq6566pu7o2t%2FK10dX5kQ9q6tZGQ7nGNLna8F40bM4sESk0Ft4qPNimNBYS27g%2F3YOa7cVvROikMxsCEmoTGHFVS8I9EgkO5v6xW8ak1dDG0ONXwQC0vMNzroNAGOqUBp3qdGA2kF%2BFYp3svmQ%2BQfG4YnKodLhyAxh%2B8V4nWXm2TcfDyXj39xAT6PZjWj%2BdWI7lT%2BEQF1IaVtsivRtzc21B%2Bsu1NVkw%2BSseTYM1Ipfa28EvIm2zXN%2Bv8HWZ9A9Gscto2klLQDf6pYmoInmm%2Fh5tb153kZDA9f1vOtWTKKUHUd9L%2FehXSogoSkQguycAzKyfQY%2F0EeM2gkeGecd9V31Upqs3n&X-Amz-Signature=b7c8d4e3c4d602f7cd4206bd32cda6c411ccc3713922dbed9f99688bafd1e4c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
    
    ### CheckSum-8 Source Code
    
    ```c
    U8 CheckSum(U8 *buf, U8 len) //buf為陣列，len為陣列長度
    { 
        U8 i, ret = 0;
    
        for(i=0; i<len; i++)
        {
            ret += *(buf++);
        }
         
        return ret;
    }
    ```
  
  1. checksum-8 跟 Tool String 的 project string ( 0x10 bytes ) 做 XOR 
  以下圖 Project string 為例，而剛計算的 CheckSum-8 為 0x4F
  
    ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/7ccdf8eb-cfae-4e50-a60f-3142f39a9244/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZZGJE5U%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123641Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHnp0mrjAxN%2BHZ8hoxS0%2FuPY%2FMaZmUjSvAT4%2Fx0o2x9NAiAwA%2FX7dc%2FZz1et54ew5YV3Z4t9SEeFtkfC%2FXb8lF6X8iqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuONHWjh%2B60kd5FmVKtwDM7gqoQbgWqd60iW1VofI%2FrD%2FeNoX0YHRwCNWsBWVLh%2BFuJ3ooxwW7tAs7mBqsBrr5vy%2BQF9y5IbBkip2Id3khz9KVr00tzYnarHHuznTCsFgPzAfLfwfc%2BSGqvlm6NdY1PUnzwWhxqYLnIlr7eNoGnQUNMfYXVxQJuebu4X11HUMe28s1r%2BZQskBDhL6MUbz2%2BhQvsYQefoR2DEFPBQkQJpAJ%2BYSJHe6rM%2FOA%2BTOCC2TJicMNKLbvfynGYM44les9BkObTD85RYHMvqJ%2BBIvYsEfnFzvy5xYG5JPigIfthXq%2BprvVIsWsoDLQJTMrdmoGGkTaY42dSnRBbtRRlHwIuXc7rXx264CIHuVm%2BL%2B1uXaZk48gz%2FFl%2FLGEviHfamMgMSxVsq4SvOXzvd9KPnpPJanhT4CyLuEtFJ52%2BgLf9ALGjjxe8Q%2Fughaths1dWgPHc%2F4UognKavYTlnNeYIwocaQGIagleBiLPYh9mWd4swzSzyvRqaXue6Qu%2B1tOAOjLqw58B54tTQOelNxhvtTj0tyJpobszrA7lzxcEZUI315s03dMlmSLSsY1wvRpRYUziMWVDrfqMw7hbQDqokutvQ404fD6fjXZl515AG0J51FxL9RGbIRH8znCB4wpuug0AY6pgG2DNB4xHTn%2FfIYLIbpXavc8szRajHHLcjpnWx8Jr8zQJpbdpeygQlUD64Y9V5BedV4%2FqRgnsYVhun%2Bv%2F%2Fg0jf9%2FPieLE14she5YkfLz2UjPnXwVMP%2FU0vwfQwjc6N5Q1kFW0M78L%2Fcdnwkng%2BkUex9fjYvqCwvPrK0w16zfe9%2F%2FEcjH2CvjMCNMfcPoljYJBLVVd8AJ9vB%2FxqSvc5DIs1PcbUy3skS&X-Amz-Signature=58a67d72822e76b93632bbe351a165e0b8dad7e896ab988adcdb3362c1e78d39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
    
    ```c++
    0x07 XOR 0x4F = 0x30
    0x48 XOR 0x4F = 0x07
    0x50 XOR 0x4F = 0x1F
    0x20 XOR 0x4F = 0x6F
    0x5A XOR 0x4F = 0x15
    0x33 XOR 0x4F = 0x7C
    0x34 XOR 0x4F = 0x7B
    0x43 XOR 0x4F = 0x0C
    0x20 XOR 0x4F = 0x6F
    0x20 XOR 0x4F = 0x6F
    0x20 XOR 0x4F = 0x6F
    0x20 XOR 0x4F = 0x6F
    0x20 XOR 0x4F = 0x6F
    0x20 XOR 0x4F = 0x6F
    0x20 XOR 0x4F = 0x6F
    0xA3 XOR 0x4F = 0xEC
    --> 30 07 1F 6F 15 7C 7B 0C 6F 6F 6F 6F 6F 6F 6F EC
    ```
  
  1. 將算出來的值與 **Check Data** 做比對，相同則代表 **Public Key**, **Signature** 沒被更改，驗證OK。
  
  - 注意：Tool 要 Polling  Firmware verification Result，要有 time out 機制，Hub Firmware 模擬驗證時間要跟GL3525 CPU3 驗證時間差不多
  
    > **Note:** CPU3 code sign 驗證時間:3 sec(**update fw**) + 25 sec(**sha256 hash**) + 24 sec(**rsa2048**) = 52 sec
