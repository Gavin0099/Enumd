結構 struct 的宣告與封裝和使用練習 c#

## 1. 結構 struct 的宣告
在 C# 中,我們可以使用 `struct` 關鍵字來宣告一個結構。以下是一個示例:

[StructLayout(LayoutKind.Sequential)]
public struct Message
    public uint MsgId;
    public uint DLC;
    public uint Interval;
    public uint Handle;
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]
    public byte[] Data;

在這個例子中,`Message` 結構包含了 5 個成員:
- `MsgId`: 一個 32 位元的無符號整數,代表訊息 ID。
- `DLC`: 一個 32 位元的無符號整數,代表資料長度。
- `Interval`: 一個 32 位元的無符號整數,代表訊息間隔。
- `Handle`: 一個 32 位元的無符號整數,代表訊息處理句柄。
- `Data`: 一個長度為 64 的 byte 陣列,代表訊息資料。

`[StructLayout(LayoutKind.Sequential)]` 屬性確保了結構成員在記憶體中的佈局順序與宣告順序一致。`[MarshalAs(UnmanagedType.ByValArray, SizeConst = 64)]` 屬性則指定了 `Data` 成員的大小為 64 個 byte。

在 C++ 中,我們可以使用以下的結構定義:

 struct Message { 
    unsigned int MsgId;
    unsigned int DLC;
    unsigned int Interval;
    unsigned int Handle;
    unsigned char Data[64]; 

為了在 C# 與 C++ 之間傳遞 `Message` 結構,我們需要使用 .NET 的 `Marshal` 類別來進行封裝和解封裝。以下是一個示例:

 Message frame = new Message();
 frame.MsgId = (uint)MsgId;
 frame.DLC = (uint)Dlc;
 frame.Interval = (uint)Interval;
 frame.Data = new byte[64];

 int rawsize = Marshal.SizeOf(frame);
 IntPtr frameBuffer = Marshal.AllocHGlobal(rawsize);
 Marshal.StructureToPtr(frame, frameBuffer, false);

在這個例子中,我們首先建立了一個 `Message` 結構的實例,並設置了它的成員值。接下來,我們使用 `Marshal.SizeOf()` 方法獲取了結構的大小,並使用 `Marshal.AllocHGlobal()` 方法在非托管記憶體中分配了一塊空間。最後,我們使用 `Marshal.StructureToPtr()` 方法將 `Message` 結構的內容複製到了非托管記憶體中。

通過這種方式,我們就可以將 C# 中的 `Message` 結構傳遞給 C++ 中的函式了。

在本文中,我們學習了如何在 C# 中使用 `struct` 關鍵字來宣告結構,以及如何使用 .NET 的 `Marshal` 類別來封裝和解封裝結構,以便在 C# 和 C++ 之間進行資料交換。這種技術在需要與非托管程式碼互操作的情況下非常有用。