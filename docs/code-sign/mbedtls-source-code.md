---
title: mbedtls Source Code
domain_tags:
  - code-sign
  - sdk
  - security
task_tags:
  - spec
authority_level: source
is_deprecated: false
category: code-sign
notion_id: a6abd599-f50f-46fb-a0f6-d58c87bcc930
notion_url: 'https://www.notion.so/mbedtls-Source-Code-a6abd599f50f46fba0f6d58c87bcc930'
notion_updated_at: '2026-01-21T09:27:00.000Z'
exported_at: '2026-04-06T13:12:05.824Z'
is_summarized: false
relations: []
---

### mbedtls_rsa_init
```c
mbedtls_rsa_init( &rsa, MBEDTLS_RSA_PKCS_V15, 0 );

mbedtls_rsa_init —> mbedtls_rsa_set_padding

```
padding —> MBEDTLS_RSA_PKCS_V15
> **Note:** /*!<  MBEDTLS_RSA_PKCS_V15 for 1.5 padding and
MBEDTLS_RSA_PKCS_v21 for OAEP/PSS         */
hash_id —> 0 
> **Note:** Hash identifier of mbedtls_md_type_t as
specified in the mbedtls_md.h header file
for the EME-OAEP and EMSA-PSS
encoding
mbedtls-development\library\rsa.c
### mbedtls_mpi_read_file
把public key 轉成定義好的format
```c
if( ( ret = mbedtls_md_file(
                    mbedtls_md_info_from_type( MBEDTLS_MD_SHA256 ),
					filename, hash)) != 0)
```
rsa.N(public modulus)
rsa.E(public exponent)
mbedtls-development\library\bignum.c
### mbedtls_mpi_bitlen
計算public modulus長度
mbedtls-development\library\bignum.c
### mbedtls_md_file
mbedtls-development\library\md.c
### mbedtls_rsa_pkcs1_verify
mbedtls-development\library\rsa.c
