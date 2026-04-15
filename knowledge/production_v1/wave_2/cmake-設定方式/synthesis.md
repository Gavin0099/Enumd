[未有直接 Source 錨點，待確認] 以下是基於提供的內容所撰寫的 Cmake 設定方式報告:



1. **指定原始碼位置**：在 Cmake GUI 中指定專案的原始碼所在位置。`[Cmake GUI](https://cmake.org/cmake/help/latest/guide/user-interaction/index.html#the-cmake-gui)`
2. **指定建置輸出位置**：設定編譯後的二進位檔案要輸出的位置。`[Cmake GUI](https://cmake.org/cmake/help/latest/guide/user-interaction/index.html#the-cmake-gui)`
3. **進行組態設定**：在 Cmake GUI 中設定專案的組態選項，例如編譯器參數、第三方函式庫等。`[Cmake GUI](https://cmake.org/cmake/help/latest/guide/user-interaction/index.html#the-cmake-gui)`
4. **產生專案檔**：完成組態設定後，點選 "Generate" 按鈕產生原生的專案檔案，例如 Visual Studio 解決方案或 Xcode 專案。`[Cmake GUI](https://cmake.org/cmake/help/latest/guide/user-interaction/index.html#the-cmake-gui)`
5. **開啟專案**：產生專案檔後，即可在相應的 IDE 中開啟並編譯專案。`[Cmake GUI](https://cmake.org/cmake/help/latest/guide/user-interaction/index.html#the-cmake-gui)`

## Xcode Cmake 設定方式
在 Xcode 中使用 Cmake 的主要步驟如下:

1. **每個資料夾都需要有一個 `CMakeLists.txt` 檔案**，用於設定該資料夾的環境變數。`[Xcode Cmake 設定方式]`
2. **根目錄的 `cmake` 檔案需要設定編譯器參數**，因為 Xcode 需要使用 Objective-C++ 進行建置。`[Xcode Cmake 設定方式]`
   其中 `mbedtls`、`hubFwUpdate` 和 `USBHubISP` 是要導入的函式庫。`[Xcode Cmake 設定方式]`
           ${CMAKE_CURRENT_SOURCE_DIR}/your_source_file.cpp
   這樣可以將 `your_source_file.cpp` 加入到 `your_target_name` 目標中。`[Xcode Cmake 設定方式]`

總之，在 Xcode 中使用 Cmake 需要在每個資料夾設定 `CMakeLists.txt`，並在根目錄的 `cmake` 檔案中設定編譯器參數和導入函式庫。原始碼的包含也需要透過 `target_sources` 命令完成。