---
title: C# 使用C產生的DLL 問題
category: general
notion_id: c3a801c9-b9ef-420f-98bd-b1906bf1c4c4
notion_url: 'https://www.notion.so/C-C-DLL-c3a801c9b9ef420f98bdb1906bf1c4c4'
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:21:10.789Z'
is_summarized: false
---

用偵錯模式(F5)跑到dll中的function時會出現以下錯誤:
Managed Debugging Assistant 'PInvokeStackImbalance'
has detected a problem in
'D:\test_code\WindowsFormsApplication1\WindowsFormsApplication1\bin\Debug\WindowsFormsApplication1.vshost.exe'.
wsFormsApplication1.vshost.exe'
Additional information: 對 PInvoke 函式 'WindowsFormsApplication1!
想知道 stdcall cdecl 代表什麼 請Google "x86 calling convention"
就會有非常多文章講解 在這邊不另外說明
直接講結論
C/C++的標準為 cdecl 這是Visual Studio build C++的預設值
Win32API的標準為 stdcall 這是C# DllImport在x86的預設值
.net 4.0以前(不含) 就算沒指定cdecl CLR會糾正錯誤 但會造成效能上的損失
.net 4.0之後 這項功能因為效能考量被關閉了
https://msdn.microsoft.com/zh-tw/library/ff361650.aspx#Anchor_1
如果需要在.net 4.0之後使用自動修正
在config檔加上
<configuration> <runtime> <NetFx40_PInvokeStackResilience enabled="1"/> </runtime>
</configuration>

而 Visual Studio 2010 之後也在在偵錯模式下的managed debugging assistant
跳出pInvokeStackImbalance這個錯誤提示 好讓寫程式的人知道這個地方有問題
修改方式為
[DllImport("Win32Project1.dll", CallingConvention=CallingConvention.Cdecl)]
public static extern int Add(int a, int b);
或是C++中函式的宣告改為
extern "C" __declspec(dllexport) int __stdcall Add(int a, int b)
兩種選一種即可
