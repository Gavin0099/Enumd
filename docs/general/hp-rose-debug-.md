---
title: 'HP Rose Debug '
domain_tags:
  - hub
  - monitor
  - firmware
  - tools
task_tags:
  - firmware-update
  - debug
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: 7b138bc8-3e4c-4d15-8d6d-98fc719b3193
notion_url: 'https://www.notion.so/HP-Rose-Debug-7b138bc83e4c4d158d6d98fc719b3193'
notion_updated_at: '2026-01-21T09:27:00.000Z'
exported_at: '2026-04-12T16:17:17.044Z'
is_summarized: false
relations: []
---

[UNSUPPORTED_BLOCK: child_page]

### 緣由：在開發HP EndUser Tool 時不斷發生Hub 消失的問題

看不到Hub 就無法燒錄，所以當Hub 不見就跟RTK 拿新的板子

有兩塊板子後能實驗的方式變多了，因此將板子短路讓Hub 回到Mask Code

神奇的事發生了，Hub 長回來了，因此開始尋找是否Firmware 有問題。

首先Dump 出Flash 的資料，然後比對bin 檔發現 0x6200 後的資料都不一樣。

因此找到其中有一個原因跟Hub 有關係，由於Hub 是7466 也就是3523-50 這個Chip

是動態決定Code Size 的，之前的Chip 都固定Size 當初是0x6000

但這個Hub的Size 計算完為0x7c00，因此0x6212 後的資料全部都是亂碼被寫入
導致是一個壞掉的Firmware。

這時候重開，Hub 就消失了，當Code Size 改對之後燒錄正常，Hub 也就沒有不見了

但問題來了，壞掉的Firmware 應該會回到Mask code，卻沒有回去，而是整個Hub 消失不見

還好是板子還可以短路，如果是整機螢幕，那Hub 不見就只能拆開來了

[UNSUPPORTED_BLOCK: child_page]

# HW驗證流程: ResetMCU之後NewDifferBankAfterIsp會失敗原因

先講結論: Delay時間不夠久, 需要等2.0和3.0 Hub全部回來才可以下NewDifferBankAfterIsp

HW驗證的燒錄流程, 最後幾個步驟如下

---

**ResetMCU (造成Hub Reset) → 等到2.0Hub回來 → (*1)Sleep一段時間 → 下NewDifferBankAfterIsp指令 → 結束**

---

但後來發現, 在ResetMCU之後, 雖然2.0的Hub會先回來, 但再多等一段時間, 2.0的Hub又會消失, 然後過一段時間, 2.0和3.0的Hub又會一起回來, 所以會變成下面這樣

---

**ResetMCU (造成Hub Reset) → 等到2.0Hub回來 → (*1)Sleep一段時間 →**** (此時2.0Hub消失, 之後2.0和3.0Hub才回來)**** → 下NewDifferBankAfterIsp指令 → 結束**

---

而因為Sleep後Hub又重長回來, 此時對Hub下NewDifferBankAfterIsp就會造成問題, 也因為不知道Hub什麼時候又長回來, 所以可能有時候會成功, 有時候會失敗

因此需把流程改成如下, 才可確保在2.0和3.0Hub都回來後, 不會再有Hub重長的機會, 而Scaler驗證的時間也夠, NewDifferBankAfterIsp也可以得到正確的驗證結果

---

**ResetMCU (造成Hub Reset) → (*2)Sleep一段時間 → 等到2.0和3.0Hub回來 → 下NewDifferBankAfterIsp指令 → 結束**

---

*1: RTK提供的公式是: Bin檔的Bank數 X 1.5 + 3 = Sleep秒數. 

要Sleep這麼長的原因是, 下了ResetMCU之後, Scaler會開始進行HW的驗證, 而驗證的時間與Bin檔的大小有關. 之後的NewDifferBankAfterIsp就是去取得驗證的結果, 因此需要有足夠的時間讓Scaler去做驗證

*2: RTK原本提供的公式時間不夠, 需改為Bin檔的Bank數 X 1.5 + 10 = Sleep秒數

[UNSUPPORTED_BLOCK: child_page]

> 緣由

以E34m為例子:

