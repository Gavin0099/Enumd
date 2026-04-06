---
title: Mac packages installation file process(CN)
category: mac
notion_id: fd09273b-f260-4e9d-88d5-d6dc971918e8
notion_url: >-
  https://www.notion.so/Mac-packages-installation-file-process-CN-fd09273bf2604e9d88d5d6dc971918e8
notion_updated_at: '2025-03-18T02:43:00.000Z'
exported_at: '2026-04-06T11:20:39.908Z'
is_summarized: false
---

### Summary
Packages 是一个适用于 Mac OS X 10.5 或更高版本的安装包制作和分发工具，适用于软体开发人员和管理员使用。它提供了强大而灵活的功能，可以方便地打包和部署应用程式或插件
### Packages app download URL
http://s.sudre.free.fr/Software/files/Packages.dmg
### Instructions
1. 开启Packages app 或是直接执行附件中的HP OCI Tool.pkgproj，如果直接开启HP OCI Tool.pkgproj 请直接跳到第四步骤
1. 选择Distribution 然后下一步
1. 写入Project Name，目前预设为HP OCI Tool ，Project Directory 为build 出来pkg 的位置
1. 在Settings 里面只要设定版本即可
1. 在Payload 已经设定好安装的路径(Application—>HP_OCI_Tool)
1. 如果要修改档案，在HP_OCI_Tool folder 上面按右键选择 Add Files
1. 全部设定好后选择Build—> Build
1. 会出现Build Succeeded 讯息
1. 在build folder 里面就会出现 pkg 档案，这就是mac 上的安装档
### HP OCI Tool Packages sample setting 
### Packages official User Guide link
http://s.sudre.free.fr/Software/documentation/Packages/en_2017/index.html
