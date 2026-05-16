---
title: HP Monitor Code Sign Update Flow
domain_tags:
  - hub
  - code-sign
  - monitor
  - firmware
  - tools
  - security
task_tags:
  - firmware-update
  - code-sign
  - sop
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: 650b6b5c-ca52-418b-861b-86d8dfdf2ade
notion_url: >-
  https://www.notion.so/HP-Monitor-Code-Sign-Update-Flow-650b6b5cca52418b861b86d8dfdf2ade
notion_updated_at: '2026-04-13T07:24:00.000Z'
exported_at: '2026-05-16T12:37:48.117Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

### ISP Tool 與 Hub Firmware 初始化交握機制

目的是確認：

1. **ISP Tool 是否通過 Hub Firmware 的認證**。

1. **Hub Firmware 是否通過 ISP Tool 的認證**。

流程如下

- 使用`bcdDevice `和ToolString 裡面的`Firmware Info Tool String` 來當參數

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/4585b227-5a21-49d1-b073-7bca822e06b5/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDDE5M3O%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCfWzKVplX5rKLPUSL0NLdHwSu%2Bj5o1NCSHs04uxZBF0gIhANTnBuBrXi%2FFXwZLvilILzEYUHSDgydeAK2InhED7%2FOpKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzxzgDyu%2BfyJVTs%2BL4q3AOHLHZd00S3kHwKoO59veu4B7lSGqNDOIZ%2BiBh9mywC%2FDWiXmnD%2BTzSnwsSUaYWrX%2FKOhIQLZKUJMf7mdmbtRTW5I0jikE8upthLWVc6JRmtAwAck7OyN0EUSdsWuokyObmcWvPnZxfm56mq87Vk1Y7%2FfnPZVgvsU%2B3sgVQyHUSHAyos1cCuRjG1Mk37ykIjW6pndMtQQbAVTc4lVEhXJ6Wzcwg6a38Wb8skn%2Bz%2FO3q%2FUZLTCNrMk6%2F5ktOEoF04LlDcJCoA4Emm1MP1S0TbbrhLSWDhOqhdFc%2FSvhn60ovTAKy%2FKYEZ7ZaEYIJO643gLn%2F6YxVyCwzSoEuKfRpo5Lcrikqj6Nu%2Bz%2FQTRIUgZSYB84lZMNo2BO5%2FKEVlH9bG0WqQ90HOYTFshAG%2BEl5uAFV26kqdRFscay3tZ87dYK1EgF0h9e%2BdcimN9%2B1a7eaehBdw6S%2Fi%2BICih7A3x3DZ9Abr0FNDB04Q4E1QFQW3ZvIT1bAJB1u7osO2wJuDoGBnx%2BDWFEwF2IxBlQm8brqHK2Y1vMqJYDOAB4%2BrZG5XEEekKGv%2FEHWboAf4OATlqVcifcbSdQmDt90RXPdVwgpD9L4IveuPd8Cqcz3SGuhiqzGmkJe2i%2Fsf2QMll%2Ff8TC46aDQBjqkAd628%2FLmenFqvlF1AISMnnHBnC4HZXxI4LfsTQ5OJOz9nE0UO1nZr3TDkJttTO86t%2BJMCNW%2FkHOKT%2FH1ocqesbNFeUI8WCblse1x3ILWu%2BeZ0nKiVSjmnhtLlbV3EDVsnr4PUN63pVkln2OzxbFbdYReeiV9GuiejSIq7y0lnVm20Wh9z47YPIfny9BMxOA%2BNf5th73276OdUOqE955mloO%2F%2Bmna&X-Amz-Signature=7aa9d8731e37d99b4aa0b4ef34544bd9fb24264c25b458bdba7ab80e59037cb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- 取出 `bcdDevice` 的兩個位元組並做 XOR 運算。

  ```javascript
  uint8_t uVar = uFw[0] ^ uFw[1];
  
  舉例：
  假設 bcdDevice = 0x1234：
  
  uFw[0] = 0x12，uFw[1] = 0x34
  XOR：0x12 ^ 0x34 = 0x26
  ```

- `Firmware Info Tool String` 會 Random 產生一組 Start Range 和 Stop Range ，然後跟`bcdDevice ` 產生出來的值再做XOR

  ```c++
  const uint16_t uRangeStart = GetRandomRange(0x01, 0x14);
  const uint16_t uRangeStop  = GetRandomRange(uRangeStart + 1, 0x15);
  
  舉例：
  假設 Start Range = 5，Stop Range = 10。
  
  for (auto n = uRangeStart; n <= uRangeStop; n++)
  {
      uVar ^= pData[n];
  }
  
  舉例：
  
  Firmware Info Tool String 的值為 [0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77]。
  Start = 1，Stop = 3 → 選擇 [0x22, 0x33, 0x44]。
  
  初始 uVar = 0x26
  XOR 0x22 → 0x04
  XOR 0x33 → 0x37
  XOR 0x44 → 0x73
  
  ```