```c++
Hub : GL3523-OTY5H_TPV_HP_Rose_E34m_L1_Hub_FW5711sig.bin
Scaler : E34M_TPM340Y1_2H012_21B_715GC277_M0B_XVT001_V0.0.0.1_20210521_DigitalSign_Boot_EDID_HDCP_Full.bin
```

此版本組合在使用HP ISP Tool 時在initial 就會失敗，如下圖

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/e451d10d-48bc-4da5-bc17-294afd4052f5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WDX3PPI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJ%2Fq0%2BjiMFJ5ct73p4Imdy6JHhXsxEwPWDXGSYB8uM9AiBL06W5DZot9K%2FFLefoyzKAnovPsO3Lg1hrADpXFMosIyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMCwWLJGztwl6%2B%2FPONKtwDiyaNODjyER1jQ4jZEToGdkv4RQeFv9MTI7Y1bteZAXMCA8S6RlHUxgVVvbDXpTxaZwmjKu3XPriV44EIXk%2BDR8jqK4BykoSjAyxAD3UAauRUM5%2FHHuKK4U0spk4OfDy0mVaF0RAzD354mWtW08XsW1%2F9g4DXGEdcN5yO8PBhO7YjZssuaPmzjZBbadQulX6NrMyXifmZlz%2BQfjvduNq0fYIdc1UxS9R%2BYFKFkQYjTX3gtx04onsGg0VWwLUKQOBJ84zvJhK2z%2B3kUJOGFs6PpsOMXJ09q9IBtHpaTTPL1ygFTjWLxFxrdLV1amY1SdxaCaj%2FVpIN%2BZepkZSyU1Vm3sECO%2F6KMqyR3FQwZHnuZvhxbXUzCVk8x4TKVEJkWGqqPwCQ2prG8mWQCzKqEWI8Fcvuwk%2BYMBOEL7ebP1vBTtLSRSR2KZpMPnbStD4ehq5tqHJ%2Fr%2FqCXuE1IvJObUKddkPIz%2Fwm6BQ%2BzKd7snDdit5Zsd46pC7%2BSym%2F0hf5GNMQy5bVYqO7WDwBYjt59GGFV1L434hH3BD%2B0qcThE4n0%2BJgNrbI6PishKYhoKmseLxKo7dJOD8p%2FdLsnAc4wkWINxaFp2lw1ELiwbD4CESJ%2B2ICl43XV0K%2B%2FuXwSw0w6pfuzgY6pgEo7jKXKuQwlXUcknfsBkdoflFFfMRigjFn3C06HUXS7ijiqKhzsrpvUpUeAHcYkebEgHwf6m7D4TX%2BvMtJ9F67kmqtPj6S6zznQCKGtrtb848%2F8uhGjKv4dgkk66QTTNIITYVvKe2Z3YgfDHJpMqbJLEh8r%2Ba3kYE9cv6HHtfV9rr69yNAoqMT%2BR6IZzXSdjaKMgAykTHTGT1vp8mUlA7DMLwS9mLN&X-Amz-Signature=40aebaefb5a3fdca2a3f6b180b54ab6ab25fe2ad74eafe00f63c7a1987e9da40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

