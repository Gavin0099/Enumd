結構 struct 的宣告與封裝和使用練習 c#

## 1. 結構 struct 的宣告

在 C# 中,我們可以使用 `struct` 關鍵字來宣告一個結構。以下是一個示例:

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

在這個例子中,我們定義了一個名為 `Message` 的結構,包含以下成員:

- `MsgId`: 一個 32 位元無符號整數,表示訊息 ID。
- `DLC`: 一個 32 位元無符號整數,表示資料長度。
- `Interval`: 一個 32 位元無符號整數,表示訊息間隔。
- `Handle`: 一個 32 位元無符號整數,表示訊息處理句柄。
- `Data`: 一個長度為 64 的 byte 陣列,用於儲存訊息資料。

我們還使用 `[StructLayout(LayoutKind.Sequential)]` 屬性來指定結構的內存佈局方式,確保各個成員在內存中的順序與定義順序一致。

## 2. 結構的封裝和使用

在 C++ 中,我們可以使用以下方式定義相同的結構:

```c
 struct Message { 
    unsigned int MsgId;
    unsigned int DLC;
    unsigned int Interval;
    unsigned int Handle;
    unsigned char Data[64]; 
```

並在 C++ 中使用以下方式將此結構作為參數傳遞:

```c
extern "C" __declspec(dllexport) int _stdcall MessageWrapper( Message *msg)
```

在 C# 中,我們可以使用以下方式來使用這個結構:

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

在這個例子中,我們首先創建了一個 `Message` 結構的實例 `frame`,並設置其成員變數的值。然後,我們使用 `Marshal.SizeOf()` 方法獲取結構的大小,並使用 `Marshal.AllocHGlobal()` 方法在非托管內存中分配一塊空間。最後,我們使用 `Marshal.StructureToPtr()` 方法將 `frame` 結構的內容複製到非托管內存中。

通過這種方式,我們可以在 C# 中使用在 C++ 中定義的結構,並將其作為參數傳遞給 C++ 函數。

## 3. 總結

在本文中,我們學習了如何在 C# 中使用 `struct` 關鍵字來定義結構,以及如何在 C# 和 C++ 之間傳遞這些結構。我們還了解到,在定義結構時,需要使用 `[StructLayout(LayoutKind.Sequential)]` 屬性來確保內存佈局的正確性。通過這些知識,我們可以更好地在跨語言開發中使用結構類型。