- **`uValue`**：範圍組合，將 `Stop` 放高位、`Start` 放低位。

- **`uIndex`**：將 XOR 結果放高位，加上固定值 `0x01`。

  ```c++
  const uint16_t uValue = (uRangeStop << 8) | uRangeStart;
  const uint16_t uIndex = (0x01 | (uVar << 8));
  
  舉例：
  
  uRangeStart = 5，uRangeStop = 10 → uValue = (10 << 8) | 5 = 0x0A05。
  uVar = 0x73 → uIndex = (0x01 | (0x73 << 8)) = 0x7301。
  ```

- 使用 `uValue` 和 `uIndex` 傳送至 Hub Firmware 進行驗證。如果返回值 uRetVal != 1，表示驗證失敗。

  ```c++
  MACRO_CALL_AND_RETURN(HubVerification, iRet, uValue, 0, uRetVal);
  MACRO_CALL_AND_RETURN(HubVerification, iRet, uValue, uIndex, uRetVal);
  
  ```

## 概述

目前驗證方式有分四種方式 ，可以透過Dynamic Tool String  裡面的The 3rd Party Vendor Support  HP Proprietary 參數來判斷 ，如下圖

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/9e3eb625-505b-4348-a3cc-c1548ad1deb5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=773079913a97f38696e9d309827730c44b68f9fb80dc69cbd9c2a798ab0b6adb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HP Hw Check Code Signed
因為GL3523沒有Security Module ，所以必須透過scaler 驗證 code sign

- HP Sw Check Code Signed
GL3523 使用，在此模式下連scaler 都沒有Security Module ，所以必須透過Tool 來驗證code sign

- HP Code Signed Slave
此模式下必然會有兩層以上的Hub ，另外一層Hub 會是HP Hw Check Code Signed
or  HP Hub Check Code Signed ，兩種方式驗證方法不一樣

  > **Note:** **HP Hw Check Code Signed : ****把此層Hub code sign 交由Scaler 做驗證****
  HP Hub Check Code Signed : ****把此層Hub code sign 交由有Security Module 的Hub做驗證，現在只有GL3590有此功能**

- HP Hub Check Code Signed (**ECDSA**)
主要為GL3590 驗證方式，因為GL3590 有Security Module ，可以自己(Hub)做驗證

---

## HP Hw Check Code Signed update Flow

update前會傳送public key 給 hub ，當update到最後兩筆資料時會傳送 hash & signature給Hub ，讓Hub 傳送給 scaler ，由scaler驗證是否成功，失敗的話最後兩筆資料就不update ，這樣的話 update data不完整，hub boot 起來就不會跑這一塊，成功的話繼續update流程，可以參考下圖流程

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/d517bf9c-c0d9-41d4-9cec-1f71e920f924/HP_Hw_Check_Code_Signed_update_Flow.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=cd62ef70aa1fe98f2e956dc35a52c255ccf0e3fa217aef1da8ff8a1f71abf174&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

Send Hash & Signature 和 Get Hub authorization 可參考下圖做法

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/71b3d69f-523a-4523-8575-91ddc81beb75/Fw_Verify.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=eed6ae3a8db392f9fef14686f47ddd59086b24b75bb55ecd67100a43f587e452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

---

## HP Sw Check Code Signed

在load bin file時就會送給 解密Tool 做驗證，驗證失敗就不做update ，成功的話就正常update
詳細作法可參考下圖。

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/f29c783d-df9d-4f95-97f9-45d251a27ff5/SW_Verify_for_Hub_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=3a577bf8d67f18ad068926c4f1ca2be4d744bbd0960c3cbaa7cb3e468045b7ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

---

## HP Code Signed Slave

會根據另外一層Hub的code signed mode來決定 code signed flow

- HP Hw Check Code Signed update Flow
驗證方式類似 ，只是在Send Hash & Signature 和 Get Hub authorization 這邊是送到HP Hw Check Code Signed的那層Hub給scaler 做驗證

- HP Hub Check Code Signed 
會在HP Hub Check Code Signed 一併說明


---

## HP Hub Check Code Signed (**ECDSA**)

有兩種方式，驗證方式都是會傳給有Security Module 的Hub做驗證，只是流程不一樣

### 原本Hub 就有Security Module (GL3590)

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/52b1c0ca-e54e-41ca-a52a-f7fca52cbe6a/GL3590_Code_Sign_Flow.drawio.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=979fd349cec5c9ba5b7d090613172b9d0abf303fdefe99c046caf5f53ff580a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/cfe2a85f-3f7d-4adb-a638-1c7ee5311105/assss.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=7b4ed9e8d655d2014eb341099c479e173cc20525ee0fa95e6b34c287adc76062&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