透過Bus Hound Log發現initial 到一半會 reset

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/7b36e13f-d91a-4a1a-9e10-a22c352b58fc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WDX3PPI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJ%2Fq0%2BjiMFJ5ct73p4Imdy6JHhXsxEwPWDXGSYB8uM9AiBL06W5DZot9K%2FFLefoyzKAnovPsO3Lg1hrADpXFMosIyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMCwWLJGztwl6%2B%2FPONKtwDiyaNODjyER1jQ4jZEToGdkv4RQeFv9MTI7Y1bteZAXMCA8S6RlHUxgVVvbDXpTxaZwmjKu3XPriV44EIXk%2BDR8jqK4BykoSjAyxAD3UAauRUM5%2FHHuKK4U0spk4OfDy0mVaF0RAzD354mWtW08XsW1%2F9g4DXGEdcN5yO8PBhO7YjZssuaPmzjZBbadQulX6NrMyXifmZlz%2BQfjvduNq0fYIdc1UxS9R%2BYFKFkQYjTX3gtx04onsGg0VWwLUKQOBJ84zvJhK2z%2B3kUJOGFs6PpsOMXJ09q9IBtHpaTTPL1ygFTjWLxFxrdLV1amY1SdxaCaj%2FVpIN%2BZepkZSyU1Vm3sECO%2F6KMqyR3FQwZHnuZvhxbXUzCVk8x4TKVEJkWGqqPwCQ2prG8mWQCzKqEWI8Fcvuwk%2BYMBOEL7ebP1vBTtLSRSR2KZpMPnbStD4ehq5tqHJ%2Fr%2FqCXuE1IvJObUKddkPIz%2Fwm6BQ%2BzKd7snDdit5Zsd46pC7%2BSym%2F0hf5GNMQy5bVYqO7WDwBYjt59GGFV1L434hH3BD%2B0qcThE4n0%2BJgNrbI6PishKYhoKmseLxKo7dJOD8p%2FdLsnAc4wkWINxaFp2lw1ELiwbD4CESJ%2B2ICl43XV0K%2B%2FuXwSw0w6pfuzgY6pgEo7jKXKuQwlXUcknfsBkdoflFFfMRigjFn3C06HUXS7ijiqKhzsrpvUpUeAHcYkebEgHwf6m7D4TX%2BvMtJ9F67kmqtPj6S6zznQCKGtrtb848%2F8uhGjKv4dgkk66QTTNIITYVvKe2Z3YgfDHJpMqbJLEh8r%2Ba3kYE9cv6HHtfV9rr69yNAoqMT%2BR6IZzXSdjaKMgAykTHTGT1vp8mUlA7DMLwS9mLN&X-Amz-Signature=4683f2410c314ae16dca2a14257ddbb1adfda77267b29bdfb63e78580fe7932a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

但是用下面的組合 Hub Enter ISP 是正常的

```c++
Hub : GL3523-OTY5H_TPV_HP_Rose_E34m_L1_Hub_FW5711sig.bin
Scaler : E34M_TPM340Y1_2H012_21B_715GC248_M0A_XVT001_V0.0.0.5_20210426_DigitalSign_Boot_EDID_HDCP_Full.bin
```

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/d48bfbdf-0cd5-4327-ac09-c8f8a650d1d4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WDX3PPI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJ%2Fq0%2BjiMFJ5ct73p4Imdy6JHhXsxEwPWDXGSYB8uM9AiBL06W5DZot9K%2FFLefoyzKAnovPsO3Lg1hrADpXFMosIyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMCwWLJGztwl6%2B%2FPONKtwDiyaNODjyER1jQ4jZEToGdkv4RQeFv9MTI7Y1bteZAXMCA8S6RlHUxgVVvbDXpTxaZwmjKu3XPriV44EIXk%2BDR8jqK4BykoSjAyxAD3UAauRUM5%2FHHuKK4U0spk4OfDy0mVaF0RAzD354mWtW08XsW1%2F9g4DXGEdcN5yO8PBhO7YjZssuaPmzjZBbadQulX6NrMyXifmZlz%2BQfjvduNq0fYIdc1UxS9R%2BYFKFkQYjTX3gtx04onsGg0VWwLUKQOBJ84zvJhK2z%2B3kUJOGFs6PpsOMXJ09q9IBtHpaTTPL1ygFTjWLxFxrdLV1amY1SdxaCaj%2FVpIN%2BZepkZSyU1Vm3sECO%2F6KMqyR3FQwZHnuZvhxbXUzCVk8x4TKVEJkWGqqPwCQ2prG8mWQCzKqEWI8Fcvuwk%2BYMBOEL7ebP1vBTtLSRSR2KZpMPnbStD4ehq5tqHJ%2Fr%2FqCXuE1IvJObUKddkPIz%2Fwm6BQ%2BzKd7snDdit5Zsd46pC7%2BSym%2F0hf5GNMQy5bVYqO7WDwBYjt59GGFV1L434hH3BD%2B0qcThE4n0%2BJgNrbI6PishKYhoKmseLxKo7dJOD8p%2FdLsnAc4wkWINxaFp2lw1ELiwbD4CESJ%2B2ICl43XV0K%2B%2FuXwSw0w6pfuzgY6pgEo7jKXKuQwlXUcknfsBkdoflFFfMRigjFn3C06HUXS7ijiqKhzsrpvUpUeAHcYkebEgHwf6m7D4TX%2BvMtJ9F67kmqtPj6S6zznQCKGtrtb848%2F8uhGjKv4dgkk66QTTNIITYVvKe2Z3YgfDHJpMqbJLEh8r%2Ba3kYE9cv6HHtfV9rr69yNAoqMT%2BR6IZzXSdjaKMgAykTHTGT1vp8mUlA7DMLwS9mLN&X-Amz-Signature=24ccee124fee6ff574aa4dfc8a1ddd910ba35817631c009dfcbb430ba13ec162&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

