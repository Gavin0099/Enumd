---
title: MonitorVCP
category: monitor
notion_id: 12164f6b-c656-8098-83b4-cce9ca2db613
notion_url: 'https://www.notion.so/MonitorVCP-12164f6bc656809883b4cce9ca2db613'
notion_updated_at: '2026-01-21T09:35:00.000Z'
exported_at: '2026-04-06T11:26:39.782Z'
is_summarized: false
---

```javascript
import Foundation
import IOKit

// Helper function to decode EDID data
func decodeEDID(_ edid: Data) -> [String: Any]? {
    guard edid.count >= 128 else {
        return nil
    }
    
    var result = [String: Any]()
    
    // Decode manufacturer ID
    let manufacturerIdBytes = [edid[8], edid[9]]
    let productCodeBytes = [edid[10], edid[11]]

    let manufacturerId = String(format: "%c%c%c",
                                ((manufacturerIdBytes[0] >> 2) & 0x1F) + 64,
                                (((manufacturerIdBytes[0] & 0x03) << 3) | ((manufacturerIdBytes[1] >> 5) & 0x07)) + 64,
                                (manufacturerIdBytes[1] & 0x1F) + 64)

    let productCode = Int(productCodeBytes[0]) | (Int(productCodeBytes[1]) << 8)
    let serialNumber = Int(edid[12]) | (Int(edid[13]) << 8) | (Int(edid[14]) << 16) | (Int(edid[15]) << 24)

    // Manufacture date
    let weekOfManufacture = edid[16]
    let yearOfManufacture = Int(edid[17]) + 1990

    // Display size in cm
    let horizontalSize = Int(edid[21])
    let verticalSize = Int(edid[22])

    // Gamma value (stored as (gamma * 100) - 100)
    let gammaValue = (Double(edid[23]) + 100) / 100.0

    // Supported resolutions (example, this can be expanded based on EDID data)
    let supportedResolutions: [String] = [
        "640x480", "800x600", "1024x768", "1280x1024", "1600x1200"
        // You can add more resolutions based on detailed timing descriptors in the EDID
    ]

    // Extract additional information
    result["Manufacturer ID"] = manufacturerId
    result["Product Code"] = productCode
    result["Serial Number"] = serialNumber
    result["Manufacture Week"] = weekOfManufacture
    result["Manufacture Year"] = yearOfManufacture
    result["Size (cm)"] = "\(horizontalSize)x\(verticalSize)"
    result["Gamma"] = gammaValue
    result["Supported Resolutions"] = supportedResolutions

    // Extract monitor name if available
    let monitorName = extractMonitorName(from: edid)
    if let monitorName = monitorName {
        result["Monitor Name"] = monitorName
    }

    return result
}

// Extract the monitor name from EDID
func extractMonitorName(from edid: Data) -> String? {
    for i in stride(from: 54, to: 126, by: 18) {
        if edid[i] == 0x00 && edid[i + 1] == 0x00 && edid[i + 2] == 0x00 && edid[i + 3] == 0xFC {
            let nameData = edid.subdata(in: (i + 5)..<min(i + 18, edid.count))
            if let name = String(data: nameData, encoding: .ascii)?.trimmingCharacters(in: .whitespacesAndNewlines) {
                return name
            }
        }
    }
    return nil
}

// 遞歸列出所有屬性
func listProperties(for service: io_registry_entry_t, depth: Int = 0) {
    var properties: Unmanaged<CFMutableDictionary>?
    let result = IORegistryEntryCreateCFProperties(service, &properties, kCFAllocatorDefault, 0)
    
    if result == KERN_SUCCESS, let props = properties?.takeRetainedValue() as? [String: Any] {
        print(String(repeating: "  ", count: depth) + "屬性: \(props)")
        
        // 提取關鍵屬性
        if let edidData = props["IODisplayEDID"] as? Data {
            if let edidInfo = decodeEDID(edidData) {
                print(String(repeating: "  ", count: depth) + "顯示器解析資訊: \(edidInfo)")
            } else {
                print(String(repeating: "  ", count: depth) + "無法解析 EDID 資料")
            }
        } else {
            print(String(repeating: "  ", count: depth) + "無法獲取顯示器的 EDID 資料")
        }
    } else {
        print(String(repeating: "  ", count: depth) + "無法獲取屬性")
    }
    
    var childIterator: io_iterator_t = 0
    if IORegistryEntryGetChildIterator(service, kIOServicePlane, &childIterator) == KERN_SUCCESS {
        var child: io_service_t = 0
        // 使用正確的賦值和比較方式
        while true {
            child = IOIteratorNext(childIterator)
            if child == 0 {
                break
            }
            print(String(repeating: "  ", count: depth) + "子節點:")
            listProperties(for: child, depth: depth + 1)
            IOObjectRelease(child)
        }
        IOObjectRelease(childIterator)
    }
}

// 匹配顯示器服務
let matching = IOServiceMatching("IODisplayConnect")

if matching == nil {
    print("IOServiceMatching 返回 nil")
} else {
    var iterator: io_iterator_t = 0
    let result = IOServiceGetMatchingServices(kIOMasterPortDefault, matching, &iterator)

    if result == KERN_SUCCESS {
        var service: io_service_t = 0

        while true {
            service = IOIteratorNext(iterator)
            if service == 0 {
                print("未找到更多匹配的服務")
                break
            }

            // 使用[CChar] 陣列來獲取 service 名稱
            var serviceName = [CChar](repeating: 0, count: MemoryLayout<io_name_t>.size)
            let kernResult = IORegistryEntryGetName(service, &serviceName)

            if kernResult == KERN_SUCCESS {
                let name = String(cString: serviceName)
                print("找到顯示器服務: \(name)")

                // 列出該服務及其子節點的所有屬性
                listProperties(for: service)
            } else {
                print("無法獲取顯示器設備名稱, 錯誤代碼: \(kernResult)")
            }

            IOObjectRelease(service)
        }
    } else {
        print("未找到匹配的設備, 錯誤代碼: \(result)")
    }

    IOObjectRelease(iterator)
}

```
