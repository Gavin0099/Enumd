---
title: Mac OCI Dll Import 方式
category: mac
notion_id: b3863058-d8a5-4599-8c1d-ed61389b86ca
notion_url: 'https://www.notion.so/Mac-OCI-Dll-Import-b3863058d8a545998c1ded61389b86ca'
notion_updated_at: '2026-01-21T09:32:00.000Z'
exported_at: '2026-04-06T11:20:35.555Z'
is_summarized: false
---

Architecture 可以參考下面連結
https://drive.google.com/file/d/1KSYwzoopvsl-HRUqD2QXZiN32apqsFeA/view?usp=sharing
### HP OCI Tool
- Load dynamic Library 方式
## NSBundle 方式
因為上一種方式要import framework head，所以不能動態去 load framework 
```objective-c
NSString* dlPath = [NSString stringWithFormat: @"%@/GlOciDll_Hub_L1.framework", str];
    
NSBundle *HubL1 = [NSBundle bundleWithPath:dlPath];
NSBundle *myFrameworkBundle = [[NSBundle alloc] initWithPath:dlPath];
if ([HubL1 load]) {
        Class HubL1Class = NSClassFromString(@"HPFI_API");
        if (!HubL1Class) {
            NSLog(@"Unable to load class");
            
        }
    SEL selector = NSSelectorFromString(@"HPFI_InterfaceVersion");
    IMP imp = [HubL1Class methodForSelector:selector];
    int (*func)(Class, SEL) = (int (*)(Class,SEL))imp;
    int  returnCode =  func(HubL1Class,selector);
    printf("returnCode = %d",returnCode );
}
```
https://www.jianshu.com/p/1706054a0658
if (hubL1Test == nil) {
os_log_error(OS_LOG_DEFAULT, "Error: hubL1Test is nil\n");
return 0 ;
}
SEL hubinit = NSSelectorFromString(@"HPFI_Initialize:");
if (hubinit == nil) {
os_log_error(OS_LOG_DEFAULT, "Error: hubinit is nil\n");
return 0;
}
NSMethodSignature *hubSignatureInit = [hubL1Test methodSignatureForSelector:hubinit];
```plain text
if (hubSignatureInit == nil) {
    os_log_error(OS_LOG_DEFAULT, "Error: hubSignatureInit is nil\\n");
    return 0;
}

```
## NSInvocation 方式
```objective-c
NSString *str = [[[NSBundle mainBundle] bundlePath] stringByDeletingLastPathComponent];
NSString* hubL1Path = [NSString stringWithFormat: @"%@/GlOciDll_Hub_L1.framework", str];
    
NSBundle *HubL1 = [NSBundle bundleWithPath:hubL1Path];

if ([HubL1 load]) {

    void **hubVvp = nullptr;
    
    Class hubL1Test = NSClassFromString(@"HPFI_API_HUB_L1");
    SEL hubinit = NSSelectorFromString(@"HPFI_Initialize:");
    NSMethodSignature *hubSignatureInit = [hubL1Test methodSignatureForSelector:hubinit];
    NSInvocation *hubInvocationInit = [NSInvocation invocationWithMethodSignature:hubSignatureInit];
    [hubInvocationInit setArgument:&hubVvp atIndex:2];
    [hubInvocationInit retainArguments];

    hubInvocationInit.selector = hubinit;
    hubInvocationInit.target = hubL1Test;
    [hubInvocationInit invoke];
    
    
    
    
    SEL hubSel = NSSelectorFromString(@"HPFI_GetPackagedFirmwareInfo:");
    NSMethodSignature *hubSignature = [hubL1Test methodSignatureForSelector:hubSel];
    HPFI_FIRMWARE_INFO *ppi = new (HPFI_FIRMWARE_INFO) ;
    ppi->cbSize = sizeof(HPFI_FIRMWARE_INFO);
    NSInvocation *hubInvocation = [NSInvocation invocationWithMethodSignature:hubSignature];
    [hubInvocation setArgument:&ppi atIndex:2];
    [hubInvocation retainArguments];

    hubInvocation.selector = hubSel;
    hubInvocation.target = hubL1Test;
    [hubInvocation invoke];
    
    
    
    
    [HubL1 unload];
}
```
### OCI DLL (framework)
- 因為此framework 是要動態讓Tool 執行的，所以Mach-o Type 要設定為dynamic Library，其他設定可參考Architecture 連結
### Other DLL(framework)
- 其他framework是包在OCI Dll裡面，所以 Mach-o Type 設定為 static Library 即可，其他設定可參考Architecture 連結
### 解決 macOS 應用程序加載動態框架的簽名問題
要解決 macOS 應用程序加載動態框架的簽名問題，有以下幾個步驟：
1. 檢查應用程序和動態框架的簽名證書
1. 為動態框架添加簽名證書
1. 更新應用程序的代碼簽名
1. 重新運行應用程序
