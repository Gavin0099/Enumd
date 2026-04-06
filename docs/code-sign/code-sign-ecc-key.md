---
title: Code sign - ECC key
category: code-sign
notion_id: edf916c5-e83a-4ad4-82d4-7d54c71ebb46
notion_url: 'https://www.notion.so/Code-sign-ECC-key-edf916c5e83a4ad482d47d54c71ebb46'
notion_updated_at: '2022-03-02T03:23:00.000Z'
exported_at: '2026-04-06T11:20:03.463Z'
is_summarized: false
---

## Genesys Logic code sign overview
- 因應需求，firmware 都必須要驗證合法性。
- Signed bin file format
### Flow
- Sign
- Verify
### Implement ( using OpenSSL )
1. Genkey
1. Sign
1. marge signed bin file
