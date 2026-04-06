---
title: GL Bin Tool
category: general
notion_id: 19264f6b-c656-8041-942e-d62539051408
notion_url: 'https://www.notion.so/GL-Bin-Tool-19264f6bc6568041942ed62539051408'
notion_updated_at: '2025-02-14T07:23:00.000Z'
exported_at: '2026-04-06T11:18:26.366Z'
is_summarized: false
---

```c#
public enum CodeSignType
{
    None = 0,
    RSA = 1,
    ECDSA = 2
}

// 設定共用參數
CodeSignType signType = CodeSignType.None;

if (options.CodeSignType.Contains(CodeSignType.RSA.ToString()))
    signType |= CodeSignType.RSA;

if (options.CodeSignType.Contains(CodeSignType.ECDSA.ToString()))
    signType |= CodeSignType.ECDSA;
```
```c
static byte CalCheckSum(byte[] checkSumBuf, int offset, int bufSize)
{
    int tempInt = 0;
    byte tempCheckSum = 0;

    for (int i = offset; i < offset + bufSize - 2; i++)
    {
        tempCheckSum += checkSumBuf[i];
    }

    return tempCheckSum;
}

```