所以原本是懷疑 RTK Scaler 有改了甚麼東西，請RTK RD那邊分析

---

另外這邊又重找一次問題點，發現是在Enter ISP 就會 reset 掉

這時懷疑Enter ISP 時 Hub 是否有做了甚麼事，但是**wayne 說 那時候沒有下 i2c command 給scaler.....** ，還是麻煩james 拉出i2c 腳位量量看，結果發現Enter ISP 有下i2c command

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/7b6523e5-afdd-49ef-bc7a-dc04e4afa72b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WDX3PPI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJ%2Fq0%2BjiMFJ5ct73p4Imdy6JHhXsxEwPWDXGSYB8uM9AiBL06W5DZot9K%2FFLefoyzKAnovPsO3Lg1hrADpXFMosIyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMCwWLJGztwl6%2B%2FPONKtwDiyaNODjyER1jQ4jZEToGdkv4RQeFv9MTI7Y1bteZAXMCA8S6RlHUxgVVvbDXpTxaZwmjKu3XPriV44EIXk%2BDR8jqK4BykoSjAyxAD3UAauRUM5%2FHHuKK4U0spk4OfDy0mVaF0RAzD354mWtW08XsW1%2F9g4DXGEdcN5yO8PBhO7YjZssuaPmzjZBbadQulX6NrMyXifmZlz%2BQfjvduNq0fYIdc1UxS9R%2BYFKFkQYjTX3gtx04onsGg0VWwLUKQOBJ84zvJhK2z%2B3kUJOGFs6PpsOMXJ09q9IBtHpaTTPL1ygFTjWLxFxrdLV1amY1SdxaCaj%2FVpIN%2BZepkZSyU1Vm3sECO%2F6KMqyR3FQwZHnuZvhxbXUzCVk8x4TKVEJkWGqqPwCQ2prG8mWQCzKqEWI8Fcvuwk%2BYMBOEL7ebP1vBTtLSRSR2KZpMPnbStD4ehq5tqHJ%2Fr%2FqCXuE1IvJObUKddkPIz%2Fwm6BQ%2BzKd7snDdit5Zsd46pC7%2BSym%2F0hf5GNMQy5bVYqO7WDwBYjt59GGFV1L434hH3BD%2B0qcThE4n0%2BJgNrbI6PishKYhoKmseLxKo7dJOD8p%2FdLsnAc4wkWINxaFp2lw1ELiwbD4CESJ%2B2ICl43XV0K%2B%2FuXwSw0w6pfuzgY6pgEo7jKXKuQwlXUcknfsBkdoflFFfMRigjFn3C06HUXS7ijiqKhzsrpvUpUeAHcYkebEgHwf6m7D4TX%2BvMtJ9F67kmqtPj6S6zznQCKGtrtb848%2F8uhGjKv4dgkk66QTTNIITYVvKe2Z3YgfDHJpMqbJLEh8r%2Ba3kYE9cv6HHtfV9rr69yNAoqMT%2BR6IZzXSdjaKMgAykTHTGT1vp8mUlA7DMLwS9mLN&X-Amz-Signature=8bc20cc735d01da38c7ab7b748f733dc8825ddd0de282f59bb027cfd12523391&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/02507798-ad9a-41e1-b1be-0cd1ad9b3e71/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WDX3PPI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJ%2Fq0%2BjiMFJ5ct73p4Imdy6JHhXsxEwPWDXGSYB8uM9AiBL06W5DZot9K%2FFLefoyzKAnovPsO3Lg1hrADpXFMosIyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMCwWLJGztwl6%2B%2FPONKtwDiyaNODjyER1jQ4jZEToGdkv4RQeFv9MTI7Y1bteZAXMCA8S6RlHUxgVVvbDXpTxaZwmjKu3XPriV44EIXk%2BDR8jqK4BykoSjAyxAD3UAauRUM5%2FHHuKK4U0spk4OfDy0mVaF0RAzD354mWtW08XsW1%2F9g4DXGEdcN5yO8PBhO7YjZssuaPmzjZBbadQulX6NrMyXifmZlz%2BQfjvduNq0fYIdc1UxS9R%2BYFKFkQYjTX3gtx04onsGg0VWwLUKQOBJ84zvJhK2z%2B3kUJOGFs6PpsOMXJ09q9IBtHpaTTPL1ygFTjWLxFxrdLV1amY1SdxaCaj%2FVpIN%2BZepkZSyU1Vm3sECO%2F6KMqyR3FQwZHnuZvhxbXUzCVk8x4TKVEJkWGqqPwCQ2prG8mWQCzKqEWI8Fcvuwk%2BYMBOEL7ebP1vBTtLSRSR2KZpMPnbStD4ehq5tqHJ%2Fr%2FqCXuE1IvJObUKddkPIz%2Fwm6BQ%2BzKd7snDdit5Zsd46pC7%2BSym%2F0hf5GNMQy5bVYqO7WDwBYjt59GGFV1L434hH3BD%2B0qcThE4n0%2BJgNrbI6PishKYhoKmseLxKo7dJOD8p%2FdLsnAc4wkWINxaFp2lw1ELiwbD4CESJ%2B2ICl43XV0K%2B%2FuXwSw0w6pfuzgY6pgEo7jKXKuQwlXUcknfsBkdoflFFfMRigjFn3C06HUXS7ijiqKhzsrpvUpUeAHcYkebEgHwf6m7D4TX%2BvMtJ9F67kmqtPj6S6zznQCKGtrtb848%2F8uhGjKv4dgkk66QTTNIITYVvKe2Z3YgfDHJpMqbJLEh8r%2Ba3kYE9cv6HHtfV9rr69yNAoqMT%2BR6IZzXSdjaKMgAykTHTGT1vp8mUlA7DMLwS9mLN&X-Amz-Signature=e0e752c0d8b31c587cd9e1d9a7d51fc0af838c9d446fd9025c326f25ec2e852f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

