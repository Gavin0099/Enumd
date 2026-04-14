結構 struct 的宣告與封裝和使用練習 c#

## 1. 結構 struct 的宣告

在 C# 中,我們可以使用 `struct` 關鍵字來宣告一個結構體。以下是一個範例:

```c#
[StructLayout(LayoutKind.Sequential)]
public struct Message
{
    public uint MsgId;
    public uint DLC;
    public uint Interval;
    public uint Handle;
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]
    public byte[] Data;
};
```

在這個範例中,`Message` 結構體包含了以下成員:

- `MsgId`: 一個 32 位元的無符號整數,代表訊息 ID。
- `DLC`: 一個 32 位元的無符號整數,代表資料長度。
- `Interval`: 一個 32 位元的無符號整數,代表訊息間隔。
- `Handle`: 一個 32 位元的無符號整數,代表訊息處理句柄。
- `Data`: 一個長度為 64 的 byte 陣列,代表訊息資料。

`[StructLayout(LayoutKind.Sequential)]` 屬性用於指定結構體的內存佈局方式,在這裡採用了順序佈局。`[MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]` 屬性用於指定 `Data` 成員的佈局方式,在這裡採用了固定長度的陣列。

## 2. 結構體的封裝和使用

以下是一個使用 `Message` 結構體的範例:

```c#
Message frame = new Message();
frame.MsgId = (uint)MsgId;
frame.DLC = (uint)Dlc;
frame.Interval = (uint)Interval;
frame.Data = new byte[64];

int rawsize = Marshal.SizeOf(frame);
IntPtr frameBuffer = Marshal.AllocHGlobal(rawsize);
Marshal.StructureToPtr(frame, frameBuffer, false);
```

在這個範例中,我們首先創建了一個 `Message` 結構體的實例 `frame`。然後,我們將 `MsgId`、`Dlc` 和 `Interval` 的值賦給 `frame` 的對應成員,並為 `Data` 成員分配了一個長度為 64 的 byte 陣列。

接下來,我們使用 `Marshal.SizeOf(frame)` 獲取了 `frame` 結構體的原始大小,並使用 `Marshal.AllocHGlobal(rawsize)` 在非托管內存中分配了一個緩衝區。最後,我們使用 `Marshal.StructureToPtr(frame, frameBuffer, false)` 將 `frame` 結構體的內容複製到了緩衝區中。

這樣,我們就可以將這個緩衝區作為參數傳遞給 C++ 函數了,如下所示:

```c
extern "C" __declspec(dllexport) int _stdcall MessageWrapper(Message *msg)
```

在 C++ 中,我們也可以定義一個與 C# 中 `Message` 結構體相同的結構體:

```c
struct Message { 
    unsigned int MsgId;
    unsigned int DLC;
    unsigned int Interval;
    unsigned int Handle;
    unsigned char Data[64]; 
};
```

這樣,我們就可以在 C++ 中使用這個結構體,並與 C# 中的 `Message` 結構體進行互操作。

## 3. 總結

在本文中,我們學習了如何在 C# 中使用 `struct` 關鍵字來宣告結構體,以及如何封裝和使用這個結構體。我們還介紹了如何在 C++ 中定義一個與 C# 中 `Message` 結構體相同的結構體,以實現跨語言的互操作。

[C# 語言參考手冊](https://docs.microsoft.com/zh-tw/dotnet/csharp/language-reference/)
[C# 互操作性](https://docs.microsoft.com/zh-tw/dotnet/standard/native-interop/)