---
title: 結構 struct 的宣告與封裝和使用練習 c#
domain_tags:
  - sdk
task_tags:
  - spec
  - config
authority_level: source
is_deprecated: false
category: sdk
notion_id: 9670f1d3-d332-4fe0-813e-7f444f616567
notion_url: 'https://www.notion.so/struct-c-9670f1d3d3324fe0813e7f444f616567'
notion_updated_at: '2022-12-13T08:39:00.000Z'
exported_at: '2026-04-06T13:13:28.678Z'
is_summarized: false
relations: []
---

This is my structure mapping in c#:
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
C++ here:
```c
 struct Message { 
    unsigned int MsgId;
    unsigned int DLC;
    unsigned int Interval;
    unsigned int Handle;
    unsigned char Data[64]; 
```
My method in c++ which needs such a structure as a parameter:
extern "C" __declspec(dllexport) int _stdcall MessageWrapper( Message *msg)
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