跟Wayne 確認後回應這是下給MTK i2c command ，RTK 不應該下，會改一版Hub Fw讓我們測試，經過修改Hub Fw後就不會有 hub reset 現象

至於為什麼Enter ISP 下了這個i2c command Hub 會 reset ，**RTK RD回應說這個command 會觸發Exit Hub ISP mode，導致Hub 斷電重連**

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/31b00f1e-ea63-4a9b-91c0-ca4393c70123/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WDX3PPI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEJ%2Fq0%2BjiMFJ5ct73p4Imdy6JHhXsxEwPWDXGSYB8uM9AiBL06W5DZot9K%2FFLefoyzKAnovPsO3Lg1hrADpXFMosIyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMCwWLJGztwl6%2B%2FPONKtwDiyaNODjyER1jQ4jZEToGdkv4RQeFv9MTI7Y1bteZAXMCA8S6RlHUxgVVvbDXpTxaZwmjKu3XPriV44EIXk%2BDR8jqK4BykoSjAyxAD3UAauRUM5%2FHHuKK4U0spk4OfDy0mVaF0RAzD354mWtW08XsW1%2F9g4DXGEdcN5yO8PBhO7YjZssuaPmzjZBbadQulX6NrMyXifmZlz%2BQfjvduNq0fYIdc1UxS9R%2BYFKFkQYjTX3gtx04onsGg0VWwLUKQOBJ84zvJhK2z%2B3kUJOGFs6PpsOMXJ09q9IBtHpaTTPL1ygFTjWLxFxrdLV1amY1SdxaCaj%2FVpIN%2BZepkZSyU1Vm3sECO%2F6KMqyR3FQwZHnuZvhxbXUzCVk8x4TKVEJkWGqqPwCQ2prG8mWQCzKqEWI8Fcvuwk%2BYMBOEL7ebP1vBTtLSRSR2KZpMPnbStD4ehq5tqHJ%2Fr%2FqCXuE1IvJObUKddkPIz%2Fwm6BQ%2BzKd7snDdit5Zsd46pC7%2BSym%2F0hf5GNMQy5bVYqO7WDwBYjt59GGFV1L434hH3BD%2B0qcThE4n0%2BJgNrbI6PishKYhoKmseLxKo7dJOD8p%2FdLsnAc4wkWINxaFp2lw1ELiwbD4CESJ%2B2ICl43XV0K%2B%2FuXwSw0w6pfuzgY6pgEo7jKXKuQwlXUcknfsBkdoflFFfMRigjFn3C06HUXS7ijiqKhzsrpvUpUeAHcYkebEgHwf6m7D4TX%2BvMtJ9F67kmqtPj6S6zznQCKGtrtb848%2F8uhGjKv4dgkk66QTTNIITYVvKe2Z3YgfDHJpMqbJLEh8r%2Ba3kYE9cv6HHtfV9rr69yNAoqMT%2BR6IZzXSdjaKMgAykTHTGT1vp8mUlA7DMLwS9mLN&X-Amz-Signature=6d03563252c99aa18438502034a71f66c68d752607590f8e64c6c12ca61d1526&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: child_page]

