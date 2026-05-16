---
title: GL3590 +HostBridge Code Sign
domain_tags:
  - hub
  - code-sign
  - tools
  - security
task_tags:
  - code-sign
  - log
authority_level: source
is_deprecated: false
category: hub
notion_id: 06e74c82-89ff-48be-9919-4e76eae5b2ea
notion_url: >-
  https://www.notion.so/GL3590-HostBridge-Code-Sign-06e74c8289ff48be99194e76eae5b2ea
notion_updated_at: '2026-04-13T07:09:00.000Z'
exported_at: '2026-05-16T12:36:19.054Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

GL3590 +HostBridge Code Sign

**1.marge bin Tool**

SVN: [https://gli-cse.genesyslogic.com.tw/svn/storage/Users/GavinWu/Windows/GLBinTool](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/GavinWu/Windows/GLBinTool)

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/b258c522-1c9a-49e5-b5cf-9337e4e85369/untitled?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7BMZDUA%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCK7d4J1bbed6%2BA96LK9rufehpMmgPzW4rIomr1x0NYHQIgDi2HQ6y%2FaugalWbSueGwDyv1fn0H4CRf8GADz712ugMqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDImhgB37C0OZw6sDzyrcAwf07ddHZijKF%2FULgAteMXuly8sIl5pMXKm41mtM%2FVYVs02WtTuYKnSVPVg1%2FXC8T4UDPcLy0kMO2mJAIDNIGi4naqEA3YCoEGQLlIyYcsG7%2FxC3%2BXVVyIptQXykyIKbYOE6AZ6mFww2ezOH3Zb0UbVZbmCo22Aqp5q5ZuCf%2B%2FNj5k%2FacESPVsyZicrHDOdCDo4xCIwFb%2B1%2Bq%2FMwlwZlk8bRK8REBHDmXNd2n1Okm9Pt4o0%2FbapQRHXYqFDQRatMwGCS62aHDPL00iNSbqgRoGbfPrnh9OBeNmPToFD7ThMijLZZcepwr%2F%2Bm%2BqzzIX%2FDP0aeJYRh5t8Ch1AGiVgMEjMQFe6PdPjLbBjBqO7dNcbRIaP029xHaVrit1xti%2Bp6ZZ86c1CdeikfDSdKCpwqtN65v%2FRV6YcYtNHXvMotWLhEtawJC3eId%2FDi8UlC8go1xpdbE0Il3YVmj00JleXYzKQPuFf9LfNiziFbMh14fi8mIaO9RF7t%2FQtwBWq7CPPGw220A5AxSQnTgKwitmI7BWTa6MeZuPedaczkbntsf1I06bN3jalSXf3EabeYuwQjikvFyLwWwzVt1MgozOS2bFTqn40mYjXrZynAWqeT%2FEKu7Utww%2FnIJgISWlY1MO7poNAGOqUBimHE5JNwxrfPQdmehEqEhvvZSl80baYr3OuwdRNL5n9iWsDX32cbGCh74ikRUcs6rFMBg7osUPmWCrd16JFGjaCgkhI7pGROuME2uCKGnyfHYdHwUm2QQoLeZ1NMyRrUd6PjUXIDGTRGIshuSJ2wiYMkWElyhoLv5%2F2GYM3SaFmfmeBZ1DDXuggR4nCWzXevUFl%2BbWv46B4NooLEJEz1CzyCEJ9B&X-Amz-Signature=0421d7a4959e365d5dd6e71d05299f0b58ed71bb994644e4703f3f2f1510b4aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

a. bin + host bridge 合併成sum檔 (提供Sign Tool 加密讓 HP ISP Tool 燒錄)

GLBinTool.exe -i GL3590-TZ2YS1_Hub_UFPC(Host)_FW8725.bin -h GL3590_HostBridge_FW1008.bin -o bbb.sum

b.bin + host bridge + public key 合併成sum檔 (提供給燒錄機燒錄)

GLBinTool.exe -i GL3590-TZ2YS1_Hub_UFPC(Host)_FW8725.bin -h GL3590_HostBridge_FW1008.bin -p 5678.pub -o bbb.sum

**2.HP ISP Tool**

SVN: [https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/HP_ISPTool](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/HP_ISPTool)

提供ISP功能

1.Hub + Host Bridge sign

2.Hub Sign

3.Scaler Sign

4.PD

5.Billboard

目前未完成功能

a.GL3590 code sign initial

b.Hub + HostBridge ISP

b.Hub + HostBridge Recovery

**GL3590 code sign initial**

1.Fw 會透過 Toolstring 告知Support 那個mode ( 還沒有確定做法)

2.切換Vendor Command ( 81 --> A1 )

3.做ToolString 驗證(IsFixtureValid)

**Mask Code**

1.燒錄 Hub 0 + Hub 1 + H.B 0 + H.B 1 + public key

2.write digest

3.verify digest

3.1 verify fail erase block 0 1 2 3 4

4.write signature

5.verify signature

5.1 verify fail erase block 0 1 2 3 4

**Ram Code**

判斷 Hub 和 H B 跑在哪個 Block ( 可以問firmware 抓到值?)

**1.Hub**

a.跑在 Hub0

- Erase Hub 1

- Hub 0 copy 到 Hub 1

- Erase Hub 0

- 燒錄Firmware 到 Hub0

b.跑在 Hub1

- Erase Hub 0

- 燒錄Firmware 到 Hub0

**2.Host Bridge**

a.跑在 HB0

- Erase HB 1

- Hub 0 copy 到 HB 1

- Erase HB 0

- 燒錄Firmware 到 HB0

b.跑在 HB1

- Erase HB 0

- 燒錄Firmware 到 HB 0

**3.write digest**

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/e3701232-4d01-46b7-b01f-0fbc7a0f3c63/GL3590_Code.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7BMZDUA%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCK7d4J1bbed6%2BA96LK9rufehpMmgPzW4rIomr1x0NYHQIgDi2HQ6y%2FaugalWbSueGwDyv1fn0H4CRf8GADz712ugMqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDImhgB37C0OZw6sDzyrcAwf07ddHZijKF%2FULgAteMXuly8sIl5pMXKm41mtM%2FVYVs02WtTuYKnSVPVg1%2FXC8T4UDPcLy0kMO2mJAIDNIGi4naqEA3YCoEGQLlIyYcsG7%2FxC3%2BXVVyIptQXykyIKbYOE6AZ6mFww2ezOH3Zb0UbVZbmCo22Aqp5q5ZuCf%2B%2FNj5k%2FacESPVsyZicrHDOdCDo4xCIwFb%2B1%2Bq%2FMwlwZlk8bRK8REBHDmXNd2n1Okm9Pt4o0%2FbapQRHXYqFDQRatMwGCS62aHDPL00iNSbqgRoGbfPrnh9OBeNmPToFD7ThMijLZZcepwr%2F%2Bm%2BqzzIX%2FDP0aeJYRh5t8Ch1AGiVgMEjMQFe6PdPjLbBjBqO7dNcbRIaP029xHaVrit1xti%2Bp6ZZ86c1CdeikfDSdKCpwqtN65v%2FRV6YcYtNHXvMotWLhEtawJC3eId%2FDi8UlC8go1xpdbE0Il3YVmj00JleXYzKQPuFf9LfNiziFbMh14fi8mIaO9RF7t%2FQtwBWq7CPPGw220A5AxSQnTgKwitmI7BWTa6MeZuPedaczkbntsf1I06bN3jalSXf3EabeYuwQjikvFyLwWwzVt1MgozOS2bFTqn40mYjXrZynAWqeT%2FEKu7Utww%2FnIJgISWlY1MO7poNAGOqUBimHE5JNwxrfPQdmehEqEhvvZSl80baYr3OuwdRNL5n9iWsDX32cbGCh74ikRUcs6rFMBg7osUPmWCrd16JFGjaCgkhI7pGROuME2uCKGnyfHYdHwUm2QQoLeZ1NMyRrUd6PjUXIDGTRGIshuSJ2wiYMkWElyhoLv5%2F2GYM3SaFmfmeBZ1DDXuggR4nCWzXevUFl%2BbWv46B4NooLEJEz1CzyCEJ9B&X-Amz-Signature=d0f125937cec5f82afe10fa505e34426376ca57f488d8f0599d2f1984d5b7eee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

**4.verify digest**

4.1 verify fail

- Erase 原本燒錄的那塊

**5.write signature**

**6.verify signature**

- Erase 原本燒錄的那塊

**3.IKV Tool**

SVN: [https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/IKV](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/IKV)

提供 Code Sign功能

a.generate key

openssl ecparam -out privatekey.key -name prime256v1 -genkey

b.sign

ikvTool.exe sign -k 1234.priv -p 1234.pub -f 1121.sum

c.verify

ikvTool.exe verify -k 1234.pub -f 8400.sum -r 8400.sum.SigR -s 8400.sum.SigS -t sw
