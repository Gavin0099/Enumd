---
title: Chip code sign Info List (HP)
domain_tags:
  - code-sign
  - security
task_tags:
  - code-sign
  - spec
authority_level: derived
is_deprecated: false
category: code-sign
notion_id: d76ab53a-bbd1-4409-9b96-05a5bbd296f1
notion_url: >-
  https://www.notion.so/Chip-code-sign-Info-List-HP-d76ab53abbd144099b9605a5bbd296f1
notion_updated_at: '2026-01-21T10:11:00.000Z'
exported_at: '2026-04-12T16:23:09.060Z'
is_summarized: false
relations: []
---

[UNSUPPORTED_BLOCK: child_page]

<details><summary>RSA2048 Code Sign Method</summary>



- Sign bin file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/3d59c9f7-fe6e-49d0-adf4-bd40108560ed/Hub_Code_Sign_bin_Format_%285%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ALYNL2F%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFN%2Fuple3dg8L5616mW0sMZLpdWPCobDIzHwwDHItfT5AiBRQvkbuOY1RajxFOoqcq3PGDOn2887vGYrn%2FoDaMEZvSr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMnNMCJDdiehUwq%2BLMKtwDON29iX9Umj2EMwburJ5b3%2F7vzbRqD77OjlhY%2BivUfat7xQVPfp7aREwz5bucUDAcKya4qbBYq2xtJg0WZlZxiQefO6%2FQyT1SrAn6wXUdrlva5HpnqYQ4KVxqbduf69JKnmGZvfSYwnlGk82LLY0y9s8cT381TqhCR4ilRf%2BnlOmS9wKNDRKyTaLx2f%2FZIH1B5x6x3iekWNcctm9HytE3HeHofiKNV9aOd5M87D3sxa8n4mlJnPBGX4Q1utKgNJ1b4yRT6SQvZokJZuThWLqOGF3sxIUNjj3e5db7G0FleuIZQ8DC56kuRR7mnPW8X45opmZ1mW4kCBuEqVtLAHtKrf4in7RK2CQT5ghGQM9%2B32cqoD%2FGTAclDh7eseR%2BrWDl1Uvl%2BGBbKFZbk4jBJzGaiOQ0QrhHoQlTHynP4QB0y47sLj02MO8FzsLAHtx32k079xdp2uUoP7rkOmmENtOGhXMvpT852RqUbfBvXgyM6DxJa09U6vN09VK6dJ4otY9838CuO0HJHfJZietsld4MNIGbx19d%2B6MbbTdsk0UwkGVry%2BsNUUj0O8WO3BfrkvFdXexeRNxfcLYxbLEHOVoEEd%2FyUasaA2UAry2UTvtEZ05FL0mIG39HRM6rbr4wp5LuzgY6pgFLjOTM%2BYQsOd7p5fk9TWt3wdMB%2B6zQ68PDOnuG3QUcSJ3Yw6znE6Ofn9TBwl0Y4Hjm8iA0dRLQXaitvANzBHt8Pd6qSG7pVSPYY5L2AkD9449ZIaYHseGRU4mkC3ihDSxyviFVDTvSKvRojAWa25C0OuMXJwW30zaX2z2soZPeeMCJGzTEbQ1vWwphhCowAhgCfLfWDCWOGgNuntOBZYbmImdxvPEZ&X-Amz-Signature=a2b3134a70fcadc70ded063d82800e73886527c95b44c45e81726d418e590ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Rom file format(Flash 裡面存放的方式)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/8075fc74-1cca-4922-9b99-7725b14f3c67/Hub_Code_Sign_bin_Format_%287%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FRTPVWG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICvsbqNbKSuvtJ7u0ExK2K%2FpFN%2BOq7MVYjFiVljk3fyoAiADUwnVFL6nHtg6NllFq2CTqzeV5VQXbFkXbFRoVSlaiir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMUwr%2Bk9k%2Fhnu2Y9%2FNKtwD34IWf8SdwFcRYYucE%2FV82eNkGiuUs7BcSn4RqRGrAO7ntJfpt7lH8GTLYgpaKB2bzQnPfHhMTswzKo3DhUYzummwTyf4suwoqhzGyfxdqPalDpbcZzAmIgv5Epq1XsbrP%2FjD2%2FHxvIEY2I%2BADuGSHv7mGT5oNuzu5gWWqNAbhYkSdbLtklY7YoJjhNN2a6PT738PaRHWIKWyroN0YHJYld2AOQVEHzAh%2BDGlWSMdGjODQTxDuGTmZBGIj2eJfbItcN%2BFPFPJSFSVitjaIuPqZF4CSE4NqmBLZljx1dxjVJWLtWENBU7MtHVez4IeWo5FmQVrZ1uMNI9aCy2MGb7hBk9FpI4m9SOnCQRGGnGarqjb5YPwhB7c5M5esOpgmtuGaExIPQcbhqHiOk3GFIdyL20TIVJwe0nMI7Df8%2BuFxZxISgBoMKBHKjSDR7xdUyFX0Yso1Qs8Afz2NgU5ZF8h8%2BNH4zXnZUWwJ48m8mAq1BNKIzsEJBtiqIKLVkrJ%2FnWuOlQf4VK%2FGMvsvkHTOdR3FmC17Ldm8FN71CbeitnDZRbxo0BcfwcSwa%2BxlK97obfUZYWwoxmMYFWx0EXbN8OjZdTUhqroo0YOtJH2LFKhq0iOAmUhRpKxB986OFkwvZnuzgY6pgEzfNZwcoMIUnmDz%2FfFczX30Cd6GB5l0RHWbDIY%2BWUNzeZHlgaELOEjVygH1HmW5SIHE1sgGkvXSwB1AGngJ3lxhkagPhWRPoo3Vd4OL84%2BjifAl72G%2BZIAQFzXmYBwKMWptjEU8RGazoZ6hvhSTV7%2Ftup8QXYZOny2Mgqu8qPiYN4Fg5%2Fxra%2FPSOymnA%2BNWYMiGrdOQOGD8dXUdzCa0UdNQ1EmSgra&X-Amz-Signature=306f043b7ae6a4b5097e044e05a9f22b0c61c1355e6fd3467d4770754d845f84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  **Command line instruction**
  
  > **Note:** GLBinTool.exe -s GL3523-ONY3H_Qisda_HP_Z34C_L3Hub_FW1020sig.bin -m -o GL3523-ONY3H_Qisda_HP_Z34C_L3Hub_FW1020sig.rom
</details>

<details><summary>ECDSA Code Sign Method</summary>



- Sign bin file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/1dcf69e6-016d-4d0f-8711-6dba3100b9c7/Hub_Code_Sign_bin_Format_%289%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ5CVCUL%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBT00W8Smeprlgm6r8S71JWAbS6zEmBkBv%2F4ptXyJL13AiB8u9x7WiPE8bFRUvMwmr1yhKskl7qlgyILnbL5bzbooir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMbgw72RRsbmeZGtx8KtwDmpAnrypqwoN0AUmyyEM5HhVQ%2B2xe%2FOPWR651bUtBlfGc9JR4RNs7rNebbqoUh64wEqmQyhytb4TmbHx6%2FSPgeleNWQB%2FPbC0glDCtt8pLAQ3LN922%2B2gN2ruyiMU7MAtD4Qo4nwav%2F1GvujRKfXMs0FIBdGTKBPGEfwMOovlL5Yenbsf%2F%2FGmFZx0J90Z5rBLvy4V4z9Dg9BRaiEkAcRBxqBZVMA7NuNXTPxXyUJ7JLMbGGZSex2z72F1uyRD%2BK%2BjKgpAThccm1BEklM2Kck5RObkKvQkqybZvV26yO3vBV0zjH4GMJFTEnDsHJ9VSBagcPs%2Bfhn7X0TC%2FjG0R21vxgJh1ESSRdZT5TSjZZhQhOoXGH6kS%2Fa2PnOQsBZddF%2BXcBQ5KXQGpylSN98CjPZqXMF1v995YmlLaAbNkac3dIu7kWhsv9uwBds1Bnbs%2BHZj1R%2BtxXwoTLuBy8WdlhF%2Besv6dSR%2FLeEDCiKAbo0%2FytaqPIVe2dPIcsw2%2FKgWlCAK5C%2BXEr7yVe%2B9X6vfKeFNwgRjC9idJ5gm4A1F6xOFBWpckUv56b8dtlGoXQAqujDgrjpyihGsVJe1hef4TSvuOjeok45SVtPKkKD7kGjZo%2BlML8KF2Q3CgpKDJ8kw%2B5buzgY6pgF28JG79wWI6ma0gaTHwejB5PnZUQzbTsUwInbysvmY6b2N2tJOAfKqNPqBS9tRMq22wLwl6BBRGAD3AXH8FUCTQ7Fl06sKhwMHVMGIOBIqU6bfCq%2Fy6KgpROE23T8%2BV%2B2JR2HRA%2B5%2FvsIEt%2B7DUEYV3Bu1XKg68FiwkZm1iCi3L3x56tJ0g%2F28laut9pnMo%2BfCOf6qpPKtTMkwQw5nHfOjdlUw%2BjTG&X-Amz-Signature=b88a8bd8a95cf98a749ec91c0e1602b94495b5ab2be6a2850a7a24f0731b37e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Rom file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/b630cb3c-12cd-4c5a-ba67-7d49648b6a95/Hub_Code_Sign_bin_Format_%2810%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RUFYX3R%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDwM6x3HrXj4J2eUIEZEGGtNHxiL3cvpbDbkCpeNmsVigIgCTXwmV1X4Ycra%2F%2F%2BuogHkKdALza1t3Kd4fNtnKMA%2Bz4q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDBrKzCeJ%2Fdc58V1xRCrcA%2BmRKzajHt1AbFA55jhgq4dFn9H5jThA3%2BXXLMGwxqCwDIK7fxV%2BkOuupaRWevzGQcSYsJJd3lbXsC4ycACDdVKXx3fUBvKkJ8pML28oLFnoVKx8eJrq2GdT7gY9lz2W%2FK%2FtJqqaHw%2BO7hQ6J%2FX3hDmVeI%2Fn1r4%2BLU52yLtggAvXlmNk3gGZmqrwmBx%2F8021Z9HhCjIO44s95EZmt8AvyeBjZlXdQq39sY8YHKqLJSPLRTmiXGEECsuoh%2FjLRxYFRBMOtUWbK6W4%2FsgjQQlkvwShEqYE0PIQ7ufpU9GOx%2BIJDARXuStJ7oJKJgB1CNzshVFLx6sObe6i0VQRFhprkPIWnAXQ0vTaNr06CXbCyEPI0xyIGtU44nuAUbq%2BNTs9nxboPLL6K1NfnorznDFTIQtujkjpuCY2XAualzigsfF9KcIP6K9Q0hjsIKCHoxhKFYEgbEnJCICppT5W4IdPPe3vba%2Bxz3BmZ%2FBsSg2eeUMZRSm63bnmHdd9Om2JDBaRqTIpuzbd8pGtVqHCIJ8Mh8exSfoHyA%2Bl9xcyUeZWwakpav6z3OpGO4FsXxS%2BI9uYhHEb33jBJ3o3tVK2brVNyn6MKZrEUTorhwI6zfrrlM%2BgmnrCB%2FsVX2RkF42QML2T7s4GOqUBfKnmw1DbeCafxu4BW6fuHqvC58cg%2FQXBlCKvUJ%2FQe0ob9FXr1iqYayE5faKaOS7x%2FCDardlWVWYaVJnCCull1yGOBTkxgcAhmn%2ByFh1Eb4opZRg2iM33KzqAwKwDxcJDUKlc665and5zNAQOIXQrcFXWo7HbZa5OWbCqwvnBVOlNPLCssU79uaGnWb4nV45ABkUu6dWwXOJbPYYc20w6TS%2FTlgVk&X-Amz-Signature=a495bae70b2e120572879226f72eef8898d6d4a7f616afe542d6bef3987b2cf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  **Command line instruction**
  
  > **Note:** GLBinTool.exe -s GL3523-OTY3H_HP_Kronos_L2Hub_FW8910sig.bin -m -o GL3523-OTY3H_HP_Kronos_L2Hub_FW8910sig.rom
</details>

[UNSUPPORTED_BLOCK: child_page]