在開啟HP ISP Tool 時當有偵測Camera 或Audio 時會獲取Camera 或Audio 的Handle 值

而獲取完並沒有將Handle 值釋放掉，因此在update 完Scaler 時最後一步是Reset MCU

Camera 跟Audio 人被咬住導致Hub Handle 無法釋放

因此回來時本來4個Hub 變成了6個Hub (如圖)

但被咬住的Hub 不存在，因此Command 會無法執行導致Failed

而Enduser Tool 每次調用3rd party Dll都會將Handle release ，故不會發生這個問題

※之後需注意在調用 3rd party Device 偵測完Handle 要記得 Release 乾淨，以免導致Hub被咬住

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/af5e0528-8179-42cc-ad4b-a41d05c00506/1625146943333.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667S3NPDIX%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T161716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZ1Lj6QvD1fda1Lqib1DgIQ8sBW8bAS8XDhAS3Cx1%2F8AIgGkBevGP3wpaKkrkWNp0ha0wNiv9Khrrre3SQ41%2FlQ94q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDIvg%2BmV9GIX6kDJ71yrcA06We36kktPfQ3NZC1xIXEZPkqCJoBS99I1FrObL%2BAVW5pxGOmcRThIGH6egFT3Zb9wpacC7jW2qMVI8%2BCium15N06%2BoQgl1GOE%2B8ktBrCzdSYINEuwnahhZZNlHd4R1rRfCk0hmPnWlcRt5aae9rFvPkfWHPGLgyToh5gD5Pzs0To1QQm8%2F8fHvj8ph1W%2FWWVgU9x3igi1xvUdavBzi2eOce%2FvAFS5%2B4gIwcmBlPYWh7iFCIfyDL672Jp%2BUGN87la0Fm9EA%2BVjlRFt7%2Frg4Zyqygu6hsPfiC%2FNhpGoSbJ3U2r4YBhlADmEiXuv4hkIH%2BTyQP7%2B4J9JzfQV4%2BI3Bi3Mq4y38%2FFBt%2Bap30L%2BnSye6P6aYFZ4xt5zF%2FJZgpC%2Brk%2BKOQWB3KvXaYRxh5yLBQpb38AHyT2IipjqnmcVWn30kehU82NUbbx5FqlQD3sG%2BPGJO7edJ0I%2BPZ%2B3BVZkl2POEwEIOsPSDfLRakmz5qPVJ32sbG4YOJ%2BRcZ7A5YrcIKzGuHWdeB3s8FnhneSPMdePCeN0Y0g3pcUF15F2vbIPgWA6P6z5U6PqOyPgmibH6mmesRE%2B%2F%2FENORa%2Fue6QVVYMI%2B3SzyqsqKVzB2%2FpHIuYzlBurpKTY4fMvhP4wMLGY7s4GOqUB4uwLUBqjkjVhiomo3sV7060H94N7WxqVSF0mgxZGmYxTeo7lWEbJ9G5cilNBIBfrf5oH4LI3xradjZehTlxaoa3jeupiAmXmSeEEDjIYrLhvnLFL%2FpXP2zrGJy5ZhGDULm8vmQem%2Fp8aLM9wTY7sjXJjhUDYT4Ylv1M7rRLTw6fo5aOWQ3qTiH9WSpStgLKFEuvnDCdIAB9KWpCGguaAnqyhyo7X&X-Amz-Signature=ac10f652e118caf4151621321bca0584d44f0cd766391533b5f2bda8693d5cc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
