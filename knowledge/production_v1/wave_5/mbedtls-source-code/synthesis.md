
# mbedtls Source Code

## mbedtls_rsa_init
`mbedtls_rsa_init` 函數用於初始化 RSA 結構。它會設定 RSA 的填充模式和雜湊演算法。

mbedtls_rsa_init( &rsa, MBEDTLS_RSA_PKCS_V15, 0 );

- `mbedtls_rsa_set_padding` 會設定 RSA 的填充模式。
  - `MBEDTLS_RSA_PKCS_V15` 表示使用 PKCS#1 v1.5 填充。
  - `MBEDTLS_RSA_PKCS_v21` 表示使用 OAEP/PSS 填充。
- `0` 表示使用預設的雜湊演算法，詳見 `mbedtls_md.h` 中的 `mbedtls_md_type_t` 定義。

## mbedtls_mpi_read_file
`mbedtls_mpi_read_file` 函數用於從檔案中讀取 public key 並轉換成 mbedtls 定義的格式。

                    mbedtls_md_info_from_type( MBEDTLS_MD_SHA256 ),
                    filename, hash)) != 0)

- `rsa.N` 表示 public modulus。
- `rsa.E` 表示 public exponent。

## mbedtls_mpi_bitlen
`mbedtls_mpi_bitlen` 函數用於計算 public modulus 的位元長度。

## mbedtls_md_file
`mbedtls_md_file` 函數用於計算檔案的雜湊值。

## mbedtls_rsa_pkcs1_verify
`mbedtls_rsa_pkcs1_verify` 函數用於驗證 RSA 簽章。

上述函數都是 mbedtls 程式庫中與 RSA 相關的核心功能。它們被用於 Genesys Logic 韌體的安全簽署與驗證流程中。具體的使用情境可參考相關文件:

1. [`/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html`](./code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
2. [`/code-sign/3rd-party-code-signing-specification-ecdsa.html`](./code-sign/3rd-party-code-signing-specification-ecdsa.html)
3. [`/code-sign/3rd-party-code-signing-specification-ecdsaen-.html`](./code-sign/3rd-party-code-signing-specification-ecdsaen-.html)