- Hub Configuration Spec：[Link](/82cc386663974de58c65b57ea7ebffc0#b3fdf414a3524d95b24c7a94dd6c9f9a)

- [Project String](/ae09eebd00c94e1fa0b74e0723e513ae)：0x280 ~ 0x28F

<details><summary>RSA2048 Code Sign Method</summary>



- Signed bin file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/68805c6b-3220-4eda-bcaf-dc23bc12e1c5/Hub_Code_Sign_bin_Format-GL3523-50.drawio_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWA57DER%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDWySEKN2QYczPP3a8dj3Gt5fcE5FkWPZVpY0CWNZf0PAiBzgZTaCyrXzGQybHgO1MlH04NmTOVqCkTvCEPQ%2FjXNRir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMFQDtUsgp2oaejdxNKtwDE426VkXT7MtdewXSuaAiH1%2BbXN9csEfGNZZsjLj9h8Sae2gkvyd59w%2FwiYRWYG8DpXeCCYvUSR5QVbsIvDs%2BKEekj2Z7%2B4rUwcbTOdkQaVUMtyMJtwn028oFWSbWh5LqqWDDokF9WjuHXJF4LjyVIe1E%2FTsHS%2FdsuEQ16lZG631Ptj7YvA4JusJ7orSbk3w4FnwZ48M9qwn8gVYZeCDfpNtw4uMShegIY%2FKDGyCTeZNHOfAWzA4vmsT%2FcmJkdO7UW9FLgrkBw5XL0u4GkL%2B6Ip%2FjNh6tnE%2FSa3dr4CwwE4lZ%2FocOu4Q6Ay%2BwS%2BVSxmNFWrkW0uGzBkpd7Q4%2Fi5cMTqhivQb%2F%2FAarvv5B28GRF%2BM0mdbPREhIJKr3KoFmj5L1g9ss4eG%2Bo%2FU%2Fqtf5FvAoBAIKWst5urCAB%2FXjiLXJ6cB60BmDCUGjJLCI6ZBSSsM6j34tLI8RY%2BzIKKGOahKfp8uSHp78aP5W%2BEVmA%2FdmDKYM7V%2B0eHyDyW%2Fne0dcsXCKzON%2BXIJTDEFvKgC%2FHTXj8NzaCSvafaaz9R5Uah1iT7TOV8s1a5%2FJBx4dRMPFxx0zi0kcflxDjR44xzHDerU7xZukQkJASsA7YAzW7DrpF%2BOnNHzQJTziElp2vf0wy5LuzgY6pgGvhCJZb8%2BwS5qug8jl1k%2Bz5hiynpHG6HqRX9%2FeiFtMEkT169q7%2BiMgilZCeRpgtpHRlNwe7EKyUvZOSz%2Ff2l62O%2BN0vh0yyO40uHnxjgeYrgR8UOrL%2FEacag4w67sCXxNNZ6ZDSQfAoHiRUb6sAie94zo%2BTV1E4DYm%2B%2B8wHBHLL%2FM48X63J2jgTVMRxasuU%2BLyT7dc05wQLT3rozV9OayBFsnXriwZ&X-Amz-Signature=eda4bf8258565499cf265f2ac0ff43d4d30026562e980ba5d15c08af6c875db7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Sign bin file format"
  		    subgraph HubBin
  				    CodeSize["code size (0x1) : 0x00FB"]:::bd
  				    CheckSum["check Sum (0x2) : At the end"]:::bd
  		    end
  
  		    PublicKeyBlock["Public Key"]:::pk
  		    SignatureBlock["Signature"]:::sig
  		
  		    Addr_7C00["0x7C00"]:::ad
  		    Addr_7E12["0x7E12"]:::ad
  		    Addr_7F12["0x7F12"]:::ad
  		    
  		    HubBin --> Addr_7C00 --> PublicKeyBlock --> Addr_7E12 --> SignatureBlock --> Addr_7F12
      end
  
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      class HubBin hub;
   
  
  ```

- Rom file format(Flash 裡面存放的方式)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/47ebaee0-71a5-408a-a365-7b5304e7f6dd/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZK5YYH3R%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhJ8UQQ%2FDiypHRdDs%2BnJRi0FxUYb%2BI5I4EFlp%2F8%2FupFgIgOLlF7dxwRHeEOH25lV9Eax89iLfPO1nlM1%2FSQUDuQ%2B8q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDGU9cb5V7F%2FDvMbeXCrcA6K36GazBAsHziXFNn7SDr%2BhJXKQYtZmvVf8fdG0NL5sqieup2OK6evYIMzx481qm12zRKwGmvNHT%2BDmfzmmooOO%2BXRCcu%2FyKD67NmzpkbxxhrpMpAGT9xX4ties7mg0SyIABDYN1gdwK5py7kud%2BSH5WN9h22DsAW5mwulvEQ1ycW7bRH5GLkk85qOHfpqhEZWdR0o9FrNdciIxSUHYAzSceEo%2BYmP9cIia4aU2nOdHB1n6wivtnzoLIy3BNtdndj%2FL0UFiHs%2FQKMolTacCjC%2FZRdZ7rHAQPq1H10sUQdHhUmmoK1w0BcQewuru1PFQoP9XLfAfU0hWtdZM5x3toOpVmRt12OG6UHt%2Ftml4i%2B5M5TXO4Xxuz8601WjTPjXlpXi48Kt%2BUc%2B0W%2F1C68JCG2XpbI%2B0Uj3JR3WcCusQHtCjFJ6LusGQ8YzwZESAesJfClMk73VtUQTvZqhMiSN6u0i52Mdh%2B%2FLzDnSF65lDfkIFLSDSHOes2%2FM9zqzArvZDRnODObmrHxsAqZ7RkgXbdPAcpko9xKEMjNhZqzuvHYnOAtDRBISJYOZQl%2B%2B48UO3%2FnXY8jyHeMwwTkl2m6rHg1HiNvfbAI3YCf5YtpX7KH7YGiXmR3gok0Dyqb5lMM6O7s4GOqUBr1tTPRu1StxQHR4eWzjg9xaYoEFQoH452vsik2MuoYFQzThjp4XhpR3Sqs%2FlQ0KrLZHoVAtG2liByxTfJcSw7R8zzbmSGPL56g%2BZSZmT1NpxetiMfxB1720U7%2FXpMyBNG138FcAUhkGkyFMFL4bB4vOIkbIx%2FzLsYVN1%2FcFFK7N4x5Fl%2FCez4RF6UckCIkJ3xvx56m4fQ9mhzsHFjRrDR0ymUAVB&X-Amz-Signature=3bcd98d1e4a536e038c313361bff4ef2116b2da4550fc701a6f3b027e4fc0856&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "ROM File Layout"
  		    subgraph HubBin
  				    CodeSize["code size (0x1) : 0x00FB"]:::bd
  				    CheckSum["check Sum (0x2) : At the end"]:::bd
  		    end
  		
  		    PublicKeyBlock["Public Key"]:::pk
  		    Null["Null Data"]:::null
  		
  		    subgraph HubBin2
  				    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  				    CheckSum2["check Sum (0x2) : At the end"]:::bd
  		    end
  		
  		    PublicKeyBlock2["Public Key"]:::pk
  		    Null2["Null Data"]:::null
  		
  		    %% Address Nodes
  		    Addr_7C00["0x7C00"]:::ad
  		    Addr_7E12["0x7E12"]:::ad
  		    Addr_8000["0x8000"]:::ad
  		    Addr_FC00["0xFC00"]:::ad
  		    Addr_FE12["0xFE12"]:::ad
  		    Addr_FFFF["0xFFFF"]:::ad
  		
  		    %% Connections
  		    HubBin --> Addr_7C00 --> PublicKeyBlock --> Addr_7E12 --> Null --> Addr_8000 --> HubBin2
  		    HubBin2 --> Addr_FC00 --> PublicKeyBlock2 --> Addr_FE12 --> Null2 --> Addr_FFFF
      end
  
      %% Style Definitions
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
      classDef null fill:#007bff,stroke:#0056b3,stroke-width:2px,color:white;
   
  
      %% Apply Styles
      class HubBin,HubBin2 hub;
  
  ```
</details>

<details><summary>HID Code Sign Method</summary>



- HID Signed bin file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/309aa9be-486f-45d0-b786-d03700ae2c36/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN3KPPDA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BCnxTARsg1i9ecSOXHBW0haToecsg20wVjHKD9VvxIAIhAJ5NEB97CD1Lt3IJtvnni22EBMFNOZ%2FiVEztpYB2ibl%2BKv8DCFwQABoMNjM3NDIzMTgzODA1IgzVvtiErUgb3x%2Bya%2BUq3ANc5EpBxmG3PnlaoRe4WEbPI7Wzukm3MIkl5uLn6fhOyVHYJlMhhPp7933Lpzzau5afWx4eWSBAvXwZ8PkjYSrFpdpZrwO%2BNuo9ZLCIr8nBgmEU8xLnzquZWsXAvpeJ4%2FvgVs8yLIwTAgPk%2FOO9TNFAizBL1mF0YSFX5ZcDIoPoPGfiF03V4n0MCtgvOMRZbwiYcXKAnMzdfEtL%2BkXCeWnlhRrqicjBtl725zo4Qgv6afaV0w7nQZeGOocbDRdoDu9jNRPzqe6k5qmCQDLlA%2B24NZXWev5ntnMkfyBs5pKbLSQWF1DPxVK3QCoGomjaraPkA3asE4P7rNMS8Mz3%2Bh4Cr9Tmkpmy5rBheij7GDzbsh%2Br4FYpj3qSeWhQn3InlrZImGryN0cV%2BCRiZjDDq2SwfpJ4iz3C70h7uYZEfUjjt1Lgig2wScHLKH5mbI6yYjThKbC1RcYhxgrnud5%2BxST0eJPGWc3gD28A9RRTY8gAsTIVJaFS7gSA4%2BV5ALvEOZm8WxyhkC03t9oC74eyQt46zYplwnxxYHl6IEI47IL6vY5Is6IQKifD1NFMPdi%2FBnCIdHad%2BTecGw%2FQ3p9h1T1qjSfuna5rrrgR2WfSMpl4c47qK3EuW%2Fx4ptsCqjCO9O3OBjqkARIRoA0Q%2BXY0qWLkRDBWTTvLrhb61kFuG2SrIEAuXTsXqArDC%2F21btJMx5PnniQkgGfg3vcKBQZO5O5EoCgTA2QjBk1EIFb5d8W2oNXU1A8d5WpsGmW74SfYvzDz0NqtIZsNSxDqKGNrdL%2B9xrdkVEDMiTnReJ0y6FFmrj6imvLMLL5FtMqrlVkPG%2FBiNYRzRrk%2FS2jm018PmEdZgWGqs%2Bw9Y0xK&X-Amz-Signature=6d5bb293afe5ae0d1441c48c8cdba522e82818f917d7c461d60f947d3f3d496e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HID Rom file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/22eeae8c-0d73-481a-a621-1508d7b0d2d3/%E4%B8%8B%E8%BC%89_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PJ4SZAI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAgBvQ2PBILgjr0T3jv8thXGiGqCNgPec9b4f7Q7sGSTAiB01jexP0ZxcxFptpyyYuZDz%2BPJnSJ09mOTx9T5JMJCBSr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMei644GsEOGI8OfgtKtwDP3TKlEyF5TFitAk%2FKPLGFmnSfFQhb5LY4rDV2rm4UDQ5c2n6ZdUPRzsBdnv6Vuk1TgUaTYNYUzoDCXSJrZRXB5bKLaQNm8dj4yWFBL8KQ8Ev%2FD616ZFfaKgwACLCRPfRTJyyy87oKaXcKtzgm0bY2li%2FS90S7jpSeMJYrGfzlovM4wypYLzxLnORQiC5BdllCLSd%2FjKATmumlSyfB0n9DeuT5dz%2FFrYEjpr70vhFNGHFe2l0Fo0apToM76jMn0J00jaAWM34B7SFALAjjNrKEsIU43LSu5EDOO%2BWandiMl6cmUY1wS43Qn%2FGCd%2FMQnJURbaROVbPEC7LasMM30iTIKFfY%2B32WXPd2SzvOcliY96MtoWK5g3ufWQnZLJ0%2BVZeXKNiBRl%2BRW9Lr5GxSjE1G1l6R2P2HxLWANjteJJwsHRXyKK8YWCa%2FGJQrE7njmV01Ko0FDTQEwOnpivIIiC9lW3ovOUVlko6NY8lW37oXz0gTE0fc3UtsrLw1AE601iP2k0NUFEFNJIk4O5NiDx0NCYCYBNjDDZ76LvB2e6sNg2swHzVUqHhucc1%2FLxsdbkQknkCl3lNHHtDvGpzkHNk%2BrtwkltiAvYZ7Q0%2BCt01Vhy%2FE51HVonv8sEUNW8w2pbuzgY6pgG6GEwTpjgazbee2H6IklylrpVlxb096zqg4xSlDVNdlIap9izx65eg5Hh2LMOTk51MftRAzUSnd1S1wrEpuGXpQEsVB1gfqeKmlOr0tzdWkNEEZlxUwILey5dSZLIRv98kyEqC8NL4iXQ2Ss1Ln8KYi9XplqDvGWKxfEs1uAcqIunHqUpb8w7L5AbTMIFCGVIwOrvQ%2Bv04g%2BlVoxkzghJOaUekatK8&X-Amz-Signature=5ca0664083cf4eec0a8442f02442637300ea813c7a4fc2615bc0e94b0afec7d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HID Code Sign Update Rule：[Link](/33e33bcfc85043149d00b9174d82bb75)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/ebac058e-64c1-4db5-9fa0-a73092e20f43/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643TMCTSQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDzFJMM8%2FoAfx3i6gY%2FyJR8owlm9l2dRcTfasCGnfw9LAiEAivN98bOxBnqJTVUeFXmoNm%2FbY9DGHkz9GJL3JMSbZ44q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDMs6M%2BaBK%2BVLqTlpwCrcAwuxtavF50LeDS9uxb8BV0NeJ%2Bf6ln%2BRUMWAJGrjzFKKDYPor8GF5hr2i4cBo8NlwiTWAQCpIO7C27rx%2Bt0qw1fchOYbL2U3Xt0%2BvR%2FBiHlxFTUpcaPoajgfH9jPcA4AjLy8xE7LyX8LIcbPv61xl3t2Mt%2FKUw%2Flh7Hh83XeCwPrBWoZmhZ4lTKNag%2BLKBcTJFGl8nv9%2B7mi%2BsOUohCPKNbaWy%2ByuwDn2mJ%2FYRu5zodpoQtXXpEnQMNKGixePgPBiE92%2B1RiN4tMTYl0maQSrR%2B4Lhf5qjHAgFvv2PYtWzHRMKnP1n2p0azTuWcjjmE8kgFFMS96izm5%2B9BG97GNhFtIe6z8OqukMAGvahFyJrNRO6W2DacVcfMA8SMgz3e1nP%2F9gmefJf850ak4yqtJyv97IKtgufA9Gjp0OPVUztPP0zmbCgS6X2EMJqiP4UvY8ELcj4tgNgpuP4E3D4QrpZw%2FkPGxFuF%2BPCNCp86ECpSaI1pVdpsa9vxSs4dhyfWiDyxohaXlSzsa6Uk9wux%2BZP3gB%2Fe6YVX28t%2FGCuAmmb6ZrHAD3gq9RMNvbByi2Izmjy%2Bp8OJSGu6XVREbIOoPJOCBDNrHAt7gIqQBWHVZNe1dpzQig9W4bhibg6RbMOLu7s4GOqUBJf9e%2Fy9mHkmIsQGwVu1AnsaqMZiTIViCxlzpflHKXHYHFwQ6qaL3%2Fu%2BleYdkAdNsajrSxkYwCfZMUR38yOlr6%2BxHhnT9DA6Ldk8%2BTU3WYILopyEahdc75KhMPXZPt6c%2B3yJNKrCOSmMeyJMXMf3W60rcda6gNafRgC5vA2QGaFUyGNrXGuMrP898s5ttuVvu62ZM2T7p9XviFPTingzPBzgBR0Fg&X-Amz-Signature=e151c2667ed2f355af6b358e5b072e217c4168c6143a77d55c059d262a19cf85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
</details>

- Recovery : [Link](/68f8b6acd31a4ce089ba421ad0b0d5fc#d5abf68fbd734187b351395033159077)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/b1b2d2e9-43ec-4e83-a0d7-4030028b9d07/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOA4EQJ5%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICrit3dQjxUCvn%2FI%2B3uY%2BhrCWGDMzLAkvEM2BK3OvuMoAiEAp4c%2F21fRCDo9JvF%2Bt%2FokL0VCY4Bo0H9dq7MFjeLuwCcq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDKT3kj11rx2z43UWLyrcA%2FflsuiteiT6COgSFPQSxD5CFOW0mtiKnrlbiqyhd09g5xrpfVuG5AlSVVOWbTq%2FRBChtSH8NMxlo3pAmPdKAVCKTAEIj1anrqpUsVypLGv4mHiUtpiotD2549alfB58uUQ%2F6vd3x394zAkb%2FGa6cdSKBigyLAMWs572gY0nHFl93NW9odMnaw1uPcnmkPTJtxTUp6RoSaJvkRmfmHImESGKnztoQq%2BpN85L%2B7mNCj3pXT0sBXLUq%2B150tSav9onR7t8we3TSzpS%2FvbXD0RN6HCDnA4Wr2VD4hzyG8XMhnFhZbQY8RJjnWcbfF7nzUvtQsuM4V315fu6DYA%2F5q2bJAtS8I9OMcBR8SGjHJUjW9FlLERJoATRTRhMPn4jPZPrAz%2FTgI7XMHCzeK5m%2BcDqVZjNGEYGpc28ibPHRhYrbFD8gVdv4PXErNuISRRn7PcwsbbCLTMkkNgux3sQfv0AbaAoQJ3pj6O6X8xtQ66jj8NIealKPkedsngD6QqMkiUyoFJb1jMyleCZJFvFbZdBLmpgWcbhipLMCULt%2BdO18ROa4DKC2LHOtma8vMmZyStjPX7keeTsb2gX2hR51FaGA6F3c4cS06XXQlZmtQK0gxwkffdJyyWlZOslFsT2MNCQ7s4GOqUBCcxCNlHnQkkoswm4hVAJRtxTZ1sFLcNwgVyU1AVSk0TRF6loRthUiOtshX%2FJdzIN1PdjBsiIQznynVQB%2FpQYQuNmE2wncxVCVtEG7zY1kWFrOs2nTqtWm2p6lL9QYAW2uoCmC9cSaUbAFvdI0p16%2BANSxIy1MBKWGh5BXjgY2vmUtoVlcyvPytUJTKEL0Go4HRb%2FTPQbVsC9%2FA9G111PER1Q9Rj8&X-Amz-Signature=e7f4e14013d803a796b16700f360aa4de6e2f45a3711382863e4b7eaa20577ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: child_page]

- ECDSA Code Sign Method

  - Sign bin file format
  
    ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/776cba3e-1d83-47bc-839d-3513a11c99ea/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEHJI6NX%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8nTsjMgJUOa1HcmKmKB3BtTPIQxiiryFsx5NT3XVWGAiB3q%2B8gT8Wy2rE3eWH7kGTrfKsT9e5DHxcNZ0R614MQdSr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIM%2BosyLg5xpi3bB6kyKtwDXyfWULbpESdCCJFaDWreKaiPXwzJLukGyUtYX03ln08CQ9b9mUotYzLTBPaPL1JuEcLTC1d57SNV1L4Ied968FYrTSJnFtgO%2FFKWuCIo5fARm2VWYHXrMiXnO4upDPhwIS7iKVrBBS7a%2FMk8uzJGQoMUbOZol9sdB9kyxONzBiQdnQjE5rbd2juE88%2F6lUGCB1sVTzSo9g4SHdCWg%2BLrLRzxKNwhdalkv2oOBZFadgK13zGUYz5llxYxAvfoHuFSOrZ7pb3ncB1KUa0pVsArPZfnltwjdrdrQ49f96sOAEZj6FWN2rsTDbsb%2BVadO60sXxvj3tY2dXUieSfgwaFAMbEQmSHAfFzmm2meN6hchEnjRcOLUsLTIEkO%2FnQPrCTbmCsnu4GRANLdzZIO1ZXKY79scloyrUmRWH%2BBtLy%2FxbsFNAM7pnPwTHImd63i8xC2X29AsjUOHe3QndnSm1noKWfdLsfVTIoq%2Bt3VSQ1aGiPptkWEaFxI%2BY8%2BKv7QNAMRMlliPfjGJeHKILzTUDD3%2B2vaNlsvElwSDJRZ5IQSy6GSoD1SYzRdWZCku%2F161pdS9JbCBqoP8O8LImE7CCcbg78VXBVRRX%2ByrcJI2bAkJl2CcY%2B7y3UCfC2DFy4wjZjuzgY6pgEtTSae72%2FxlR3yiFGAVg2xieTgwLtNqr4fcURmR8yeEB7CcItgltVzJTCyEDO9fE0jWatLALqu5OvQA%2FPb5zIsWtuB%2F3g8MIdy%2BXNUnNjIjmoK1JDdyUp5RaqRBgmt1t10CcgdPuLr4qVIQ9qvW7ldtXM9I1PWuUuRjX6QfZJVsRVa22PpBLefk1w6jO1bAbiqRPc%2BmOtJx0bu8c%2FHqHENIFRTVdRo&X-Amz-Signature=e0003ca120d3b2f74650a6ab3e4ccb01b1db5bbd90c7db5046d1de857cf99035&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
    
    ```mermaid
    graph TD
        subgraph "Sign bin file format"
    		    subgraph HubBin
    				    PublicKey["Public Key (0x40) : 0xFFB0"]:::pk
    				    CheckSum["check Sum (0x2) : At the end"]:::bd
    				    CodeSize["code size (0x1) : 0x00FB"]:::bd
    		    end
    
    		    HashBlock["Hash"]:::hash
    		    PublicKeyBlock["Public Key"]:::pk
    		    SignatureBlock["Signature"]:::sig
    		
    		    Addr_10000["0x10000"]:::ad
    		    Addr_10020["0x10020"]:::ad
    		    Addr_10060["0x10060"]:::ad
    		    Addr_100A0["0x100A0"]:::ad
    		
    		    %% --- 流程連線 ---
    		    HubBin --> Addr_10000 --> HashBlock --> Addr_10020 --> PublicKeyBlock --> Addr_10060 --> SignatureBlock --> Addr_100A0
        end
    
        %% --- 樣式定義 ---
        classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
        classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
        classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
        classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
        classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
        classDef ad fill:#fff,stroke:#fff,color:#000;
        
        class HubBin hub;
        class Addr_FFB0,Addr_FFEF,Addr_10000,Addr_10020,Addr_10060,Addr_100A0 address;
    ```
  
  - Rom file format(Flash 裡面存放的方式)
  
    ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/ea61e1b7-fd08-4ce3-9360-e6b462dfe85a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O25A5PU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGVlCKK5cGR%2B1f6WyTvrgjkOZNfjFQWkFbWIiG1uQNmAAiEA7cQKBVwwVCV%2F5okpcizec7rguvryisnbo4ypuudrHpYq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDFzXxEZILuPt9DWzXSrcA9kNjN8n0pidrM3cneU%2FxSMbYEjyuB%2BuM5oizJrtsmgxmPztF3dzhxd1%2BRD6bZdPrjHbyEcKahNLAZKR8l9zYTFNbOEe8%2BDqeLg6IBaRfYnsNlXlveDhtoh781OVmOkAYkd22IqHlDmwoQ6c1eey25ig84KK9PpQ%2BJ82TMZeN%2FfFvKQbJEkE%2B%2FsmFozSukRDZhCw9x25%2BXLQBsuvhvwYsIVGKsq6nLshykQ6Sk2q%2FyptIS3rfiwLoghBeE2IizSvaiRjxRnhGY4NDe6YVN3rSt2renj9ZfxBldYjbcxAZ88p8UiKtXvLhuD863Wqa5tjw1QF3QDur%2FqpjvjXee%2FNDmvs7UkrQeQzSPb%2Bi%2BoSxaFp%2FO%2Fqs1bf7GKqhMjLfeKK6yvI26YodC56eZ98RgZpXeNyvhAGfnsH7qlkL76wrA4CggGoUspO1lWVpXdiwEBWiWmbEXss4WOdAmDhWkYe4xjUVknQHk3BBySt9ZdGVDhVKc81JoRv9NcWOXFCUcCl7ANCsjrtP9XMZWq0Hzl7XxEvwMRG%2F6h4hgFGqvEmp5k%2FE99kBb%2BWQOLkvJnLR1q1mmD%2FHhOTuM8dVWYJuZj5EJo1SbVOKP47m1ZBYcv0BsyXILWrcLiEMnEJMkuyMIKW7s4GOqUBfbYrQZbMN4FJ32WgBHtiUcfhtgGX862OcQnAZtaKO05IqpgN%2Fw8Ql86wvPJeMsmzSk9HUWo%2Fk19Sn1%2F3brbv%2B3LTSY1ScSDRuLMijSXOnqgP4%2BlJQZyy6e4mZT7eZZwREXQ6PJLBHr1caumEIHk5Y5FHBYSVXAFNBP7yb5DbirU4SM4xpozdImDaAuFnVkSfgU57g5MPUueAmGwbiNWmYym2VrNx&X-Amz-Signature=8cedcd4d101941399384db6874fe7a0038f09598fc585fcf8fd234d7b8d40835&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
    
    ```mermaid
    graph TD
        subgraph "ROM File Layout"
    		    subgraph HubBin
    				    PublicKey["Public Key (0x40) : 0xFFB0"]:::pk
    				    CheckSum["check Sum (0x2) : At the end"]:::bd
    				    CodeSize["code size (0x1) : 0x00FB"]:::bd
    		    end
    		    subgraph HubBin2
    				    PublicKey2["Public Key (0x40) : 0xFFB0"]:::pk
    				    CheckSum2["check Sum (0x2) : At the end"]:::bd
    				    CodeSize2["code size (0x1) : 0x00FB"]:::bd
    		    end
    
    		    %% === Address Nodes ===
    		    Addr_10000["0x10000"]:::ad
    		    Addr_20000["0x20000"]:::ad
    		
    		    %% === Connections ===
    		    HubBin --> Addr_10000 --> HubBin2 --> Addr_20000
        end
    
        %% === Style Definitions ===
        classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
        classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
        classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
        classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
        classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
        classDef ad fill:#fff,stroke:#fff,color:#000;
        
        %% === Apply Styles ===
        class HubBin,HubBin2 hub;
        
    ```

[UNSUPPORTED_BLOCK: child_page]

- FW size：Maximum size (44k)

- Hub Configuration Spec：[Link](/82cc386663974de58c65b57ea7ebffc0#13829c6c03074cbe97a9f5cccedac3f9)

- [Project String](/ae09eebd00c94e1fa0b74e0723e513ae)

  - 0x330 ~ 0x33F

- Rom Code Size ( default )

  - Hub : 0xB000
  
  - PD : 0xD000
  
  - HB : 0x8000

<details><summary>RSA2048 Code Sign Method</summary>



- Sign bin file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/c9b4a12a-42e6-45c0-9e44-bfd327b0a1ee/Hub_Code_Sign_bin_Format_%2811%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PETWLMS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFL8vSkzZ%2FCraUIj1aLA6SduD7kFStPJ66A4R%2FnFZeGiAiAa%2Fm83UpzB1g%2FXW%2Bk21p6sM0rBeQfsZA4zWQAMIwJfUCr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMKiG6XcGjP2sGaVrxKtwDyvsS%2BDGDo6SKrsKQ6Lh7KWKTG74%2F1zyyZFfk3Lrxx%2Bs9P%2BUE7Msl8KQsn6jyOiIytY9fKIGvFRqJ8Gt6KvKxbHiBQ4O8jEYZUjWjWWNw3Ut%2BZJmXZjXBt%2Bwy9h6YtqRPVfnAcbkAmrB1442%2FJc6uXqnUdA2pgFTMQ5if30M4yT5DuZpMRBLtS%2F8ZUH2PzY0UW%2B%2FaSmrvT6hiuk5bIlCNW0WrYfYO%2FeAbxUVAxv%2FFuRetnL6fGGZc%2FLOXb6V8Zq%2B813Mc7xeMfB4dqSB%2F6ZyuqbDQHfy7wT3Hes%2FSFwioFxtoh3afwJr4FqEzHZswVFhfB0ZswwFJMfJS9xxzJLxsuJLOMUZzYCU7%2BCxiPJ%2FRV6%2Frt5AfpZUt0Oq%2B%2B0afQ1moe%2BiLXFIPg%2FVScHLctnYAF%2B1dhnjO6t%2B6iqigtHgA1sy7a4Bo6WQ%2F%2F%2FhcoTYgUT9BgBm5Y0FOu0MPdy4Hp54loMS2YBgZtEDvKO4QpEe2Ri6q6CHKOX7u%2FEeL7xhfM0xW6DOveRfDe0sspZWiarU7p67aEEfOzTu40eQGkgdYeNb9YMD5gafJtS6nTpgdVj1ZhKa1v6gOSjxPTBzM2DO1M5IR6kU6ehIk7Q2H97WN%2F6ClbjP32KFGNeGf15Uw4JPuzgY6pgHfP8cOJ12BOCaA1bgsADEhAvmBz2CqA%2F9XUMxVfH2wC7uuVTADwJu20i6ilkpocZb0K0mTqCJeuMuCxHh9wATTV1PPcQH%2B1PnlFYEz9bLz%2FD1Z4GcDI5qmHvoqHiB9CWsIHbxNasFPKGsOjLNJ76QwBewUdFBOgjfWJhZFIAisj%2FHI4Yot%2FPjTtXT8%2F4E1GVsY201Q05TdrCX7bzGRo%2BpW2ep0C8ul&X-Amz-Signature=db5a3790e94774a03b100f4796af8bc5518c05badcfb36bb0f61e61ea8176da5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Sign Bin Format (Dynamic Addresses)"
  	
  	    %% --- 節點定義 ---
  	    subgraph HubBin
  			    CodeSize["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum["check Sum (0x2) : At the end"]:::bd
  	    end
  	    PublicKeyBlock["Public Key"]:::pk
  	    SignatureBlock["Signature"]:::sig
  	
  	    %% 位址節點 (使用動態公式)
  	    Addr1["(code size * 1 K)"]:::ad
  	    Addr2["(code size * 1 K) + 0x212"]:::ad
  	    Addr3["(code size * 1 K) + 0x312"]:::ad
  	
  	    %% --- 流程連線 ---
  	    HubBin --> Addr1 --> PublicKeyBlock --> Addr2 --> SignatureBlock --> Addr3
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      class HubBin hub;
  ```

- SIgned Hub & HB bin file format ( 暫定 )

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/d2b2778d-c08d-41ea-8558-f4d7ec4d39f7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGFFWSTQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEX4%2FpI2d90skEzqc3lTE340UFlMeHlQr1EoYsW29X0DAiB4FUHQSXJgCrQc%2FG%2FwZAjPFChawyFNiVzMX8HI6yS6jir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMJJv58xahvnMzqb92KtwDT%2BC8OekEfDtlRNXYnrOIxP7ArGpKU%2BJAvMs%2F1T0YwUloiO0B%2BLubAnqoz1s6ljqc8b0xBnDhJ4nwyAFI%2BZ5bwsBWrJYhJPvT4oLMpjXvgY8JOSoQn%2BzEBGNCSO0lBiwMMVCQjHeNgqTsLapYSN0eU%2F7TsskNfN%2Fo2i2Gk9SO9cOQsi5dVi%2Ft5RqtbtzcyN5KBZXM50a198jeKrC5152YiBR1s6wBalFWXaMrDoGcMrXD%2BXwgf7yLHS%2Fo9o5zzJXqA6YHqJkMaeh43kkBYV58RE8zsgBtFjVDdIjGtv68ue4tI%2BcJSMB0C3feXEJo7vQfy5MNJ48WUcQ3eFtdEA5%2BpJqfL4HFTCOXLc2mWSMGi6ns%2Ffg5EIPU89IPvVh5kHCtb6vz%2BBBktqDnfqaRFxaYFXjXGXfP%2FfBt00Zz%2FV8e5A20MbLC2Zrz1hKrKVuw8KkVn%2FTXw5vz2nEjmugZiaeuWR5blavs86r%2B1Wfux6OQ%2F3It4ibjsx4vnfE%2BHHH6R5xweTgJ77X4jScseWhVAvxftmXUdgkQjvcvZNlJ%2F5hgeKYNbQ9%2BbMGCzKElnHimha6Bdjd07IQX%2F6uXnHVeVcf5uoKh0uJyUh%2BuKj5%2BOb0oQ2LuPfPTsRx2aV4KYOEwwpHuzgY6pgGQvzxVriA3kETwiT%2F63XnN558y4m8hmM1MVkuHFNomRC%2Bf47KfQNpz61qDlvap8ZI0%2Br5mSZqmWaiGCx%2F1LnmrUU6QVJMHz41KN7x%2FjfaQ9Gi4X3PsAbM35jP2FfnxIHVyT3YVbyuGeld7JUtCk5A3T1GO26VqiAUCiKiadE9tYIi3Ni8MPdDGMvaFwROkBF4iZ0vVWd8b2qdJwRq1840IGbY0yVXD&X-Amz-Signature=ae10a0365732dc10f7866c24a91f8c0fb5abd99645eee62b09aada8fee851f12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Rom file format(Flash 裡面存放的方式)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/614280b6-4c9d-4a4e-a718-84cf5c97a0b3/Hub_Code_Sign_bin_Format_%2812%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRWLAJRP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFi1VarRPlMJtV9uC%2BpGtZPeaXF1FxZRogyD%2B0qP0wuYAiEAqXfW6O2MHQA4b5OU7Dy7qxw%2F30mdRajyCx8u1X7ToxYq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDKuU2mJEiLWoD%2FLVhircA1pcnEiqIc5%2FwtWy4Oa2CxFgBPvgvifFPfQ3vOupr9yna8KXETRbJ0ftuGbfCMESuREM9c5wJzXnSIX7HpXJZgFYZEQOtAVQmtHyq4VhaM6BcVBToJ1O1TJ8hZPR50aHRa55v4t2pQo9CwyeCB5%2BWLC%2BBiHcj7VY5r7HjC%2Bi5U3TeDlMB9guByR0zh%2FktUyXsQm%2B%2FiC4YgwISQVml6H4EuuU7w55WznxO%2FOAgJpYl8NQH0mWSZCB9esTMR%2Fbpk3cU2lwGM1JzKDys1VOsp9m7y%2B%2FgwfJVoNB7t0nD7t8TZs3jvFbndUIp3rhh2TeJkk%2Bip%2FQGlVkT3xIobJWFcxnMCvrfv94M7xHJK5GJTd6WjTu9owKmtz1fzCjgw4lWQhl50w8QJkj9%2F0VYdl1J0O9zcPzBbF4lmwdTYPHd%2FKmMhTVCNCt22CK6uALZL%2ByDu1RCO4QPRpXKvog48fbv7hGLejSkIP2cN%2BeIRbRQBKjd6Rx%2BlEiXZ334xcowFpupj0aXJFYqh%2BJKsiPyruBSCcUISu3OjTLHYtCfg3LyhBPMqKgwt%2Bk1mLymxjJ9mCrMqPQ45XDiY4%2BRQRETUBdvWT%2F8X14AQerqCv%2BdCoPnIhdMQfzlA5NGNpb4qL2umc0MKiY7s4GOqUB4SIYOqC%2BH9mB1RgFsAQOXKigt0Ht%2BZ8XSxg8Z9sglvYkWfkcSHe25bbHfskOjAjevuRCojV5szLd%2BsP3%2BodXtCQJghOgTC1uZ61lDRrBbR2OW%2FXS0I0QkA8tlATm%2F9NTBbr6McwlIdX7KUdBoVRxUs3K1PV3pV%2BuoofOpnbk4rEJR6GDo2NBfZzEj%2FPMLjC3hQgGnQtcuzUBfaoNxqZyv3dkbNCK&X-Amz-Signature=b988c3ca442345ffe2a949f0262704e1ec7bc6c9e78b44ff8e783f86cf691f01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Sign Bin Format (Dual Block, Dynamic Addresses)"
  
      %% --- 節點定義 ---
        subgraph HubBin
  			    CodeSize["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum["check Sum (0x2) : At the end"]:::bd
  	    end
        subgraph HubBin2
  			    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum2["check Sum (0x2) : At the end"]:::bd
  	    end
  
  	    PublicKeyBlock["Public Key"]:::pk
  	    SignatureBlock["Signature"]:::sig
  	
  	    %% 位址節點 (使用動態公式)
  	    Addr1["(code size * 1 K)"]:::ad
  	    Addr2["((code size * 1 K) * 2)"]:::ad
  	    Addr3["((code size * 1 K) * 2) + 0x212"]:::ad
  	    Addr4["((code size * 1 K) * 2) + 0x312"]:::ad
  	
  	    %% --- 流程連線 ---
  	    HubBin --> Addr1 --> HubBin2 --> Addr2 --> PublicKeyBlock --> Addr3 --> SignatureBlock --> Addr4
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      class HubBin,HubBin2 hub;
  ```
  
  **Command line instruction**
  
  > **Note:** GLBinTool.exe -s GL3525-OVY1H_Qisda_HP_Z34C_L1Hub_FW1000sig.bin -m -o GL3525-OVY1H_Qisda_HP_Z34C_L1Hub_FW1000sig.rom

- Rom file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/82f6b317-6e7f-4295-a9be-93213f6eeb5b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SFI7C25%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5%2FpI%2BPaH90A7wDJAwrRUokAKaFl0nYGmWGcdM0UXQ0AIgLCxzHO8pSDvaOpisF%2FHd1JKmHlOijTa%2BdE6Vlir3P6Mq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDCAumJkEvi0NBLW1QSrcA14Tn7f%2BOJc8lLAuw3jK1kX270B57y5FO%2FITyGO3%2BJoRCKxTox4OIneLHGwr3EVmXwkWbFNSibL%2FjaoUSfEYO8Oa3%2BaXe5RxCDb%2FkYAWZSK1jb%2ByCDKKuVqeJydZ7UKb1nkiuOZs1ks7bqwK9p9oXuc5jMfwi%2BqjFgbdY4DJD6U1WqkPsMKRx5bZJ3IFhVBHvF1L5K3b8E%2FyquMA4gmKJnJgWWd48AbN6dPCpaoIFZcRnLXoOwxNUQGzmMa7T%2BPNYl2C4jC9QRf5V%2FBAyE61Rl0LSt0kn0bYqri32HtdXSdSxqYv0RPQOSore4ieqpK9jMlmQvmBC53klMR87kQ9xC%2FgOIc9A6NBebpX1HdrtnOj4sEPQHB3nNr3t9LMny7seQkFUNJbk1EPH6nR5m%2BPVUq5iD0GbTMXljSJREkBlIrdLnwNoRApGgNYFk9pVsld6axrR1yOpsP%2BiQMLbEUxWX2ybw%2BETbfqDpT75DPkpqxY3KwtX1gzrQ2gbSH7LDcvqwnh27SZjD0z5qNTMfM3vyaruLQe9jP7Kw6olqvabTltwgsgvsvJKGIfszOUqjjJn8Crc2Fk9qth0eOTkieznqgNNC%2B5Ns41a8p52vZg8iO5hTiFcOpQBsxb9W9oMKSU7s4GOqUBWlCuUElCR0J3tcI5MUZi%2F7aeAoNT12NIkmtzXZfdEt5DxcY8ENqhrNmYVbRHdZbMfmAYBeJ9vHpCgZfY9XB0ifoGU%2Foj5RaIgA1JX5b4SreuFYfqtTjqyCk7NSnEHfQEzHrHD6IFgBi%2Bhn%2FezTwVdi8KJ8egnObP3ATtOlaqP2UIkE3Gr6WfI7N9X3uFMF7au2vT%2FNM8UPavrY3iTqM67X7%2Fe5CE&X-Amz-Signature=f942922a6f5af005f464ff2817596ba3242d4f28a4324b23d952e7b82a4dd6a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
</details>

<details><summary>HID Code Sign Method</summary>



- HID Signed Hub bin file format

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/41be6b64-ec98-42b0-aa52-aacad6ae2124/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGW4QHXZ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDk0p3pgZIE48qK8nWzpVNE4JQNu%2BbohFqHNVSl11u%2FpwIgeMKKSu1%2BwhlW5t1xHj66MU1NKstrY%2BDsurz1Vb%2BaGhkq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDIpDXUpyisqbBzLm2CrcA60wY1G%2BvfR5%2FqQJ8hU7M%2FJ2V8TPeG8DfanVrqfN6ccAF7KXFepB7NKhNlxpDcj0Y4Ltv7S6VKBuJVC7MVWqHEehmyB%2FkxngUrU2w0RtT5S7KVTUvjb%2FIbbnN9npXeblIQteOp7PVf8ifpzxv71H%2FuEnGW6ntAcd1zCKQRbX%2BZ6rjTaz6G5FwhwmIoL9v9Tlgg9Qt3O3Jz1rF8eKpvuozeOAZLkNODO1p56U5mL%2Bpeggmqy3N%2Bbf92pxl3hkoVD9UITSvi2C0G6Z2otc9Xjo2jrtrHT7YNkTrwTyLScCshBZ9J6%2FryCLFZNGpIB%2B%2FcnkSm9UHRvgLf06znibEpsnj8AKD68trPNkbUwVv5FsMArcwMzndxgvtgExlMLbfM0iBzMQqfVMKP2SZA9opL8u6BXZWsP69Bs4l7r%2FQe%2FYm2qyNA9%2FP%2B4KiKzULjjdBHvO%2Fv1t0xXKUTBm83fckUmQo4iWf4Lm7japacoKBlE73K8yBsoLsgMloVAjkLDKpyMI8qutKJk307CQU9L%2FpAawjbhZ%2BbnAPAP0HINAzGXbx%2Fd9m7b5mPwJ4DYAa%2Bdw0bctAEd2QpW7Pdrs14SY0gHQDVblAohlYgtfMEIErb5B6ArCVMn3k7cDb61EF3puMNuU7s4GOqUBnmpKTthPIOpBmhnGyFuwllkBgPy9ECVvPhll5ceIlvgySLcWbHzAIteVOpUINNT9axGuV5oMjU0iptIpTJt7vhDqpSbQEZ7IjRt8IxTDMx8BtsbB6y4l4BgRopSBRSAQ3Paif1CYDbQZY0aU%2BdtbcyfeFU3LGuPMUuTlZzicEIGFvRMy5PvyPmE6QHTJLrpk92dV7dyQA2hS7aQO5Rp54t2KVvxG&X-Amz-Signature=338fc9c4b0bcffc2674e1501817fe06c8ec6d6378292abdbcc4cde1cf5c79a5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HID SIgned Hub & HB bin file format ( 暫定 )

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/d49ab903-8b33-4b90-a0f5-ac5f0237d5d9/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBZ6IXD4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHg8k03os2W1XdKBPEiwJUO59XZXvVVCdDGr%2FIBl%2Fr8XAiEAsweTrs%2BAl1PzuWMtelycgy7%2BzkeiuaUOUIhFCB9KclMq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDFzDbLVXrQrAbW3e0ircA%2B9XcV%2Frnxzz2%2BjQ0RgS3vC5pI3BvABMUpw5cLRRT9S6c%2FYptLQsnc0vFPm1aRhGkMT1pRcM8auMS0RrCbyMU%2FuVIU%2BMCxmNoTzITt%2FCjL1mEFz%2BUtncm%2FI9Yuyih1laggPzPP80lW27aVLoPtDZ6HuYVb7IRAt%2BGy4DF1xy4L7C9gs3AvtU0OQzPt0%2FuEFHnXRdvJlu6CX7va1OERnPGFtj0nsgEmiZNbg6H5Q7oBZUeijPznqFQx%2BK5aAgfQrFMCBZJ2SsWB996%2FuRR5SzXQZP8if0p%2FNAMbXu4apokkdiEJojNAZEVI4LJhv2HDDTxdoA7qsT9gZnOlYU1y6hmtGrWsw0PjtGQP2Il36nVpj79cB4NNiLucE0wYt6W%2F0CeBNl7tSqj8zDlxIM8RN0Ohnew9qhipvlgTz4%2Fd7lQHGM6qM6o6dcctgPEim%2FRyjENvxS9FZsBuTjt7aYLEd8xiFSBwW5%2BUO7ttrEvhPX%2BXDpf6fMRQ%2F%2FMvyNPhN%2FjkYpPzd9UMz7SVcQrepcGA7FWDBGR%2B2caXkxcqmgtdMu7C36JijxO8LkC%2Fi9MIXkpJbz4a7gXT%2FuaBba3LBOpQwwHz465EvxiawWhb0yeSihMNcD3NxTRAvL41V04eeUMLCU7s4GOqUB6oR88q%2BuGZWzoHybEGQX3S0z96v%2BDasBHy3YzVkTAZUHpUKBYmkHj6bH0ZYcT1%2B9J5ChqwbhqIcCwZRoOb2dXx%2B4YxJTdpL8g9bDNI%2FBnPnSEMnEgeFF7p082J9lzA9WFaP4abhZ3UE5kbvZx8BlGJDLdM%2FcekyVBvbmWKQN7%2B7eA8%2BX1juRQU4EZe4utrrJeCBk%2FGIS7FwufeVfKLZzyR3jnehZ&X-Amz-Signature=75ace32697e6eef4fe47b0a02067c23a422d1f6972bf8d78acdd2c7e64776ab4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HID Rom file format ( 暫無 PD )

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/ef187520-ac9e-40a7-9505-ec6f9c00ff2f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJKRE345%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVLGscexdz2GzKaRoGbFDDrHk05LBvP9WHnNnQ9YYMJgIgWAPpGNgGRjwHYrl8Hyj9Q3qjjHTLqUpOM7tG%2FHCt2%2Fkq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDHtldsNtnRaKzQjdAircAxjYOG3Eygl%2BV21NNVRtkObiWRjFqoGDJLdW7nGjLn0rx1UQfgr795qP1iyHLscgv1p6T%2FqDKQUDQpnsUWdlGpnuU8pMoaJrmcLTNDh3mnNtBSWvDHVgR5znGs9%2BYGwYO4rnfznZcbKRITWQK03AjmMTJMwDOVY5U533LIzpxRkyTESwsG0wSBQZMQEdy0MaKoCqE93g0X9HK%2BZDsM1p8PMr04vFzlFXeL7AxmVRIOx7BKuB74pnuLXLT%2B0UCtfjxdZ6%2FGfRdxal2BcsiMCBRUys8MK5pUpo%2BAhWEAnsvLzlV2yOjTQpybYniSMv35QZj0GOmv9Nr8AUsVOijE5Gdl7XLTuBjbrihmcjlJV9dWZIyfHl9AK3rsbRSAs7PeG%2BEW5V8HyqGQBk1Ce9LB9vCxaoZCjVU1zOjmBiejsAueAn%2BP6FKeGK4UXzW85Aroh0tkCa9LD857KCgakBzWS8YWi4j99a72PhPEWyLphrZrerOggq7OyJ8FSEFWL5H2b2%2BdXlpJxe7jWbbxvDfD%2FvWp3pvQo2pNI%2Bq59gKfGgktscedmI8h00hlZGet44%2F7uGKhNwOOPV%2F2uDjthjpytEav9%2BBRfA8OJUgMA1CkLuvIeTCc8Uu9uYPpze94P6MKOY7s4GOqUBvQwqG%2FaPmxYnGnB6%2FxBhZie1fSZ%2FWUQ%2BMyA0rgoEfL4R2q7N2DvVnxClSJTn3Qwd6mm%2BuoxjkQZAm9SW7Mtz5voY8PP3L2scbN5yoomTjqnMlkvJvAhZA1VEF8fNoZlqmwxcXQ%2FwyICBZMo1jgyK1YZjLEfIx12U%2F3hT%2BEl2fbGFrOvUiuzy3QavmxW23m%2FodPPL4f%2BFuTEFirL2MMXwCHWjRIxT&X-Amz-Signature=f0b40acd81a85262c4cd4fb77c600aa48c56c634e153a6e79d7d9bc00374e56a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- HID Code Sign Update Rule：[Link](/33e33bcfc85043149d00b9174d82bb75)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/66d72b17-9d2b-4374-a3bb-e3d175bf797e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6D4EPHU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCghb2cJ358vazXFTRiojS16h2IIbn13p9TSOtL2072xAIhAOLRoJ6Bkbbux%2FVAxvruhn3DNF9Yitj%2Fijp3ZXJvrwBCKv8DCF0QABoMNjM3NDIzMTgzODA1IgzZpF1ZHS1%2Fetr56l0q3APakzgzQ5nahLIDp82DslARNg7iUMsRQNspIpreVZQK34d0pI6QdrTBM35AaM3Xb6uGCHBZOse97fQ6OlaMvUwlj%2FQD9Tek5kBoOwM5j2kYER1R%2B%2Fn%2FezHA%2FRCUbltZYQq5EaKJOUVbD1Zsj6UXdHLtgWEZP%2Fcj5iU7d0h9rnDjqLLtULk39ACYHAMCDsad7Nuq7o1KOq8BgwJr%2F7%2FLqjPkprB1AyQkZFF9qgefGrq7vvZlNQZCsbc8a%2FYejz59qdoKa%2FymVBznqRqmKPwFxK2xHG1EQLcz7kemERRPUla3OVQGzaGQz4aLbJlDBrqSaHJCvL%2Be7ADS46P4HK6bP1jGBL1P2NJlI23czXwhFRsOeE1PWpKkyGGXfsg5ocEHRLcY%2FmAPWcaKtZtpb2%2BqxTzeiSoC%2FbgoEKOSEC8vDxI%2FjnMRXO5ZJrdRqS6DN2%2BuYAUVBM%2BCh1Oiu34FPmT78hfK3h7cIKOXsDYZ4fiXIjTWgjvP8w56bEGN9s8ePQvZVvWgfZ7bRjyy3cx0bX31yeeYfrYW91on6yHoOWydH%2FShSCBSiTSD5zbbY3mbAECYonreUUZ1UetneHY05fyv%2FiBloG3%2BrC21CvFPSu3dOKbMCBEnuwhjj0lnAlNClzCll%2B7OBjqkAUvhQ%2F6tFMaRZCrNNC0CgJW7mTDZQjMn8CPBmGS8fpwHmrGNl0spcV2NeeUSL5yZ%2BTvGyU4xnwny1mZEfqfyIjaRJR3B21NPuZM7U78gV%2Bux3KXSdwUpwml8jiHwLzrT1%2BX5KvOjqvzf83GjJwGKtDSN1g%2FX4v1XA%2BsA79T4knRTsZDHCVaY%2Fb1MCrC501sH%2FDLBF1Z3Sh6Z9VjMewKsqxDwaCeJ&X-Amz-Signature=b2d8cf68560e3a4f7ea15780f25803d512c0f0e29738dbbd0bd728194359f72f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
</details>

- Recovery : [Link](/68f8b6acd31a4ce089ba421ad0b0d5fc#d7a84f6c0f994469b8ffec1bdf2bc804)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/5a64176e-3b3d-42e2-ab29-bd0eada72a50/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBULEPQL%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD7X9b2hE3p1vCxBkhpGhP2%2BZgnDRG%2BI6iidXX%2F5mYn%2FAIhAMJt4vXHhg0ZaiMVzjGFCRYKIlkhooHl94fQdUqKVbCjKv8DCF0QABoMNjM3NDIzMTgzODA1Igwo0aLeDF8e7ceL200q3AMoH9hYIsyusm%2BjEZjqvEC6wleVWF109JNL%2FeRFMEs6%2BNfcoodtFh0yFlMIOd29sce9iXGH%2BLQRpsNJ%2B0KHBw3t6UEiNYm8JVfhSAIX93KGO2%2BJvyLdaVnX9XK58oYkkY8Hwj4TU3vw4zOzBWd7%2BRq82BQOqLhYuRNsfnxV8mZnWaR0RAUcwI4hf9HccyXE2bgf7lRjxl%2FRAYmLmqkMAZ%2F6ruMv0VNee7G0XOKsUXix32%2FAlCLqAbbrPu6BrBShrJH4JK3HeEF3VU86cS2gysH8V83zvm6PCCggkLMi9sZ1XVQMRo5fwEQ%2F1ChoNbKclQA0Rm0w9UuzDJo7sEW25Ts5HGR5%2Btw2aCtptlL0Lxvfqon8WlIeOCcVoVF8rdbONLm%2FOPSmTK0Kp6cRlSy7ai8QZNxjfpLhWZk8O9BGdjEhQBGFzDvKA2ySJfP4S344olpHFgQtjtmLuO0phoPlKjg7Na8R38HiTcY6HttcT8HBlnaq9Sd9qURpG0QwBF7kDrrTRKzbbu4tu%2BOcQPMUz7sy57gyqwo3aH1e%2F6kv92kTipA5MyYXffEZ8XnDCIYfV4FmQdz9Aj2w0YIp0tpiihIFu0ldOs51TDpOHhmAVNl7GtXRgF0mRIhU8B4LQzCtju7OBjqkASbBlulRm4eVLI7G7pRps6udkb51zByiEjKEW0C34OQLqoNskNARUIU2ApJcM7Y7LXSjSM3zhUKzZAyqxfp3G9f899DvGZdZPOd0AweJiFpgQqhX834PmBaGLlcIMYaynBzg15ycemlzjA0XRN7lZ%2F3nwSF2rTcw7dXnb4ifjlrNYgd2KgF7se6LBNyvg1zpDHRM3CHptYX97u602z6EJuJEEfCV&X-Amz-Signature=ac3f5aa6e200619df7fd7302acfaacb1df9bebb6835ad2e98338007fd77eda3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: child_page]

- ECDSA Code Sign Method

  <details><summary>Sign bin file format (Hub)</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/776cba3e-1d83-47bc-839d-3513a11c99ea/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQ3GE7E6%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCpyYf74yYi4TQAAO7JV7sOJGBfo4IBvxF0kdOd7hTh9gIhAJZkRK0Hrh8sEraJkupjhg5A7DUT5JhkThCakyLtQoRWKv8DCF0QABoMNjM3NDIzMTgzODA1IgznvYjCBETulBFySlEq3AMClZGIn3zCOHEzD6DZJ5LLZ4f27D69eEz8aeTEJFp24RtGujbJYfck3NhAY75F%2BXB2tgxc%2B8TynIJYiBhIj2lNTiugRs7Mptu2%2Bjb0McYg1cf4A%2BXtqYR6J2wWE%2FfXUb3btRhVQfxIbhfESg6cdJgIXVgXEwjQHAQbLOgeHGcpIKETk3Tx3uzAxFu7YsghxJWBeZaMAFn8mwlQc%2FMNnDaA5LyLDNij5vZs2vGN4v%2FV%2BCjU9%2BdOs9PGiApKEmoFBWeYX07Bs46vJmZRFlFntaIdvNvHtHo1UtpV0W1iCwHUyFMMPxpAgy5A5o1GOqFv7tHMxJdX3nrLOudWn%2FLUa3cRJZvvGOAHh314y%2Bf0DIs1I9AgzOroI2SCtD7TUdyncHu5wPgPXhwovy3XnEcHNDtHcj6Kt%2BFwtHofo5FMXWeNJKksv5XIT7WLMW5cGeJqhIosRLPjU8uVIiovO9PyMqfEPWC5A%2F%2FmJpkFWEH%2FF%2B5YWNb4loTv%2Fh8jiYovAGuTPn4Fa9U6lXD%2BGglWbXKNcgplvdaQDEy1XBONjXo%2BudblaYqyp4GAapRSmxX5ob0b3LjQ3TO%2FukyztP9sNMKA6J%2BWIWf9VI4CgbKHHS2jccBSNnPqzIGb10ueaOzOrDDalu7OBjqkAY3BFL0kAcc%2FWSsm1JmrJApIFV364%2F8vefZIP4UZTtiLkzH84QvfFId1f%2FnHiGlk7YT4T1uGGTomGNvnvkO6uFrcoynYDcA75FtyrzE3WK5trsA4%2For85XrqSQEKsOz%2FonZZKHeUUO6hpbO3p1XfinTVvsp7yXfoTRiT7B%2FNLkk0CbNN3JWSYbh0t7hvaAHxSJZx%2BBfgMXBXyB00t8vd%2BEaCyp3o&X-Amz-Signature=f4c7adc725ceb560b51bb9bea7ee960ee1354cdc29131e6d849d577cf2f3fcb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Sign Bin Format"
  	
  	    %% --- 節點定義 ---
  	    subgraph HubBin
  			    PublicKey["Public Key (0x40) : 0xFFB0"]:::pk
  			    CheckSum["check Sum (0x2) : At the end"]:::bd
  			    CodeSize["code size (0x1) : 0x00FB"]:::bd
  	    end
  	    
  	    HashBlock["Hash"]:::hash
  	    PublicKeyBlock["Public Key"]:::pk
  	    SignatureBlock["Signature"]:::sig
  	
  	    %% 位址節點 (使用動態公式)
  	    Addr_10000["0x10000"]:::ad
  	    Addr_10020["0x10020"]:::ad
  	    Addr_10060["0x10060"]:::ad
  	    Addr_100A0["0x100A0"]:::ad
  	
  	    %% --- 流程連線 ---
  		    HubBin --> Addr_10000 --> HashBlock --> Addr_10020 --> PublicKeyBlock --> Addr_10060 --> SignatureBlock --> Addr_100A0
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      class HubBin hub;
  ```
  </details>
  
  <details><summary>Rom file format(Hub)(Flash 裡面存放的方式)</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/ea61e1b7-fd08-4ce3-9360-e6b462dfe85a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDGKJD5W%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICRrgoxzo7rAHIDq6deN%2BLubOHlUZTfPFrS6gx%2FdwEGkAiEAk%2F171FJqnUrSUp3nyV1IbiWKujM967Ve9fJB7%2BwO%2F%2BMq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDLf%2BVmNtwg0fxDaOAyrcAyFokZJ0KxM4G0bIeluMx4d4f492bcYz%2FSTqVJnbY2Ov20MHhWlh4L5si%2BeAwQAIoge35U70X5HOasnEJ3mIoavnYPuUwfRNQfyTfOzGifqgyS4X8v1Orxp6NzPc0Gy%2B6IyhTF1%2Ftz4UqBjn52LAr2uFuhDl35kY0cGPv29DAKmkZlklf62SvFg6W3j6RvJJkxk%2F4W6XB5oeXcvDF8lXQBPfzTeU%2Fb4KLEmYYghHYhwZtSHB9YYZCBg2SRymUwD2nSTdpgzNGCLKTzMKu524iAur8iR3bd5OBa1uIyYdayknBgJ3yfUD4EZ7WTE5xXhUc%2FZJUNvrkIE%2FUd0gLNXHDaxWba49908CrbT3uu2j2UBe%2FhZukEdhleQ%2FFXuCghXGyelZaRRLVkT5xmvjuDSXSoL%2FEQr41Lyy9EBBaKxALUv9UIyQVPO65EGI4RrMZYrvcQ%2F%2BZLdsTizBQj%2Fxo9UQDzpy8JvkTqHVpe6uCAdg6mOK%2BKF899dTQbhQyweR%2FVpynK5U4zeSIZjhWj4BitON3erd4fE0Xai%2FYvs5PICWcG2JktZ0TVVbokLY0Bx%2FrPE7fbzZH9ia4W%2FxjfsKQE14o5Gx8oUdRQfuV71SYb9Y9xyPCBhWeeeMhcEvO3dAMISW7s4GOqUBhQs4L%2FxklJ%2F0kGxsSaTFGCsNe2qa%2F3XxVCqek%2FaxVkjeJwESOadTRmhNEMSuzkxYm6jUeZZqk6e0fr8eKtEwgkiaXSovbAhTPRzsD3Vtdu2kxEOK6W8SKFswzvTLVZo3duoNm9xaow6xkBgaaY83wC%2F%2BX%2F%2B%2F%2BdIlAkEt2g6UwEPVtyFlaHRRgJ2ACfSnXcySD7i%2Faij3W7vqXAxJJyAvOgVaZUSO&X-Amz-Signature=1006de29612685b4f750973df1ce19c1e1db2c23bf4aa3530796e05be3a279a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "ROM File Layout"
  		    subgraph HubBin
  				    PublicKey["Public Key (0x40) : 0xFFB0"]:::pk
  				    CheckSum["check Sum (0x2) : At the end"]:::bd
  				    CodeSize["code size (0x1) : 0x00FB"]:::bd
  		    end
  		    subgraph HubBin2
  				    PublicKey2["Public Key (0x40) : 0xFFB0"]:::pk
  				    CheckSum2["check Sum (0x2) : At the end"]:::bd
  				    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  		    end
  
  		    %% === Address Nodes ===
  		    Addr_10000["0x10000"]:::ad
  		    Addr_20000["0x20000"]:::ad
  		
  		    %% === Connections ===
  		    HubBin --> Addr_10000 --> HubBin2 --> Addr_20000
      end
  
      %% === Style Definitions ===
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
      
      %% === Apply Styles ===
      class HubBin,HubBin2 hub;
  ```
  </details>

<details><summary>Rom file format(Hub +MCU2)</summary>



```mermaid
graph TD
    subgraph "ROM File Layout (Hub + MCU2)"
        %% === Address Nodes ===
        Addr_00000["0x00000"]:::ad

        %% === Hub Bins ===
        subgraph HubBin
            PublicKey["Public Key (0x40)"]:::pk
            CodeSize["Code Size (0x1)"]:::bd
            CheckSum["Check Sum (0x2)"]:::bd
        end
        Addr_10000["0x10000"]:::ad
        subgraph HubBin2
            PublicKey2["Public Key (0x40)"]:::pk
            CodeSize2["Code Size (0x1)"]:::bd
            CheckSum2["Check Sum (0x2)"]:::bd
        end
        
        %% === MCU2 Bins ===
        Addr_20000["0x20000"]:::ad
        subgraph MCU2Bin["Host Bridge (MCU2)"]
            PublicKey3["Public Key (0x40)"]:::pk
            CodeSize3["Code Size (0x1)"]:::bd
            CheckSum3["Check Sum (0x2)"]:::bd
        end
        Addr_30000["0x30000"]:::ad
        subgraph MCU2Bin2["Host Bridge (MCU2)"]
            PublicKey4["Public Key (0x40)"]:::pk
            CodeSize4["Code Size (0x1)"]:::bd
            CheckSum4["Check Sum (0x2)"]:::bd
        end
        Addr_40000["0x40000"]:::ad

        %% === Connections ===
        Addr_00000 --> HubBin
        HubBin --> Addr_10000 --> HubBin2
        HubBin2 --> Addr_20000 --> MCU2Bin
        MCU2Bin --> Addr_30000 --> MCU2Bin2
        MCU2Bin2 --> Addr_40000
    end

    %% === Style Definitions ===
    classDef hub fill:#dcfce7,stroke:#4ade80,stroke-width:2px;
    classDef mcu fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
    classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:1px,color:#a16207;
    classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:1px,color:#6b21a8;
    classDef ad fill:#fff,stroke:#fff,color:#64748b;
    
    %% === Apply Styles ===
    class HubBin,HubBin2 hub;
    class MCU2Bin,MCU2Bin2 mcu;
```
</details>

<details><summary>Rom file format(Hub +MCU2 + PD)</summary>



```mermaid
graph TD
    subgraph "ROM File Layout"
        %% === Address Nodes ===
        Addr_00000["0x00000"]:::ad

        %% === Hub Bins ===
        subgraph HubBin
            PublicKey["Public Key (0x40)"]:::pk
            CodeSize["Code Size (0x1)"]:::bd
            CheckSum["Check Sum (0x2)"]:::bd
        end
        Addr_10000["0x10000"]:::ad
        subgraph HubBin2
            PublicKey2["Public Key (0x40)"]:::pk
            CodeSize2["Code Size (0x1)"]:::bd
            CheckSum2["Check Sum (0x2)"]:::bd
        end
        
        %% === MCU2 Bins ===
        Addr_20000["0x20000"]:::ad
        subgraph MCU2Bin["Host Bridge (MCU2)"]
            PublicKey3["Public Key (0x40)"]:::pk
            CodeSize3["Code Size (0x1)"]:::bd
            CheckSum3["Check Sum (0x2)"]:::bd
        end
        Addr_30000["0x30000"]:::ad
        subgraph MCU2Bin2["Host Bridge (MCU2)"]
            PublicKey4["Public Key (0x40)"]:::pk
            CodeSize4["Code Size (0x1)"]:::bd
            CheckSum4["Check Sum (0x2)"]:::bd
        end

        %% === PD Bins (Corrected) ===
        Addr_40000["0x40000"]:::ad
        subgraph PDBin1["PD (0x40000 - 0x5FFFF)"]
            PublicKey5["Public Key (0x40)"]:::pk
            CodeSize5["Code Size (0x1)"]:::bd
            CheckSum5["Check Sum (0x2)"]:::bd
        end
        Addr_60000["0x60000"]:::ad
        subgraph PDBin2["PD (0x60000 - 0x7FFFF)"]
            PublicKey6["Public Key (0x40)"]:::pk
            CodeSize6["Code Size (0x1)"]:::bd
            CheckSum6["Check Sum (0x2)"]:::bd
        end
        Addr_80000["0x80000"]:::ad

        %% === Connections ===
        Addr_00000 --> HubBin
        HubBin --> Addr_10000 --> HubBin2
        HubBin2 --> Addr_20000 --> MCU2Bin
        MCU2Bin --> Addr_30000 --> MCU2Bin2
        MCU2Bin2 --> Addr_40000 --> PDBin1
        PDBin1 --> Addr_60000 --> PDBin2
        PDBin2 --> Addr_80000
    end

    %% === Style Definitions ===
    classDef hub fill:#dcfce7,stroke:#4ade80,stroke-width:2px;
    classDef mcu fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
    classDef pd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
    classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:1px,color:#a16207;
    classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:1px,color:#6b21a8;
    classDef ad fill:#fff,stroke:#fff,color:#64748b;
    
    %% === Apply Styles ===
    class HubBin,HubBin2 hub;
    class MCU2Bin,MCU2Bin2 mcu;
    class PDBin1,PDBin2 pd;
```
</details>

[UNSUPPORTED_BLOCK: child_page]

- FW size：

- Hub Configuration Spec：[Link](/82cc386663974de58c65b57ea7ebffc0#46ff784b2e374ee28e82eb7cf1ada36a)

- [Project String](/ae09eebd00c94e1fa0b74e0723e513ae)：0x2E0 ~ 0x2EF

- ECDSA Code Sign Method

  <details><summary>Signed bin file format (Hub)</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/a2183879-2591-4a8d-bbd2-5280d0b3b407/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665I64AOLC%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4RGaCIQL5WQxkJtvnPJA4hEM4lcsNG1Zfp7Q%2B0yd%2BcwIgOE7v2jIcdSs2n8auPuWcqBjzzsTkAGyPaxtbf7suy48q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDKPY4GP1jE36BRQ6MSrcA7VQbVaAgLEOzKP1PA6ElQkLooZZ9ER5Sz%2BOx09g285S38FusAdvx7vHgVrk68p5PAlp3zEII1EE7enFMS8qDHdiFoLj1ob1T%2BOxmYmtfHbHK2ZyZpD4GsVzPYT69ZOQ9kTawbvxR79yGYmxF0aNlHaaaDh0M8vOfNlH8K6bI%2FhAgfaFl6H4I9%2FAenHgYhdNM846WRiGY835PNot8rmeBrS5EVCrnV%2FqC9WuCtaUKSJvD65%2BLBqn3BH6c9TBEKTFWXTHolDTW0KotSSDW%2BBU7tCdQ8YqnAbh0g9yimj1cb%2Flik0DxR8hAbN6ciHu4l%2BFw8mKlEDfZBX8yoi8gcnzxV1Spz8e7AufVt0kXKMX1GrOM8EP30VxKBTO14Nf2lm4BxNzV8jLkCPXcHrIBBGc%2Bz9a1timEx%2BwutqjJTCHaV2f1fmLbx0oCg20jIXg0dMqyYsJK6%2F0dpzYyI0g9L4YZmmki1j35pXLfSGaW0VNwxtVz5eVtUv1S99f67ZVw2YkWsoC0MU0pqylSGibRjnteIc7%2BLFip89nfiMOKi8%2BtoS5k63MCz8oGY7av4iMFP8lnVFpDVn0dXKoZ6p38%2FVok0AM%2BL%2FcVoNBpsKdboGYAzatJLm%2BKoUG1gPln8PDMKWW7s4GOqUB0H82hT2oGOOR17prElLEH1WFS9oyzK9PpY5aurAG6BGI%2BDrYsAibblT9oIVX8F9YZ%2B7Z4TPPhIbTorEzaVEBQ0dEcEwTvAU5AJoEEG6VJZYb5NtX0cme4owocyHHI%2F04BziasO4XQDFu9KLaSzxnAC%2FXrOj5kc%2FLpq41soYGLrXhgfen%2F2eWsjdScBnFqz%2Bk6Y2SR6AZKvFxQ5BKBseMmRudXGAT&X-Amz-Signature=812926d00689593b18cbdf8e4507b442433b07d64eeefcb4fb098ca0f53d8a96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Sign Bin Format (ECDSA-like, Dynamic Addresses)"
  	
  	    %% --- 節點定義 ---
  	    subgraph HubBin
  			    CodeSize["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	    %% 數據區塊
  	    HashBlock["Hash"]:::hash
  	    PublicKeyBlock["Public Key"]:::pk
  	    SignatureBlock["Signature"]:::sig
  	
  	    %% 位址節點 (使用動態公式)
  	    Addr1["(code size * 1 K)"]:::ad
  	    Addr2["(code size * 1 K) + 0x20"]:::ad
  	    Addr3["(code size * 1 K) + 0x60"]:::ad
  	    Addr4["(code size * 1 K) + 0xA0"]:::ad
  	
  	    %% --- 流程連線 ---
  	    HubBin --> Addr1 --> HashBlock --> Addr2 --> PublicKeyBlock --> Addr3 --> SignatureBlock --> Addr4
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      class HubBin hub;
  ```
  </details>
  
  <details><summary>Sign bin file format (Hub + Host Bridge)</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/4c36580d-0eb4-4242-8163-de2b6af22b72/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I4W5R4T%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHvYXNa9LE46RK2zrkEBSZBFvN7pCuzWE1k%2B7EUVmVRIAiB6T1la%2Fw7qCc4iwt4GW6K8N1qWrtLIooxzJKJfBqmRqSr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMnxTgh0OF3ewdWKsmKtwDzrjUVPB4%2Fr0vcKEermE4VlOmZ34Qzb4dchwbppxH3c%2FLKb0esWO8FuyLSj51LUPsdY5wbXwXsLk30q3HD1KuoDh7Mr%2FoeGQFM6rZa%2BVo21FK5e7kbX%2BXBGZkqGvPjeNi8vviWUPcdC6NGcsb87ZhG7lZ9kB0yblVetUJ5XI4c8YIQ5BJpo0LUXO3joCvk%2BBoXwCnQdToR2PQfGJjT1xDRYLFengmHct6GSp6RMV9k5uCgC67gBpaNGZxGuYeotZ6hEtZlela3qMgK8CXuGPYlFIQToY0zoq54Aadi3yl1MUWuICBUbYCkrb7PTMiokwTzqvyfENi%2FTrHqtIoiiAZ7O36TGL4YJL3POP9xwL4IhM2xIAPCWVd8%2FqPLKWsfqphefHlWnDz%2FaEkjXpVa2WxQNzG6YuqXtD4Qru29fty2zMVm4ja5Lzzx2AJS8PPM1M%2FIIIDxxsixtoJLr88J8h4yZbnMNnz1H4JcPMDBT8P6s7ermhI91GYmuxDR51ImVKOoq3VUC6muiwwmGw4KSUhJllzpxU58ZLHzmI40mUmgIoKIj7M1EAIcCM%2BviOddSbDltdNCZMLBFrPNGNkg5Beqgm2tGitrzKPszvkmgSgTF4PU0I4aFYnXXp3fXIwgZDuzgY6pgGDseWi3MwLnf3WwtwCGHd3WCfu4XPYnAJbj0iZn4UceRjO2dBiwS0knx9tNDihSj%2B%2FYcUoBWYoHrZuBM03ARfsmnVPlGagsSx9Szd7TgbrXiMK5bbx%2BCfABTz564E0Vm9uSPg4WQD0i7yZJd55A56d5feMr2cf%2BQ4JB9R4b0evlbg3HlcyzFFEV5G6Txe4FQP6DRhD49akWzLe%2FBMvnmZfuayM738L&X-Amz-Signature=8403fc5abf4406f2c0280e0e4ce8178f11df4dd4eda18efab4341b2cfc764632&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Sign Bin Format (Hub + Host Bridge)"
  
  	    %% --- 節點定義 ---
  	    subgraph HubBin
  			    CodeSize["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	    %% 數據區塊
  	    subgraph HostBridgeBin
  			    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum2["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	    HashBlock["Hash"]:::hash
  	    PublicKeyBlock["Public Key"]:::pk
  	    SignatureBlock["Signature"]:::sig
  	
  	    %% 位址節點 (使用動態公式)
  	    Addr1["(code size * 1 K)"]:::ad
  	    Addr2["(Hub code size +<br>Host Bridge code size)<br>* 1 K"]:::ad
  	    Addr3["((Hub cs + Host cs) * 1K)<br>+ 0x20"]:::ad
  	    Addr4["((Hub cs + Host cs) * 1K)<br>+ 0x60"]:::ad
  	    Addr5["((Hub cs + Host cs) * 1K)<br>+ 0xA0"]:::ad
  	
  	    %% --- 流程連線 ---
  	    HubBin --> Addr1 --> HostBridgeBin --> Addr2 --> HashBlock --> Addr3 --> PublicKeyBlock --> Addr4 --> SignatureBlock --> Addr5
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      class HubBin,HostBridgeBin hub;
  ```
  </details>
  
  <details><summary>Rom file format(Hub)(Flash 裡面存放的方式)</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/5063701f-effd-4ba3-87ef-ea6e0298c62b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG2XND7K%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCF%2FiGplA2YlVUCM6awYO%2FSZLSjiifd275jADI7z6eKBAIgKtKfxa2HP%2BdivIxvm86f2vJnHknD4dpcSPAl0RcuqQgq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDKxh1qKv5uU5Ew7dLSrcAyLFmsY66TGyAzMcWrlKyhsXW5qehRNpAgG7IsHI2FdffCg5ElOkdX1Gksp9Z6pa5%2BsJSESyUJ56jjXDXxXyxu3IwIbRr1svRYT8lQeVwDY%2ByJ0GmRym9xQGtuVRX3VF1nycn9PN0vP1sTzfjcViGI7TwW2WDAZ4WaHlI0G2VbqF%2F8DM7wQXC5yHLy5qviqLBz6gGZ6BP%2FaMecn7YpCtWjFWakaXhQwhx4MSa3X7yJGGGfzQnwnyMPN5AAyMd%2BP1Mqld8XRK2KgrDKjfW7X7J87FcSH%2FMSaCkua8xMPLy4oMdrRatVejFg16JOIGChhZkPRKhFL%2BBCbsFU1%2FnxVQHO52HP1E%2Fdf6Tlyw6mPqZvVaizMSgLGZb%2Fq9%2F0lGPaAyUxa08FKF4fEfekto52u2MaknOq7%2BNYWRMDjbwVbpD542ouW%2BT9Dn%2FO0xhljAdcXJfamSuyNf4Eufo0p0BqtdMAra6howoz0RLfRlrP%2FZ%2FNWEvJWe%2BE8q8fYBV%2F60a9OlUyN1I4FxCoFYWu7rWqnOUm1Mp5rsDTzzz9Yb0yD29az%2B4wU5jIzxuXsjAXIiuKSbgiW79aKCgJxNQz31B8SXMgH62tWtkk991ei1mjMjCuZkPjzImHdF3U%2BSkcOoMPaT7s4GOqUBw3msXsPiJEj%2FltcJYxTg32lNrYxwwthsZLS2TzXcMHKp3s2OhMKHYI%2BDJ%2B6%2FNUikv27pZ1i2J%2F9Uh8RvaKjLt8opvWVBaCwnEMHi%2BKMBomKilvl%2BbN3BIeBNgYwL9tntkrPAbgshRnT6RPD8J5n0UuPCffvkvwqOOCN%2FCyrF5V32TJfX%2BQsed7Xzv9H4PdJd1QnW%2F%2FXk3IbXbQZ5aSYMjP2iNqRq&X-Amz-Signature=aa26ffdc9f458919132cf09c9e53c990c3cb2f568de48b050270ed7f099490fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Dual Bank Layout with Nested Public Key"
  
      %% --- 節點定義 (更新文字描述) ---
      
  		    %% Block 1 數據區塊
  	      subgraph HubBin
  				    CodeSize["code size (0x1) : 0x00FB"]:::bd
  				    CheckSum["check Sum (0x2) : At the end"]:::bd
  		    end
  		  
  		  	subgraph NullData ["Null Data"]
  					  PublicKey["Public Key (0x40) : 0xFF00"]:::pk
  		    end
  
  				%% Block 2 數據區塊
  			  subgraph HubBin2
  				    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  				    CheckSum2["check Sum (0x2) : At the end"]:::bd
  		    end
  		  
  		  	subgraph NullData2 ["Null Data"]
  					  PublicKey2["Public Key (0x40) : 0x1FF00"]:::pk
  		    end
  		
  		    %% 位址節點 (標示區塊邊界)
  		    Addr1_dyn["(code size * 1 K)"]:::ad
  		    Addr_10000["0x10000"]:::ad
  		    Addr2_dyn["0x10000 + (code size * 1 K)"]:::ad
  		    Addr_20000["0x20000"]:::ad
  		
  		    %% --- 流程連線 (簡化流程) ---
  		    HubBin --> Addr1_dyn --> NullData --> Addr_10000 --> HubBin2 --> Addr2_dyn --> NullData2 --> Addr_20000
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
      classDef null fill:#007bff,stroke:#0056b3,stroke-width:2px,color:white;
   
  
      %% Apply Styles
      class HubBin,HubBin2 hub;
      class NullData,NullData2 null;
  ```
  </details>
  
  <details><summary>Rom file format(Hub + Host Bridge)(Flash 裡面存放的方式)</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/0429ddcd-b646-4f7b-9380-6aea85c5e7bd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2MQHBTR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICgW2iv4t%2FSjOI3mu4ac5TYz238H1spP0Cd8KUoUHLaiAiBXrsB9eMrHRUCaGLzKdTgXKVl4Buh3o8vu9M0npnL%2Bqir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMtaQSSNp8cdmYLVdEKtwDQbOSommCjRtt8YxjCKy2TUciowTZa7QBYlRBL6B3Xxct0%2F%2BEqVd%2FKiutczooWM3GvoKq2WwUmDpaRTfcsfonuxEjdc9zhpJ84YfB07HKd3SF8PzbZZyUfF1Cs5Y16tn42tok4%2Fz1ubX7Ob5wXlif6Q4GiyzjSSXL3WEB7tFZTyQFXAIaPvwuzfJqPv2EHDS6g2rX%2Bk1gBHXipMHFp2pehMXqUd5FrJc7sL55lWaMGpztohpobMJEAx%2BLia97S4xp3jPD2rar4aUHDnuVBnqUVvFdFQmKsKt3lWDmoAqRU7JhS%2BZ10zFPNXab26X3xddegb4xVpERthy32AmfyVymumJDJZ0rdy8d8k1eRMebQ4zVpVdNu0hKjxUFtxw5lBfOFt%2B%2BIREQV9S09r9Z0AYrmLJOmoqz4TFmloqsWCFFHkEwZClCrt4Ve%2BhH4eSGWH%2BdLS2W55k%2BXXzG8tLSQriCd%2FUAYawdaY71KXoOP1kBpevb2z4ZTOb0rxV%2FKimTPDx8hD8tSXw2QtXBeosuQXdJ0wKYyRBqIYsxeLRk9h6h1qrbGClcm7yEey5SxUYk3Ka2hiNSbdxBpV%2Fgr1AXbBSpt5aRqoFMMTkUPM%2FDb5xhBFULH6kwbTzzV2UsulwwuJbuzgY6pgGpxJfRSl4boFallYtXAPKZGuNuFoYNKvYqrj%2BRtS6fWAItT0pdomRh4iYlhlAt2CAv6o74JDLWfLOri4gqZ6D6Blr0CFBknlVziV%2Bmay7G8ownUtC6Jj7rVbuk3fLvM20OEw%2FGReuVtyOWqr1nOD21rT6EQMVgnO9OTy4tocgSTMoaVK3hgAVmlwJ5odSzbSumFW1%2F5cN8nIHdIzKxjMFTSZZS5dk%2F&X-Amz-Signature=0a8b53bb6054787450445262b5aa729a6a4dbc971d17f8d36cfb47406cd93fe7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  
  ```mermaid
  graph TD
      subgraph "Quad-Block Memory Layout"
  
  	    %% --- 節點定義 ---
   	    %% Block 1: Hub Bin
  	  	subgraph HubBin
  			    CodeSize["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	  	subgraph NullData ["Null Data"]
  				  PublicKey["Public Key (0x40) : 0xFF00"]:::pk
  	    end
  	   
  	    %% Block 2: Hub Bin
  	  	subgraph HubBin2
  			    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum2["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	  	subgraph NullData2 ["Null Data"]
  				  PublicKey2["Public Key (0x40) : 0x1FF00"]:::pk
  	    end
  	
  	    %% Block 3: Host Bridge Bin
  	    subgraph HostBridgeBin
  	        CodeSize3["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum3["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	  	subgraph NullData3 ["Null Data"]
  				  PublicKey3["Public Key (0x40) : 0x2FF00"]:::pk
  	    end
  	
  	    %% Block 4: Host Bridge Bin
  	    subgraph HostBridgeBin2
  	        CodeSize4["code size (0x1) : 0x00FB"]:::bd
  			    CheckSum4["check Sum (0x2) : At the end"]:::bd
  	    end
  	    
  	  	subgraph NullData4 ["Null Data"]
  				  PublicKey4["Public Key (0x40) : 0x3FF00"]:::pk
  	    end
  	
  	    %% 位址節點
  	    Addr_dyn1["(code size * 1 K)"]:::ad
  	    Addr_10000["0x10000"]:::ad
  	    Addr_dyn2["0x10000 + (code size * 1 K)"]:::ad
  	    Addr_20000["0x20000"]:::ad
  	    Addr_dyn3["0x20000 + (code size * 1 K)"]:::ad
  	    Addr_30000["0x30000"]:::ad
  	    Addr_dyn4["0x30000 + (code size * 1 K)"]:::ad
  	    Addr_40000["0x40000"]:::ad
  	
  	
  	    %% --- 流程連線 ---
  	    HubBin --> Addr_dyn1 --> NullData --> Addr_10000 --> HubBin2 --> Addr_dyn2 --> NullData2 --> Addr_20000
  	    Addr_20000 --> HostBridgeBin --> Addr_dyn3 --> NullData3 --> Addr_30000 --> HostBridgeBin2 --> Addr_dyn4 --> NullData4 --> Addr_40000
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
      classDef null fill:#007bff,stroke:#0056b3,stroke-width:2px,color:white;
   
  
      %% Apply Styles
      class HubBin,HubBin2,HostBridgeBin,HostBridgeBin2 hub;
      class NullData,NullData2,NullData3,NullData4 null;
  ```
  </details>
  
  <details><summary>ECDSA Code Sign update flow</summary>
  
  
  
  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/45502aa5-0284-44e4-baf9-ac17ec5f2616/GL3590_Code_Sign_Flow.drawio_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JWH4KAU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDF9sBDDQVetNVG3i9yZmh%2B3j5bszhD53t1r%2Bk6LQAUVAIgMc4o4iUDIaq942nk8WAQSGnZMgmEWoueje8kzQadS20q%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDMilt%2BpVhCT6SmWPHSrcA%2FveE5uhrAshg5O83QkGNp4T6Btw7CPg87hEzG5%2FnrURAGiVL5ycZe899Tp74cU2wJTpHa64FYJNop7vIAWEEwTdeDO5itLBWWqZnBFw%2FbWWFOFgDp9P0bE%2FFPx0VJCFJxsGmqEsZCzVNGs8y1ZVPYLrJWW8P6%2Ft35NpH3pE4TpTTogwZRzuhnKj3jW3mhMCxHFfqcJpdEO9TYvmdKlzixqPhtGm%2F%2Bj4Pyb%2B0Tli%2BGwtNndBAAOpCXKHFkD92aI89juIgidDXh%2Bp1d8LDiPAoCOn26WLS1Te15kz6Tcmc6xH1QDXRt6ptDYPgZlEC3EHCja9M1X07nPqFgnb9hPW0LuRs4%2F8gm4f%2BTxWC4g8IoettRPVO5urIgFSEkDlbw%2FOXRGCizmjvQfdr%2BedSbPHRzPDUom%2FAdlcc7gfgKJ8GmzG3IRALsN9hHyGad0SswZlbPcg6j5BHrmrAYKnzrAi81UVGHzqklSBxtts9HpS6KN9B%2F3h8mdK6JkVHZZCf2fWEvzeN5fver03tC6yleh0Ih4ktdu7UkmFcyV9vtgAHB%2BoyBOuwG5mZ8s7go43R3INCaooQGlmLJrahGzACQL%2FyGyl8d8eYh6Wf9N%2BTo78OcaKoBnpNUMrmwQU10WqMJqY7s4GOqUBV9ftf%2BhnAJfbdh4MFR1jP467c5aSPPLyyebGJMcvnbwC7Ia66e6mHIEfS5UvshQFD1Pn5lvbSjS1%2BX%2FEsyxA%2FUntYn6lBYYmWBZ6e7b7U9YF3QwXmiqlmuxi6MGJ8qhKoZmFNBkdF2VTkcM6WeEoEc4bnvEwlVOVVpx1jL0prx6SIVF1qkkV0h7R5z3V%2FcUOT2L9n1i4dGHHfKyU40QLDHAXYzl6&X-Amz-Signature=69270f0bcf428ba30698512697cf7d82fee10e66de3f5df54bd673803fb956bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
  </details>

- Recovery : [Link](/68f8b6acd31a4ce089ba421ad0b0d5fc#d7a84f6c0f994469b8ffec1bdf2bc804)

  ![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/5a64176e-3b3d-42e2-ab29-bd0eada72a50/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNZJRMEM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICA0YETK%2FThqIw0V%2F2IsriacDfv%2B70IzL7hkm%2BABw3FoAiBWkqUu6tAPH%2FU2Ad2nhrR8D6gf6%2BPXUYfGmkYLHkHXsyr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIM9Ex%2FccWFuglLHlVOKtwDeSKlSv4t9f2ajDE3F82Hp%2FmWTIh20XB5YeTN4O1l8qoH85EIV082SPc%2BW3LLw5VPYH4PmhOUA%2FSsoMXlc5PVXd%2BIB1mJwslSkJclgbfaLUHDk1u4hE3HCf6GkwPl3e6lvL3XC79UXIQU8rc55MpJGXyg9ywUMlUklhl8NgZ%2BcLF689EevTrnyQLXKzPW1E1GTc2Z%2FpVfLKjkVSChETTZN07LFiOBNf2DufxHHkRRJIOlVnqRAaN8uZgu%2BxM0akXYDSmCBinTN5GfgjxGaUsrXHpbx3egMq8nfNSLdrh7glWXbxg2JTYZP30%2BEk4PeJyrByoUedY5ol7xaEpYitNNdtg4pm6QhpvKpBCtbTLI6eBvpukN21j0CJp%2BsWNWymjHWuBawv%2FpmCw7Z1yFwtUrMOdCOc3Mcsvitr3Kalng6k94OhbYqS0YbdYP9FNK9uX4RHiswz5sqGsrwvOF16Xbxprs%2F2kvwYa07DsTZ09T7k9x2p3mrzjFJmwxfNsmjJTrb8PUSGUaKaSW60omMV97aK%2FYDpanQ2iAsJ5z0mIcxIK%2F6LfwWazopE%2FBDXoNpK284WyNqHHEW9JaD1kFTWKKNyVWDRxyZcJpjn2SLatQXxC9wDxvbnmnYE%2BHHw8w05buzgY6pgGole3txOZK69MFoL7GAHuOxkI9lpVxbTC0qbkd%2Bi80%2FzSR5k2NGPrcykoHF1%2FWkTb87%2BOVMKpxOsHM7Bn0L5RWBLK2XMPr2WkN%2BYEefVlOjpGJpzHcDHyjQyjoLAfjSo53eUgfMbOZax7HuGCbdrCWurrEG7K7dtslF5YqzatArUZgNXkR8MSGxnxmRd3XqKVP1WSdZ4CWDKfBBvd%2F1GojaAWDWVyQ&X-Amz-Signature=73f06418a2547576dcd18ac8bb46f31cac5a5c3327d2cc8ed296208b149b655f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[UNSUPPORTED_BLOCK: child_page]

ECDSA Code Sign Method

- Sign bin file format

  ```mermaid
  graph TD
      subgraph "Code Sign File Layout"
  
  		    %% --- 節點定義 ---
  		    %% 數據區塊
  			  subgraph HubBin
  				    PublicKey["Public Key (0x40) : 0xFFA0"]:::pk
  				    CheckSum["check Sum (0x2) : At the end"]:::bd
  				    CodeSize["code size (0x1) : 0x00FB"]:::bd
  		    end
  
  		    HashBlock["Hash"]:::hash
  		    PublicKeyBlock["Public Key"]:::pk
  		    SignatureBlock["Signature"]:::sig
  		
  		    %% 位址節點
  		 
  		    Addr_10000["0x10000"]:::ad
  		    Addr_10020["0x10020"]:::ad
  		    Addr_10060["0x10060"]:::ad
  		    Addr_100A0["0x100A0"]:::ad
  		
  		    %% --- 流程連線 ---
  		    HubBin --> Addr_10000 --> HashBlock --> Addr_10020 --> PublicKeyBlock --> Addr_10060 --> SignatureBlock --> Addr_100A0
      end
  
      %% --- 樣式定義 ---
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
  
      %% Apply Styles
      class HubBin,HubBin2 hub;
  ```

- Rom file format(Flash 裡面存放的方式)

  ```mermaid
  graph TD
      subgraph "ROM File Layout"
  		    subgraph HubBin
  				    PublicKey["Public Key (0x40) : 0xFFA0"]:::pk
  				    CheckSum["check Sum (0x2) : At the end"]:::bd
  				    CodeSize["code size (0x1) : 0x00FB"]:::bd
  		    end
  		    subgraph HubBin2
  				    PublicKey2["Public Key (0x40) : 0xFFA0"]:::pk
  				    CheckSum2["check Sum (0x2) : At the end"]:::bd
  				    CodeSize2["code size (0x1) : 0x00FB"]:::bd
  		    end
  
  		    %% === Address Nodes ===
  		    Addr_10000["0x10000"]:::ad
  		    Addr_20000["0x20000"]:::ad
  		
  		    %% === Connections ===
  		    HubBin --> Addr_10000 --> HubBin2 --> Addr_20000
      end
  
      %% === Style Definitions ===
      classDef hub fill:#e0f2fe,stroke:#38bdf8,stroke-width:2px;
      classDef bd fill:#fef9c3,stroke:#eab308,stroke-width:2px;
      classDef hash fill:#fecdd3,stroke:#f43f5e,stroke-width:2px;
      classDef pk fill:#f5d0fe,stroke:#a855f7,stroke-width:2px;
      classDef sig fill:#fef953,stroke:#eab308,stroke-width:2px;
      classDef ad fill:#fff,stroke:#fff,color:#000;
      
      %% === Apply Styles ===
      class HubBin,HubBin2 hub;
  ```
