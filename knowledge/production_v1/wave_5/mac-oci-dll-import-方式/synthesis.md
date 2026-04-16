基於提供的內容邊界,我們可以總結 'Mac OCI Dll Import 方式' 的核心概念如下:

# Mac OCI Dll Import 方式

可以參考 [Architecture](https://drive.google.com/file/d/1KSYwzoopvsl-HRUqD2QXZiN32apqsFeA/view?usp=sharing) 文件中的相關內容。

## HP OCI Tool 的動態庫載入方式
HP OCI Tool 有兩種主要的動態庫載入方式:

1. **Load dynamic Library 方式**
2. **NSBundle 方式**

由於上一種方式需要 import framework 的 header,因此無法動態載入 framework。NSBundle 方式可以解決這個問題:

NSString* dlPath = [NSString stringWithFormat: @"%@/GlOciDll_Hub_L1.framework", str];
NSBundle *HubL1 = [NSBundle bundleWithPath:dlPath];
NSBundle *myFrameworkBundle = [[NSBundle alloc] initWithPath:dlPath];
    Class HubL1Class = NSClassFromString(@"HPFI_API");
        NSLog(@"Unable to load class");
    SEL selector = NSSelectorFromString(@"HPFI_InterfaceVersion");
    IMP imp = [HubL1Class methodForSelector:selector];
    int (*func)(Class, SEL) = (int (*)(Class,SEL))imp;
    int  returnCode =  func(HubL1Class,selector);
    printf("returnCode = %d",returnCode );

### NSInvocation 方式
除了 NSBundle 方式,另一種動態載入 framework 的方式是使用 NSInvocation:

NSString *str = [[[NSBundle mainBundle] bundlePath] stringByDeletingLastPathComponent];
NSString* hubL1Path = [NSString stringWithFormat: @"%@/GlOciDll_Hub_L1.framework", str];
NSBundle *HubL1 = [NSBundle bundleWithPath:hubL1Path];

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


## OCI DLL (framework)
- 由於此 framework 是要動態讓 Tool 執行的,因此 Mach-o Type 需要設定為 dynamic Library。其他設定可參考 [Architecture](https://drive.google.com/file/d/1KSYwzoopvsl-HRUqD2QXZiN32apqsFeA/view?usp=sharing) 文件。

## Other DLL(framework)
- 其他 framework 是包在 OCI Dll 裡面,因此 Mach-o Type 可以設定為 static Library。其他設定可參考 [Architecture](https://drive.google.com/file/d/1KSYwzoopvsl-HRUqD2QXZiN32apqsFeA/view?usp=sharing) 文件。

## 解決 macOS 應用程序加載動態框架的簽名問題
要解決 macOS 應用程序加載動態框架的簽名問題,需要採取以下步驟:

[未有直接 Source 錨點，待確認] 1. 檢查應用程序和動態框架的簽名證書