```plain text
1.	40 ac 00 00  00 00 00 00 : Enable SHA256 Engine
2.	c0 a2 00 00  00 00 40 00
3.	c0 a2 00 00  40 00 40 00
4.	……
5.	c0 a2 00 00  c0 8f 40 00
6.	40 ac 0b 04  09 00 00 00 : Send Hash Length : 4K
7.	40 ac 0b 00  00 00 20 00 : Send Hash Data
8.	c0 ac 0b 02  00 00 20 00 : Read Digested Data for test 
9.	c0 ac 0c 02  00 00 40 00 : Read Signature     for test 
10.	c0 ac 0c 01  00 00 40 00 : Read  Public Key   for test 
11.	c0 ac 0b 00  00 00 01 00 : fw return hash comparision result
12.	40 ac 00 00  00 00 00 00 : Enable SHA256 Engine
13.	c0 a2 00 00  00 00 40 00
14.	c0 a2 00 00  40 00 40 00
15.	……
16.	c0 a2 00 00  c0 8f 40 00
17.	40 ac 0b 04  09 00 00 00 : Send signature Length : 4K
18.	40 ac 0c 02  00 ff 00 00 : Provide fw public key
19.	40 ac 0c 01  00 00 40 00 : send signature data
20.	c0 ac 0c 01  00 00 40 00 : Read  Public Key   for test 
21.	c0 ac 0b 02  00 00 20 00 : Read Digested Data for test 
22.	c0 ac 0c 02  00 00 40 00 : Read Signature     for test 
23.	c0 ac 0c 00  00 00 01 00: fw return hash comparision result
```

### 原本Hub 沒有Security Module(GL3523)

流程跟GL3590 驗證方式差不多，不一樣的地方為，當update 後 ，要把data送到有Security Module的Hub(GL3590) 做驗證，所以除了第一步是傳給GL3523 update data之外，其他command都是傳給GL3590

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/e02457df-379e-4ed0-bec2-ff539b59b125/GL3523_GENE_Code_Sign_Flow.drawio.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=f22248416c1454229152a7d8638f23ffc7e01079ebcd9bba98f8c841316508cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

-

### 原本PD沒有Security Module(GL9511)

hash 應該是不用驗，所以去掉此步驟，其他跟GL3523驗證方式差不多，當update 後 ，要把data送到有Security Module的Hub(GL3590) 做驗證，所以除了第一步是傳給GL3523 update data之外，其他command都是傳給GL3590

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/c7de3423-b326-4660-9b17-9c3a0792a210/GL_PD_CodeSignUpdateFlow.drawio_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7YBQZEG%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrNKx0ANHCYvOmDNwRmX6GE64Fbapg2XL1MiKo15sQwQIhAI3bKJ%2FX5cBzRBODGPpSC7mDTVdlQEiGac4wCuFbvU1QKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJ5BXdf522vaYBjkEq3AODli5NDzp6O2xMOuyXyoxUT5cTVamvFNQ%2Fq226FnEJKZbXn6P5IdCNpnzjWwMuIxtqqsY4fKcpizmUGKDSwVfehAG27dq2RnG2ltwmqE3DNAlfC0CeZEZfkynaaAcZJrDebipQldkY6AvBulGT%2FUL%2BHIbmhIAoslu0OqU7vuYVIkYBGuo2e0SX3IjfnIdU73zvMMhkEXKr2VjXdLX1wIdx4EDLrpWXgoirFBoMxmh24PTwtzDC306eVP3MRaBdbxzeyLBZPPYFY7TZ0dbyFdpZ%2FJ%2BNPO1viBRYEbpOgDKbXMyD9MOlq%2FUmnpVDdq6CuEJ%2FCy3%2BKKdHH6MHfgPvMdp045fZk8J0fYHH2drct7sZUU6pIrkUpnWPCPU9cwc4XZ%2BbIZ171B8Le0sWManqI%2B%2BPXSGPM1%2FB8ttRnzCK6v7NEs%2FGqt%2F4CfoBiLn7tlkJp0xRV7xVzRe1VPddZdg72Ev59g1l3wJ%2BPb%2FLFdaEqcKKUAzkLK7eoN7SVTECVm%2FmyHDzGIywVCsJ7e1cFzo53KdWtP7lPX0GXa0CWpeNaIGpU381AHjuOjZcePx6C3Rvkv2yTOB0kAcPi43ERVrRWw1VtOohPECQeipovMlgunqSYAqIj%2FB2hmZ%2FLcXuaTCi7KDQBjqkAYPSHCJs2YIjqLOOP6u306v%2BJclcHDbbb50Zh%2BmOKi4SgpVapZdq2AbDBhcXfxXJ3YmXp6FZ%2F7VTFlf3SsN6Qg8f59NWFb1Mlx8Zid%2FpGVb%2FFmXxsrRhXaBkgyXeFKOZNsszfk3oDJnvs4EJ07nq%2BkqP070%2Fl9uVf1VwpoxMYFjFBoyaYG6v7W4xUvcrk17t0tEkEcrphgdBBh9Cxif3YpLPmtTO&X-Amz-Signature=c0b254127977ebd3be5e15ce299b7ae22e3cbbbd2b7b1e75bf1857ea51bd27a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
