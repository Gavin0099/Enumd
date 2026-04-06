---
title: Linux USB Hid Description
category: general
notion_id: 20e64f6b-c656-8045-9c13-f21bba5e4f1c
notion_url: >-
  https://www.notion.so/Linux-USB-Hid-Description-20e64f6bc65680459c13f21bba5e4f1c
notion_updated_at: '2026-01-21T09:37:00.000Z'
exported_at: '2026-04-06T11:27:45.741Z'
is_summarized: false
---

```swift
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <linux/hidraw.h>
#include <iostream>
#include <cstring>
#include <cerrno>

void printErr(const std::string& context) {
    std::cerr << "[ERROR] " << context << ": " << strerror(errno) << " (errno=" << errno << ")" << std::endl;
}

int main() {
    const char *device = "/dev/hidraw0"; // 根據實際情況修改
    std::cout << "[INFO] Opening device: " << device << std::endl;

    int fd = open(device, O_RDWR);
    if (fd < 0) {
        printErr("Failed to open device");
        return 1;
    }

    struct hidraw_report_descriptor rpt_desc;
    memset(&rpt_desc, 0, sizeof(rpt_desc));
    rpt_desc.size = sizeof(rpt_desc.value);

    std::cout << "[INFO] Requesting HID Report Descriptor..." << std::endl;

int result = ioctl(fd, HIDIOCGRDESC, &rpt_desc);
if (result < 0) {
    int errcode = errno;
    std::cerr << "[ERROR] ioctl failed, errno = " << errcode << " (" << strerror(errcode) << ")" << std::endl;
    // 你也可以根據 errcode 做條件判斷
}

    std::cout << "[INFO] HID Report Descriptor Size: " << rpt_desc.size << " bytes" << std::endl;
    std::cout << "[DATA] Report Descriptor (hex):" << std::endl;
    for (int i = 0; i < rpt_desc.size; ++i) {
        printf("%02hhx ", rpt_desc.value[i]);
        if ((i + 1) % 16 == 0) std::cout << std::endl;
    }
    std::cout << std::endl;

    close(fd);
    std::cout << "[INFO] Device closed successfully." << std::endl;
    return 0;
}

```
## ✅ 附註：常見 errno 參考對照表（節錄）
