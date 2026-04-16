# Mac Conan & Clang-Tidy 設定方式


1. 開啟終端機執行，因為預設會安裝 canan 2 ，所以要改成小於 2。[Conan](https://docs.conan.io/en/latest/installation.html)
1. 尋找 conan 安裝路徑，把 conan 安裝路徑設定在 PATH 裡面，不同 CPU 存放位置不一樣。[Conan](https://docs.conan.io/en/latest/installation.html)
1. 把路徑指定到專案路徑，以 CLI Tool 為例，command 如下。[Conan](https://docs.conan.io/en/latest/getting_started.html)
1. 把 conan 設定 build 成 cmake 設定檔放到 build folder ，command 如下，產生的檔案為 conanbuildinfo.cmake。[Conan](https://docs.conan.io/en/latest/getting_started.html)
1. 把 conanbuildinfo.cmake 放到 build folder ，然後再用 cmake build 一次，CMakeLists.txt 會去判斷這件事。[Conan](https://docs.conan.io/en/latest/getting_started.html)


1. 安裝 llvm。[Clang-tidy](https://clang.llvm.org/extra/clang-tidy/)
1. 設定 tidy 環境變數。[Clang-tidy](https://clang.llvm.org/extra/clang-tidy/)
1. 下 command 來確認 clang-tidy 位置。[Clang-tidy](https://clang.llvm.org/extra/clang-tidy/)
1. 將此路徑放入 script 裡面。[Clang-tidy](https://clang.llvm.org/extra/clang-tidy/)