---
title: 'SD Reader Sample Code '
category: general
notion_id: 1bb3599a-57ec-4728-9366-23296f8879f3
notion_url: 'https://www.notion.so/SD-Reader-Sample-Code-1bb3599a57ec4728936623296f8879f3'
notion_updated_at: '2026-01-21T09:35:00.000Z'
exported_at: '2026-04-06T11:26:36.961Z'
is_summarized: false
---

```python
#include <IOKit/IOKitLib.h>
#include <IOKit/usb/IOUSBLib.h>
#include <CoreFoundation/CoreFoundation.h>

IOReturn send_vendor_command(IOUSBDeviceInterface **dev, UInt8 request, UInt16 value, UInt16 index, void *data, UInt16 length) {
    IOUSBDevRequest req;
    IOReturn kr;
    
    // Set up the control transfer parameters
    req.bmRequestType = USBmakebmRequestType(kUSBVendor, kUSBDevice, kUSBIn); // Set as Vendor Command
    req.bRequest = request;    // Custom vendor command code
    req.wValue = value;        // Data value to send
    req.wIndex = index;        // Possibly interface number or other index
    req.wLength = length;      // Length of the data to send
    req.pData = data;          // Pointer to the data to send

    // Send the control transfer to the device
    kr = (*dev)->DeviceRequest(dev, &req);
    if (kr != kIOReturnSuccess) {
        printf("Failed to send vendor command: 0x%x\n", kr);
        return kr;
    }

    printf("Vendor command sent successfully\n");
    return kIOReturnSuccess;
}

int main() {
    CFMutableDictionaryRef matchingDict;
    io_iterator_t iter;
    io_service_t usbDevice;
    IOCFPlugInInterface **plugin;
    IOUSBDeviceInterface **dev;
    SInt32 score;
    IOReturn kr;

    // Match USB device
    matchingDict = IOServiceMatching(kIOUSBDeviceClassName);
    if (!matchingDict) {
        printf("Failed to create matching dictionary.\n");
        return -1;
    }

    // Find matching USB devices
    kr = IOServiceGetMatchingServices(kIOMasterPortDefault, matchingDict, &iter);
    if (kr != kIOReturnSuccess) {
        printf("No USB devices found.\n");
        return -1;
    }

    // Get the first device
    usbDevice = IOIteratorNext(iter);
    if (!usbDevice) {
        printf("No USB device found.\n");
        IOObjectRelease(iter);
        return -1;
    }

    // Create device interface
    kr = IOCreatePlugInInterfaceForService(usbDevice, kIOUSBDeviceUserClientTypeID, kIOCFPlugInInterfaceID, &plugin, &score);
    IOObjectRelease(usbDevice);
    if (kr != kIOReturnSuccess || !plugin) {
        printf("Unable to create plugin interface.\n");
        return -1;
    }

    // Get USB device interface
    kr = (*plugin)->QueryInterface(plugin, CFUUIDGetUUIDBytes(kIOUSBDeviceInterfaceID), (LPVOID *)&dev);
    (*plugin)->Release(plugin);
    if (kr != kIOReturnSuccess || !dev) {
        printf("Unable to get device interface.\n");
        return -1;
    }

    // Send Vendor Command
    char data[64] = {0};  // Data to send
    send_vendor_command(dev, 0xA0, 0x1234, 0, data, sizeof(data));

    // Clean up
    (*dev)->Release(dev);
    IOObjectRelease(iter);

    return 0;
}

```
