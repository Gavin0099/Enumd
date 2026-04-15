

[未有直接 Source 錨點，待確認] ECC 私密金鑰有兩種常見的格式:

   - 將證書或金鑰使用 DER ASN.1 編碼的原始格式儲存
   - 對於私密金鑰而言, DER 格式會將其放置在 `keyhole.key` 檔案的 `08~27` 位元組中 `[DER Format](https://en.wikipedia.org/wiki/X.509#DER_encoding)`

   - 將 DER 格式的證書或金鑰使用 Base64 編碼, 並在頭尾加上標示檔案類型的資訊
   - PEM 格式可以更容易地識別和處理金鑰 `[PEM Format](https://en.wikipedia.org/wiki/Privacy-enhanced_Electronic_Mail)`

[未有直接 Source 錨點，待確認] ECC 金鑰使用的曲線格式有多種選擇, 常見的包括:

- `secp521r1` (預設)
- [未有直接 Source 錨點，待確認] `brainpoolP512r1`
- [未有直接 Source 錨點，待確認] `brainpoolP384r1`
- `secp256r1` (又稱 `prime256v1` 或 `NIST P-256`)
- [未有直接 Source 錨點，待確認] `secp256k1` (Bitcoin 使用的曲線)
- [未有直接 Source 錨點，待確認] `brainpoolP256r1`

可以使用 OpenSSL 的 `ecparam` 命令來產生特定曲線格式的 ECC 私密金鑰:

openssl ecparam -out privatekey.key -name prime256v1 -genkey

[未有直接 Source 錨點，待確認] ECC 金鑰可以在不同格式之間進行轉換, 常見的操作包括:

   openssl ec -in privatekey.key -pubout > publickey.pub
   openssl ec -inform DER -in privatekey.der -pubout > publickey.pub

2. 在 PEM 和 DER 格式之間轉換:
   openssl ec -inform PEM -in private-key.pem -outform DER -out cert.der
   openssl ec -pubin -in publickey.pub -outform DER -out cert.der

ECC 簽章的格式通常遵循 ASN.1 編碼, 包含 `r` 和 `s` 兩個部分. 以下是一個範例:

9D AC 93 72 3D 6D B6 27
C9 47 37 2C 5F 80 C0 A6
C0 28 08 7B BF 6E 86 99
26 AD 48 AC DB 7A 46 EE sig_r
9B F6 E2 3B 74 C7 CE A3
75 A4 BC 2A F9 B1 84 49
6D 0F 8F 13 2B 25 40 1C
C8 FB C1 F6 F4 BE 81 EE 83 sig_s

IKV 使用的是 NIST P-256 曲線, 而 mbedTLS 則使用 `secp256r1` 或 `secp256k1` 曲線. OpenSSL 支援多種曲線, 包括 `secp256r1`、`secp256k1` 和 `prime256v1`.

[未有直接 Source 錨點，待確認] 在實作 ECC 金鑰管理和簽章時, 需要注意以下幾點:

3. 簽章和驗證流程是否正確遵循 ECC 基本運算 (加法和乘法)

此外, 為了滿足 FIPS 140-2 Level 3 的安全標準, Genesys Logic 採用了基於 ECDSA 演算法和 NIST P-256 曲線的內部簽章系統, 並使用 FIPS L3 認證的 USB eToken 硬體來安全地儲存金鑰.
