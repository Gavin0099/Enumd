---
title: 'HP Scheduled update flow '
domain_tags:
  - hub
  - code-sign
  - monitor
  - security
task_tags:
  - firmware-update
  - code-sign
  - spec
  - sop
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: f148b440-3d63-4a52-87aa-1470fbda401d
notion_url: >-
  https://www.notion.so/HP-Scheduled-update-flow-f148b4403d634a5287aa1470fbda401d
notion_updated_at: '2026-04-13T11:04:00.000Z'
exported_at: '2026-05-16T12:39:44.835Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

### SW requirement

1. Scaler Update Info，透過 Scaler Bin Head 判斷，Scaler Head 參數如下

1. Scaler flash offset 預設會放

  1. GL3523-50 :`0X10000 ~ 0X11000`
  
  1. GL3525 , GL3590 :`0X40000 ~ 0X41000`
  
    ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/02dfcb1a-fae3-49ef-9a52-9e6c9c889ae4/Hub_Code_Sign_bin_Format-E24G5_offline_Flash_Format.drawio_%284%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W23H5L7C%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFJ4YjwRysRrvOINobb2F%2F75qKRQIob201V3oF06gj%2FwIhAKRFHejavzF9BMhXLwQSbgzRwfKyvQADxG9cxQxT7twLKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzT%2B5%2FngR0wJV0yag4q3AMBD0jbYIldA%2Bv8wF86Z%2BAUcYLHg7%2BeUDi4FQTpBVj9UDWAuCYTThT2QQUUtXPNJ%2FdS3FNXljhmktyCY%2BAjEQfhwUKqZF3gb6rcOqGRVfq8w5tYH4WRiuLsMksgmySZ5N2dhzD8YztXcLdTSqs5xggk1HQZ5M4u%2BhHq5%2Foxw%2F4ePvsys8z0FvCWm%2F3N6FHzf%2F7ibZGMTu8BdYwiHGumtYr7Ux1fwiNa20eChNd0vby9NxOHsv%2Bk3EA4OnaLsRiOaKHkYWsEFvHo5ZobSBVdCDEJmm8SuQ0Q7EB4soohP18cFQdRliFpdUij6b9DSWGApxft91q%2FgiYXon70%2FVunNxaUrZykGnRoxGnREdrotNEJF4gBZxHfAGa3TouvPyp3iHKyGMpX7R4ZjLZ%2FOGIixrBt63%2B1H9UjcZqz8vqvl7bG2D7ZDieSGGKgIFg16wLBFe3Espavu%2BM5PzAhTVYcarrA54hGRFekQpoOYUzGc%2ByxZQksfX2mIpJT%2Bz%2Fm26rdBDCcaQLGkKvvGA8dVeGqhEbetxJcj%2F2ULrV8n3s1LleYVqhmjbaPG81mzaaEz%2FJYgNxIlY5bGSLOVcR5bqn%2BI%2F2%2BDXCDieJzF3lyqnQqG%2FyIjHQbZzD%2FgS9sMjbNkDC966DQBjqkAWVSkHtLks2tdljsGLoz%2B8lnDO7ps4Sjc69daoRLIQ%2BZQuFvyeXXmu3ypG%2BXpEbigR8DQVS40c%2FcGT5yAUsjMaRgT%2FrrTvCQRCNxGXsziMf4BJZYBeL5kq6jAMohzKPWw83qs5KXnJtX1jhf2mxT%2FaW3zdL%2BCIfhYhMAP%2FvKzuBjU4e0F1MdBZDjFVJHv%2FOsOsS7%2FifpLOEAnMT0F3G%2FqWfSHnTs&X-Amz-Signature=219391126943103fa40fd5492a41efc69bb90b5d4a70572c129bbcf7664e823f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Scaler update Info` 詳細資訊如下

  1. **MTK Scaler info**
  
    1. Scaler Update Offset (需要參考`Boot code`**` `**`sector`) 所以如果Boot code** **sector 是 0x20 ，換算方式為 0x200000 + (0x20) * 0x1000 = `0x220000`
    
      1. 3個byte 
      
      1. 0x40000 - 0x40002
      
        ```python
        0x220000
        ```
    
    1. Scaler Update  Size (需要參考`Boot code`**` `**`sector`) 所以如果Boot code** **sector 是 0x20 ，換算方式為 0x100000 - 0x20000 = `0xE0000`
    
      1. 3個byte 
      
      1. 0x40003 - 0x40005
      
        ```python
        0x0E0000
        ```
    
    1. Boot code** **sector (`must skip`)
    
      1. 1個byte 
      
      1. 0x40006
      
        ```python
        0x20
        ```
    
    1. Scaler Chip
    
      1. 1個byte
      
      1. 0x40007
      
        ```python
        0x00 :TSUM_R2
        0x01:MST9U
        ```
    
    1. Scaler  Version
    
      1. 4個byte
      
      1. 0x40008 - 0x4000B
      
        ```python
        1.0.0.151 --> 0x01000097
        ```
    
    1. Packet Version
    
      1. 4個byte
      
      1. 0x4000C - 0x4000F
      
        ```python
        1.0.0.151 --> 0x01000097
        ```
        
        ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/3346e37a-8323-48e2-bc33-94e080094bb6/Hub_Code_Sign_bin_Format-offline_scaler_info.drawio_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEUSENIN%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFTa8wlXFQUGcqT0DbCm2CIpSW7Rm3jyPshvxUU85EIOAiAyq9127%2BgkiUHlLbyNOOhvR%2BY%2FCXG4xUF%2BsUVxcGNETiqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMp5vrHSw1Pwa5JtIDKtwDEc%2BkYVLFgpqgd6PH1kWZDHvR3RsOklpWNsMxtLEySwXoj07FjZpeHEAtB18Ldi2XWnwog466u5%2B%2FLwsQnoZCDkLG6R%2BtUrLJNGPVYNllbSQ4S63TxGb%2Fj8tpB3pyAioClCMb6gOvYhzsv5vjCJyu984saMTWFAxU580U%2FaoaGDw5IBCo9soHlGcXFiD%2Flpyd0kV7IceOTTOjYIREhFMx2oDp0nEU%2Fwt1iUbq%2FPwRGt00zpTqDLTRvBifo%2FydXkDTUQcosqYWJwCuz2Hn8TtKnSLLYy4D4xJecMlser3AQHh0XfF%2B34Fm2O%2FplcV5xTnOSM%2Fz26pThBSx4%2BPH8EqZM8hms8%2BXt6%2FsrJpHXZorcLskPu54T9rk6jizSIGYaP1KtkckVg82BfWMHb1jUYON3o%2BQx1wEVqVVBfI%2Bw71XgIlc5VmwLs7l09N7ytTfG%2FUHlSJleXmADvN1corK6KO%2F7IKqT446u1u2a%2Bj3gvFJngarGv3NzhBES9nyRd%2FdJY6VH1tDuBbRC0pp5BmdIxOiYuvVNInBDVEX43puautALRK0ZkRy0fIxojZxSAKLZUZ0uFT7wW07J6KAQREi1UdsMkL%2BxjFzrmlf6GOskY0SKj%2BUs8H2SA6Ynr3tQcsw%2Femg0AY6pgHnGpq%2Brxrm%2B63Pu6JZjEcGUI%2B3Ha3AJO1oNseRyIEwajjCUBTBjC6dyrbrUomg8HLKlTP%2FWnxyXPmbPIJwhV2O9w%2BZxq9ALLem9iaJk97J%2BmyfHFCcZJozyKC9hZ2ax0YQKTQPNWfZ28DBxb%2FvbzG6SdebyfFf5lft0AHbxZgW0jFlg%2FxdO4jEzNjlWNLGb%2FLlj6mkiWiUpf3C5ymeQ39ci3%2FaB5Wq&X-Amz-Signature=8e6ab5a3672ff209ec490295bcc19e5ae871e30fe5a370fe44a72cc02efb769e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  1. **RTK Scaler info**
  
    1. Code Sign Type (HW or SW)
    
      (ii - vi: New Differ Bank Before ISP得到的資訊)
      
      1. 1個byte
      
      1. 0x10000
      
        ```c
        0x00 : SW
        0x01 : HW
        ```
    
    1. Scaler Update Size
    
      1. 3個byte 
      
      1. 0x10001 - 0x10003
      
        ```c
        0x0B0000
        ```
    
    1. Debug Slave Address
    
      1. 1個byte
      
      1. 0x10004
      
        ```c
        0x6E (數值不一定, 因為是下Command問出來)
        ```
    
    1. Start Bank
    
      1. 1個byte
      
      1. 0x10005
      
        ```c
        0x0F (數值不一定, 因為是下Command問出來)
        ```
    
    1. User Flag Address
    
      1. 4個byte
      
      1. 0x10006 - 0x10009
      
        ```c
        0x0001e000 (數值不一定, 因為是下Command問出來)
        ```
    
    1. Next Verify Key Address
    
      1. 4個byte
      
      1. 0x1000a - 0x1000d
      
        ```c
        0x0001d000 (數值不一定, 因為是下Command問出來)
        ```
    
    1. Current Verify Key Address
    
      1. 4個byte
      
      1. 0x1000e - 0x10011
      
        ```c
        0x0001a000 (數值不一定, 因為是下Command問出來)
        ```
    
    1. Write Data Length
    
      1. 2個Byte
      
      1. 0x10012 - 0x10013
      
        ```c
        0x0040 (通常設定為64或256)
        ```
      
      ### (以下HwWp和SwWp開頭皆為解Write Protect相關參數)
    
    1. HwWpGpio
    
      1. 2個byte
      
      1. 0x10014 - 0x10015
      
        ```c
        0x102d
        ```
    
    1. HwWpGpioBitsReservered
    
      1. 1個byte
      
      1. 0x10016
      
        ```c
        0xe0
        ```
    
    1. HwWpGpioValue
    
      1. 1個byte
      
      1. 0x10017
      
        ```c
        0x01
        ```
    
    1. HwWpPin
    
      1. 2個byte
      
      1. 0x10018 - 0x10019
      
        ```c
        0xfe1d
        ```
    
    1. HwWpPinBitsReservered
    
      1. 1個byte
      
      1. 0x1001a
      
        ```c
        0xfe
        ```
    
    1. HwWpPinValue
    
      1. 1個byte
      
      1. 0x1001b
      
        ```c
        0x01
        ```
    
    1. Flash Software Write Protection - 1
    
      <details><summary>0x1001c - 0x10026 (11 bytes)</summary>
      
      
      
      1. JEDID
      
        1. 3個Byte
        
        1. 0x1001c - 0x1001e
        
          ```c
          0xEF4015
          ```
      
      1. SwWpReadCmd
      
        1. 1個byte
        
        1. 0x1001f
        
          ```c
          0x00
          ```
        
        1. 數值0表示不需要讀取, 因此`SwWpByteValue`表示為絕對數值, 且`SwWpByteReserved`不需要使用
      
      1. SwWpWriteCmd
      
        1. 1個byte
        
        1. 0x10020
        
          ```c
          0x31
          ```
      
      1. SwWpByteReserved
      
        1. 1個byte
        
        1. 0x10021
        
          ```c
          0x00
          ```
        
        1. `SwWpReadCmd`數值0則此值不需要使用
      
      1. SwWpByteValue
      
        1. 1個byte
        
        1. 0x10022
        
          ```c
          0x02
          ```
        
        1. `SwWpReadCmd`數值0則此值為絕對數值
      
      1. SwWp2ReadCmd
      
        1. 1個byte
        
        1. 0x10023
        
          ```c
          0x00
          ```
        
        1. 數值0表示不需要讀取, 因此`SwWp2ByteValue`表示為絕對數值, 且`SwWp2ByteReserved`不需要使用
      
      1. SwWp2WriteCmd
      
        1. 1個byte
        
        1. 0x10024
        
          ```c
          0x11
          ```
      
      1. SwWp2ByteReserved
      
        1. 1個byte
        
        1. 0x10025
        
          ```c
          0x00
          ```
        
        1. `SwWp2ReadCmd`數值0則此值不需要使用
      
      1. SwWp2ByteValue1
      
        1. 1個byte
        
        1. 0x10026
        
          ```c
          0x60
          ```
        
        1. `SwWp2ReadCmd`數值0則此值為絕對數值
      </details>
    
    1. Flash Software Write Protection - 2
    
      <details><summary>0x10027 - 0x10031 (11 bytes)</summary>
      
      
      
      1. JEDID2
      
        1. 3個Byte
        
        1. 0x10027- 0x10029
        
          ```c
          0xEF4016
          ```
      
      1. SwWpReadCmd2
      
        1. 1個byte
        
        1. 0x1002a
        
          ```c
          0x15
          ```
      
      1. SwWpWriteCmd2
      
        1. 1個byte
        
        1. 0x1002b
        
          ```c
          0x11
          ```
      
      1. SwWpByteReserved2
      
        1. 1個byte
        
        1. 0x1002c
        
          ```c
          0xfb
          ```
      
      1. SwWpByteValue2
      
        1. 1個byte
        
        1. 0x1002d
        
          ```c
          0x04
          ```
      
      1. SwWp2ReadCmd2
      
        1. 1個byte
        
        1. 0x1002e
        
          ```c
          0x35
          ```
      
      1. SwWp2WriteCmd2
      
        1. 1個byte
        
        1. 0x1002f
        
          ```c
          0x31
          ```
      
      1. SwWp2ByteReserved2
      
        1. 1個byte
        
        1. 0x10030
        
          ```c
          0x3a
          ```
      
      1. SwWp2ByteValue2
      
        1. 1個byte
        
        1. 0x10031
        
          ```c
          0x00
          ```
      </details>
    
    1. Reserved
    
      1. 6個Byte
      
      1. 0x10032- 0x10037
    
    1. SwCrc
    
      1. 1個byte
      
      1. 0x10038
      
        ```c
        0xaa
        ```
    
    1. Packet Version
    
      1. 4個byte + checksum
      
      1. 0x10039 - 0x1003D
      
        ```c
        1.0.0.151 --> 0x01000097
        ```

1. `Pd update Info` 詳細資訊如下

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/5f7ace75-4f1c-4939-a17b-fe7af8b6b6f8/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WFGUPWG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDt%2FFmX0OorbDOW5U6DYqcJujfwT9Ji3HFGwTeibpGUoAIhAPvJmdgMcr2tFdb6Fu75bOBM7iDFa9LWbnk4uPY2BIakKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxL2JW9Ou%2B34xUc71Qq3AOG6nmrbPmSscm4gDuB8CjweTszWe0u6nMOjJH341vq9V4PRcmHsm10LqPWdlTPNZjJc6PYbIdXQssYsyXZdI%2BexvWOjFSh2hyxY1SiYODvqZXg009AZXO%2F%2FML3FBuKqMCtq73tj9GGfCrLPmSAT4Ar%2FBFQ2u3d8eMa%2FEjo7dRcLDLT0f8em21SwVCvJVIZ0sY9kF%2BOkA4QmCi7vmOTD%2FTpLF01ybLwRp2sgCup%2F4s4EgH5Bd7F7gyEpge7OTC6%2BXqKoSVxao32KQhLGThV0rrrOczxwnLosoftKe%2FgMGctkQzolslAn%2FcQVbg0KSDrVsdJWUF01kv3sYzTzQVDahFPZH7eJ5LMN9S1eO3FAYw6kiMYVCxZAP9PlndlwwOv443x9gbIaFStt3W6wUGnBRJl6BqTv%2BZ8YFO6jeqyn7inNldLNrp6WnAVs6AdlARcCFyvJKZ9iJe1GpFAjos%2FEMcsjSO8ED4%2FFRq9pNTn%2Bq6QXR2AEBttgMv3XKDbPX4qc%2FVFAqtPAK9Ckp0p3dLNCuxd%2FjuzZKKzzvZA%2Bywt3n7Fxw6zsybdp1c%2F57O2DniRUJcwEE6wbnDV8q9sVZguGp7u8v0KjlDTVE1eZtFMyfjO2JQKQvYR0fNfZh4ACzCk6qDQBjqkASX86zJj9Mtmy%2BIRN7kyW6eHjrs%2FUwdilcTpBXQGmw6oOszWdYHwjAKgC9v4j2wAUEyqT3LsuajW7sUbIZUrcrMwdKKAZJfy6R2lVoeLUWNm%2B3J7qof%2F%2FWHsxbabSElYFBxlx8j6V3%2BHax8Ng9bSi863%2B8Ly0AWmAtSpV3kbTyyIxdInPyPWrjqetKOCdeHNF0LdOyyQDF0S%2B9%2Fj5ucSLCURMGQy&X-Amz-Signature=b67d5457b563cbd3e23421abbc8957f0d4ade8ccb200fb72668b9706e49c3dff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/9e553650-127f-4d09-8030-2ef5f52cbb25/Hub_Code_Sign_bin_Format-offline_Pd_info.drawio.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WFGUPWG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDt%2FFmX0OorbDOW5U6DYqcJujfwT9Ji3HFGwTeibpGUoAIhAPvJmdgMcr2tFdb6Fu75bOBM7iDFa9LWbnk4uPY2BIakKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxL2JW9Ou%2B34xUc71Qq3AOG6nmrbPmSscm4gDuB8CjweTszWe0u6nMOjJH341vq9V4PRcmHsm10LqPWdlTPNZjJc6PYbIdXQssYsyXZdI%2BexvWOjFSh2hyxY1SiYODvqZXg009AZXO%2F%2FML3FBuKqMCtq73tj9GGfCrLPmSAT4Ar%2FBFQ2u3d8eMa%2FEjo7dRcLDLT0f8em21SwVCvJVIZ0sY9kF%2BOkA4QmCi7vmOTD%2FTpLF01ybLwRp2sgCup%2F4s4EgH5Bd7F7gyEpge7OTC6%2BXqKoSVxao32KQhLGThV0rrrOczxwnLosoftKe%2FgMGctkQzolslAn%2FcQVbg0KSDrVsdJWUF01kv3sYzTzQVDahFPZH7eJ5LMN9S1eO3FAYw6kiMYVCxZAP9PlndlwwOv443x9gbIaFStt3W6wUGnBRJl6BqTv%2BZ8YFO6jeqyn7inNldLNrp6WnAVs6AdlARcCFyvJKZ9iJe1GpFAjos%2FEMcsjSO8ED4%2FFRq9pNTn%2Bq6QXR2AEBttgMv3XKDbPX4qc%2FVFAqtPAK9Ckp0p3dLNCuxd%2FjuzZKKzzvZA%2Bywt3n7Fxw6zsybdp1c%2F57O2DniRUJcwEE6wbnDV8q9sVZguGp7u8v0KjlDTVE1eZtFMyfjO2JQKQvYR0fNfZh4ACzCk6qDQBjqkASX86zJj9Mtmy%2BIRN7kyW6eHjrs%2FUwdilcTpBXQGmw6oOszWdYHwjAKgC9v4j2wAUEyqT3LsuajW7sUbIZUrcrMwdKKAZJfy6R2lVoeLUWNm%2B3J7qof%2F%2FWHsxbabSElYFBxlx8j6V3%2BHax8Ng9bSi863%2B8Ly0AWmAtSpV3kbTyyIxdInPyPWrjqetKOCdeHNF0LdOyyQDF0S%2B9%2Fj5ucSLCURMGQy&X-Amz-Signature=6470b7ac6b3c04ec8601cdb5b152ad27e049ff7a4d438cd2b4d8a99cc732b0ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

## Pd Info

1. I2cSlaveAddr - `Pd ISP I2C slave address`

  1. 1個byte 
  
  1. 0x40001
  
    ```javascript
    0x20 
    ```

1. PgWrTime-`Page write max time, ms as unit`

  1. 1個byte 
  
  1. 0x40001
  
    ```javascript
    0x10 
    ```

1. EraseType

  1. 1個byte 
  
  1. 0x40002
  
    ```javascript
    0x01: 4KB erase
    0x02: 32KB erase
    0x03: 64KB erase
    ```

1. EraseCmd-`Command support for EraseType`

  1. 1個byte 
  
  1. 0x40003
  
    ```javascript
    0x20 
    ```

1. EraseTime -`Erase max time for EraseType, ms as unit`

  1. 2個byte 
  
  1. 0x40004 ~ 0x40005
  
    ```javascript
    0x1000
    ```

1. ChipBlockCnt - `Used to set chip capacity`

  1. Chip Size = Chip Block_Cnt * 32 KB
  
  1. 如果 Chip Size >= 8MKB，則 Chip Block_Cnt = 0xFF
  
  1. 1個byte
  
  1. 0x40006
  
    ```idris
    0xFF
    ```

## Hub Other Info

1. Update data  - `Update the data, and only after the scaler confirms that all chips have been successfully updated, move this data to a specific location to meet the scheduled update requirement.`

  1. 64個byte 
  
  1. 0x42000 - 0x42003F

1. Bank Info - ` Inform the Hub that the data in the range 0x42000 to 0x4203F belongs to a specific bank of the Hub.`

  1. 1 byte 
  
  1. 0x42040
  
    > **Note:** 0x00 : bank0
    
      0x01 : bank1
