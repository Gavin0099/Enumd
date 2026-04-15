以下是基於提供的內容所撰寫的 GL 3590 ECDSA 程式碼驗證文件:

# GL 3590 ECDSA 程式碼驗證

本文件旨在說明 Genesys Logic 針對 GL 3590 韌體開發所設計的 ECDSA 程式碼簽署與驗證流程。為滿足 HP Code Signing 的安全要求，Genesys Logic 採用了 ECDSA nistp256 加密演算法並遵循 FIPS 140-2 Level 3 安全標準。

## ECDSA 簽署與驗證流程

### 1. 雜湊運算 (Hash)
[未有直接 Source 錨點，待確認] 首先會對韌體映像檔進行雜湊運算,產生 32 bytes 的雜湊值。在本案例中,雜湊值如下:

DB B9 66 93 5F EB B0 AE B2 5C 1C 53 3C 83 50 33 
0F 2B B3 E0 80 1F 07 95 D6 06 8D 3C B7 76 66 66


F9 F4 52 A9 4D 67 99 A7 30 8A A9 61 5B 6A 59 51 
EF 96 56 39 C2 AD A9 A4 BD 02 0A C6 CE DA A5 9B 
6A 71 06 3F 4F 7D 4B B6 72 E3 4D 29 0A 40 17 19 
87 45 AC 94 50 F7 1C 8C E1 05 A5 44 08 B3 14 55


4A CD 5D A8 8F 27 01 DC 99 41 FB 1A 75 5F 68 B4
7C E7 3A 8C C7 55 5E 2D B4 07 05 60 ED 03 28 2E 
AE D2 86 0D 34 18 DD B1 4C ED 4F C5 55 01 68 B1 
D2 D7 70 55 73 F6 F7 60 E4 36 E9 EE 8A DB 43 6A

[未有直接 Source 錨點，待確認] 為了確保驗證的正確性,在進行 hash、公鑰和簽章驗證時,都需要將資料反轉一次才能進行後續的驗證流程。只有在所有驗證項目都通過後,才能確認韌體的合法性。

1. [`-genesys-logic-firmware-安全簽署與驗證流程-code-signing-`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
2. [`3rd-party-code-signing-specification-ecdsa`](/code-sign/3rd-party-code-signing-specification-ecdsa.html)
3. [`3rd-party-code-signing-specification-ecdsaen-`](/code-sign/3rd-party-code-signing-specification-ecdsaen-.html)