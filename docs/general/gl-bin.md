---
title: GL Bin
category: general
notion_id: 16f64f6b-c656-8075-af6c-e3f6c01680cc
notion_url: 'https://www.notion.so/GL-Bin-16f64f6bc6568075af6ce3f6c01680cc'
notion_updated_at: '2025-01-03T07:45:00.000Z'
exported_at: '2026-04-06T11:26:41.023Z'
is_summarized: false
---

```c#
      private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static class RomConstants
        {
            public const int INITIAL_BUFFER_SIZE = 0x100;
            public const int BLOCK_SIZE = 0x10000;
            public const int NULL_DATA_SIZE = 0x8000;
            public const int OFFSET_0x20 = 0x20;
            public const int PUBLIC_KEY_OFFSET = 0xFF00;
            public const int PD_DATA_SIZE = 0x8000;
            public const int PD_SIGNATURE_OFFSET = 0xFC;
            public const string PD_SIGNATURE = "PRDY";
        }
        public class RomConfig
        {
            public int PublicKeySize { get; set; }
            public string[] ChipTypes { get; set; }
            public int TotalSize { get; set; }
            public bool HasHostBridge { get; set; }
            public byte[] SumDataBuffer { get; set; }
            public byte[] PublicKeyBuffer { get; set; }

            // 參數化建構子
            public RomConfig(int totalSize)
            {
                TotalSize = totalSize;
                ChipTypes = new string[10]; // 假設有 10 種 GLTYPE
                SumDataBuffer = new byte[TotalSize];
                PublicKeyBuffer = new byte[0x100];
            }

            // 無參數建構子
            public RomConfig()
            {
                ChipTypes = new string[10]; // 假設有 10 種 GLTYPE
            }
        }

        public static int MergeHubSignBinToRom(int mode, Options options)
        {
            try
            {
                // 防禦性檢查
                if (options == null)
                {
                    Logger.Error("Options parameter is null.");
                    return (int)ERROR_CODE.FILE_MISMATCH;
                }
                string binChipType = "";
                // 檢測檔案類型
                string fileType = DetectFileType(options.InputSignFiles, ref binChipType);
                Logger.Info($"Detected file type: {fileType}");


                // 初始化配置
                RomConfig config = InitializeConfig(options, fileType, binChipType);

                // 讀取必要資料
                byte[] hubData = ReadData(options.InputSignFiles, "Hub file");
                string[] chipTypes = new string[(int)GLTYPE.GL_GLTYP_END];
                byte[] hostBridgeData = null; // 預設為 null

                int hubSumSize = GetHubCodeSize(hubData, 0, ref chipTypes[(int)GLTYPE.HUB]);


                switch (fileType)
                {
                    case "HUB":
                    case "HUB_HOSTBRIDGE":
                        Logger.Info("Processing HUB + HostBridge file...");
                        ProcessHubWithOptionalHostBridge(options, GetHubType(chipTypes[(int)GLTYPE.HUB]), fileType, binChipType);
                        break;

                    case "PD":
                        Logger.Info("Processing PD file...");
                        ProcessPd(options, fileType, binChipType);
                        break;

                    default:
                        Logger.Error($"Unsupported file type: {fileType}");
                        return (int)ERROR_CODE.FILE_MISMATCH;
                }


                return (int)ERROR_CODE.SUCCESS;
            }
            catch (Exception ex)
            {
                Logger.Error($"ROM merge failed: {ex.Message}");
                return (int)ERROR_CODE.FILE_MISMATCH;
            }
        }
        private static byte[] ProcessGli7455(byte[] hubData, byte[] hostBridgeData, string[] chipType, byte[] sumDataBuf, bool addHb)
        {
            ushort hubCheckSum = CalCheckSum(hubData, GL7455_HUB_LEN);
            Array.Copy(hubData, 0, sumDataBuf, 0, GL7455_HUB_LEN);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, GL7455_HUB_LEN, 0);
            Array.Copy(hubData, 0, sumDataBuf, BLOCK_SIZE, GL7455_HUB_LEN);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, GL7455_HUB_LEN, BLOCK_SIZE);

            // Array.Copy(publicKey, 0, sumDataBuf, PUBLIC_KEY_GL3525_OFFSET, ECDSA_PUBLIC_KEY_LEN);

            return sumDataBuf;
        }
        private static byte[] ProcessGli744x(byte[] hubData, byte[] sumDataBuf)
        {
            ushort hubCheckSum = CalCheckSum(hubData, hubData.Length);
            Array.Copy(hubData, 0, sumDataBuf, 0, hubData.Length);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, hubData.Length, 0);

            return sumDataBuf;
        }
        private static byte[] ProcessGli7466(byte[] hubData, byte[] sumDataBuf, int publicKeySize)
        {
            int publicKeyOffset = GL3523_PUBLIC_KEY_OFFSET;
            if (hubData.Length > SUPPORT_HID_ISP_FLAG && hubData[SUPPORT_HID_ISP_FLAG] == '1')
            {
                publicKeyOffset = GL3523_HID_PUBLIC_KEY_OFFSET;
            }

            ushort hubCheckSum = CalCheckSum(hubData, hubData.Length);
            Array.Copy(hubData, 0, sumDataBuf, 0, hubData.Length);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, hubData.Length, 0);

            int publicKeyArea0Offset = BLOCK_SIZE / 2 - publicKeyOffset;
            Array.Copy(hubData, hubData.Length - publicKeyOffset, sumDataBuf, publicKeyArea0Offset, publicKeySize);

            Array.Copy(hubData, 0, sumDataBuf, BLOCK_SIZE / 2, hubData.Length);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, hubData.Length, BLOCK_SIZE / 2);

            int publicKeyArea1Offset = BLOCK_SIZE - publicKeyOffset;
            Array.Copy(hubData, hubData.Length - publicKeyOffset, sumDataBuf, publicKeyArea1Offset, publicKeySize);

            return sumDataBuf;
        }
        private static byte[] ProcessGli74xx(byte[] hubData, byte[] hostBridgeData, string[] chipType, byte[] sumDataBuf)
        {
            ushort hubCheckSum = CalCheckSum(hubData, hubData.Length);
            Array.Copy(hubData, 0, sumDataBuf, 0, hubData.Length);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, hubData.Length, 0);

            Array.Copy(hubData, 0, sumDataBuf, BLOCK_SIZE, hubData.Length);
            CopyCheckSumToBuf(ref sumDataBuf, hubCheckSum, hubData.Length, BLOCK_SIZE);

            if (hostBridgeData != null)
            {
                ushort hostBridgeCheckSum = CalCheckSum(hostBridgeData, hostBridgeData.Length);
                Array.Copy(hostBridgeData, 0, sumDataBuf, 2 * BLOCK_SIZE, hostBridgeData.Length);
                CopyCheckSumToBuf(ref sumDataBuf, hostBridgeCheckSum, hostBridgeData.Length, 2 * BLOCK_SIZE);

                Array.Copy(hostBridgeData, 0, sumDataBuf, 3 * BLOCK_SIZE, hostBridgeData.Length);
                CopyCheckSumToBuf(ref sumDataBuf, hostBridgeCheckSum, hostBridgeData.Length, 3 * BLOCK_SIZE);
            }

            Logger.Info("Processing Public Key...");
            byte[] publicKey = ExtractPublicKey(hubData, GL3523_PUBLIC_KEY_OFFSET, ECDSA_PUBLIC_KEY_LEN);
            Array.Copy(publicKey, 0, sumDataBuf, PUBLIC_KEY_AREA_0_OFFSET, ECDSA_PUBLIC_KEY_LEN);
            Array.Copy(publicKey, 0, sumDataBuf, PUBLIC_KEY_AREA_1_OFFSET, ECDSA_PUBLIC_KEY_LEN);

            return sumDataBuf;
        }

        private static string DetectFileType(string filePath, ref string binChipType)
        {
            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
            {
                throw new ArgumentException($"File not found or invalid: {filePath}");
            }

            // 讀取檔案內容
            byte[] hubBinDataBuf = File.ReadAllBytes(filePath);
            if (hubBinDataBuf.Length == 0)
            {
                throw new ArgumentException("Input file is empty.");
            }


            FW_TYPE eFwType = FW_TYPE.FW_TYPE_UNKNOWN;
            int offset = 0;

            // 獲取 Hub 的 Code Size 和 Chip Type
            int hubCodeSize = GetHubCodeSize(hubBinDataBuf, 0, ref binChipType);

            // 設定偏移量根據不同的 Chip Type 和 Code Size
            offset = CalculateOffset(binChipType, hubCodeSize, hubBinDataBuf.Length);

            // 使用 QuerySignature 檢測檔案類型
            if (QuerySignature(hubBinDataBuf, offset, ref eFwType) != ERROR_CODE.SUCCESS)
            {
                throw new ArgumentException("Failed to detect file type: Signature mismatch.");
            }

            // 返回檔案類型
            return MapFwTypeToFileType(eFwType);
        }
        private static int CalculateOffset(string binChipType, int hubCodeSize, int totalSize)
        {
            if ((binChipType.Contains(GLChipID.GLI7423.ToString())) ||
                      (binChipType.Contains(GLChipID.CYC7423.ToString())) ||
                      (binChipType.Contains(GLChipID.GLI7504.ToString())) ||
                      (binChipType.Contains(GLChipID.GLI7509.ToString())))

            {
                return totalSize > BLOCK_SIZE ? hubCodeSize : 0;
            }
            else if (binChipType.Contains(GLChipID.GLI7455.ToString()))
            {
                return totalSize > GL7455_HUB_LEN + GL7455_PD_LEN ? GL7455_HUB_LEN : 0;
            }
            else if (binChipType.Contains(GLChipID.GLI7441.ToString()) ||
                binChipType.Contains(GLChipID.GLI7394.ToString()) ||
                binChipType.Contains(GLChipID.GLI7466.ToString()))
            {
                return 0;
            }

            return 0; // 預設偏移為 0
        }
        private static string MapFwTypeToFileType(FW_TYPE eFwType)
        {
            switch (eFwType)
            {
                case FW_TYPE.FW_TYPE_HUB:
                    Logger.Info("Detected file type: HUB");
                    return "HUB";

                case FW_TYPE.FW_TYPE_HOST_BRIDGE:
                    Logger.Info("Detected file type: HUB + HostBridge");
                    return "HUB_HOSTBRIDGE";

                case FW_TYPE.FW_TYPE_INT_PD:
                    Logger.Info("Detected file type: PD");
                    return "PD";

                case FW_TYPE.FW_TYPE_SD_CARD:
                    Logger.Info("Detected file type: SD Card");
                    return "SD_CARD";

                case FW_TYPE.FW_TYPE_SIM_CARD:
                    Logger.Info("Detected file type: SIM Card");
                    return "SIM_CARD";

                default:
                    throw new ArgumentException("Unknown file type based on provided signature.");
            }
        }
        private static void WriteOutputFile(string outputFile, byte[] data)
        {
            try
            {
                if (string.IsNullOrEmpty(outputFile))
                    throw new ArgumentException("Output file path is required.");

                outputFile = outputFile.Trim();
                // 檢查並處理目錄部分
                string directory = Path.GetDirectoryName(outputFile);

                // 如果有目錄部分，檢查是否存在，若不存在則建立
                if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                // 將資料寫入檔案
                File.WriteAllBytes(outputFile, data);

                Console.WriteLine($"File written successfully to: {outputFile}");
            }
            catch (UnauthorizedAccessException)
            {
                throw new UnauthorizedAccessException($"Access to the file path '{outputFile}' is denied. Check your permissions.");
            }
            catch (IOException ex)
            {
                throw new IOException($"An I/O error occurred while writing to the file '{outputFile}': {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Unexpected error while writing to the file '{outputFile}': {ex.Message}");
            }
        }
        private static HubType GetHubType(string chipType)
        {
            if (chipType.Contains(GLChipID.GLI7423.ToString()) ||
                chipType.Contains(GLChipID.GLI7504.ToString()) ||
                chipType.Contains(GLChipID.GLI7509.ToString()) ||
                chipType.Contains(GLChipID.GLI7518.ToString()))
            {
                return HubType.GLI7423; // 使用代表性型號
            }
            if (chipType.Contains(GLChipID.GLI7455.ToString()))
            {
                return HubType.GLI7455;
            }
            if (chipType.Contains(GLChipID.GLI7441.ToString()) ||
                chipType.Contains(GLChipID.GLI7394.ToString()))
            {
                return HubType.GLI7441; // 使用代表性型號
            }
            if (chipType.Contains(GLChipID.GLI7466.ToString()))
            {
                return HubType.GLI7466;
            }

            return HubType.Unknown;
        }
        private static void ProcessHubWithOptionalHostBridge(Options options, HubType hubType, string fileType, string binChipType)
        {
            Logger.Info("Initializing configuration for HUB...");

            // 初始化配置
            var config = InitializeConfig(options, fileType, binChipType);

            // 讀取 HUB 資料
            var hubData = ReadData(options.InputSignFiles, "Hub file");

            // 驗證 HUB 資料
            if (!ValidateHubData(hubData, config))
            {
                Logger.Error("HUB data validation failed.");
                throw new Exception("Validation failed for HUB.");
            }

            byte[] hostBridgeData = null;

            // 使用 fileType 判斷是否處理 HostBridge
            if (fileType == "HUB_HOSTBRIDGE")
            {
                Logger.Info("Detected HostBridge in file type, extracting...");
                hostBridgeData = ExtractHostBridgeData(options.InputSignFiles, options.CodeSignType, config);

                if (hostBridgeData == null || hostBridgeData.Length == 0)
                {
                    Logger.Error("HostBridge data extraction failed.");
                    throw new Exception("Validation failed for HostBridge.");
                }

                Logger.Info("HostBridge data extracted successfully.");
            }

            // 合併資料並處理
            var sumData = ProcessRomData(hubData, hostBridgeData, config);

            // 寫入輸出檔案
            WriteOutputFile(options.OutputFiles, sumData);

            Logger.Info(fileType == "HUB_HOSTBRIDGE"
                ? "HUB + HostBridge processing completed."
                : "HUB processing completed.");
        }
        private static void ProcessPd(Options options, string fileType, string binChipType)
        {
            Logger.Info("Initializing configuration for PD...");
            var config = InitializeConfig(options, fileType, binChipType);

            // 讀取 PD 檔案內容
            var pdData = ReadData(options.InputSignFiles, "PD file");

            if (pdData == null || pdData.Length == 0)
            {
                Logger.Error("PD data is invalid or empty.");
                throw new Exception("Invalid PD data.");
            }

            // 複製 PD 資料生成 ROM
            var romData = ProcessPdData(pdData, config);

            // 輸出生成的 ROM 檔案
            WriteOutputFile(options.OutputFiles, romData);

            Logger.Info("PD processing completed.");
        }
        private static byte[] ProcessPdData(byte[] pdData, RomConfig config)
        {
            Logger.Info("Calculating ROM size based on CodeSize...");

            // 獲取 PD 的 Code Size
            string chipType = string.Empty;
            int codeSize = GetHubCodeSize(pdData, 0, ref chipType);

            if (codeSize <= 0)
            {
                Logger.Error("Invalid Code Size detected for PD.");
                throw new Exception("Code Size is invalid.");
            }

            Logger.Info($"Detected Code Size: {codeSize} bytes for chip type: {chipType}");

            // 計算 ROM 的大小（Code Size 的兩倍）
            int romSize = codeSize * 2;

            // 創建 ROM 資料緩衝區
            var romData = new byte[romSize];

            // 將 PD 資料的有效部分複製到 ROM 的第一塊
            Array.Copy(pdData, 0, romData, 0, codeSize);

            // 將 PD 資料的有效部分複製到 ROM 的第二塊
            Array.Copy(pdData, 0, romData, codeSize, codeSize);

            Logger.Info($"PD data duplicated. ROM size: {romSize} bytes.");
            return romData;
        }

        private static byte[] ExtractHostBridgeData(string filePath, string codeSignType, RomConfig config)
        {
            if (string.IsNullOrEmpty(filePath))
                throw new FileNotFoundException("HostBridge file path is null or empty.");

            if (!File.Exists(filePath))
                throw new FileNotFoundException($"HostBridge file not found: {filePath}");

            if (config == null)
                throw new ArgumentNullException(nameof(config), "RomConfig cannot be null.");

            Logger.Info("Extracting HostBridge data...");

            // 讀取檔案內容
            byte[] fileData = File.ReadAllBytes(filePath);

            if (fileData.Length == 0)
                throw new ArgumentException($"HostBridge file is empty: {filePath}");

            // 判斷 Code Size
            string chipType = string.Empty;
            int codeSize = GetHubCodeSize(fileData, 0, ref chipType);

            if (codeSize <= 0 || codeSize > fileData.Length)
                throw new ArgumentException($"HostBridge file has invalid Code Size: {codeSize} bytes.");

            Logger.Info($"HostBridge detected. Code Size: {codeSize} bytes. Chip Type: {chipType}");

            // 計算偏移和長度
            int offset = codeSize; // HostBridge 資料開始的偏移
            // 判斷簽名類型，確定需要扣除的長度
            int signatureLength = DetermineSignatureLength(codeSignType);

            // 確定 HostBridge 資料的長度
            int length = fileData.Length - offset - signatureLength;

            // 防禦性檢查
            if (length <= 0)
            {
                throw new ArgumentException("Invalid file length or signature type. Unable to calculate HostBridge data length.");
            }

            if (offset < 0 || offset >= fileData.Length)
                throw new ArgumentOutOfRangeException(nameof(offset), "Offset is outside the file data range.");

            if (length <= 0 || offset + length > fileData.Length)
                throw new ArgumentException("Calculated HostBridge data length is invalid.");

            // 提取 HostBridge 資料
            var hostBridgeData = new byte[length];
            Array.Copy(fileData, offset, hostBridgeData, 0, length);

            Logger.Info($"HostBridge data extracted successfully. Length: {length} bytes.");
            return hostBridgeData;
        }
        private static int DetermineSignatureLength(string codeSignType)
        {
            if (codeSignType.Contains(GLCODESIGNTPYE.RSA.ToString()))
            {
                return RSA_SIGNATURE_LEN + RSA_PUBLICKEY_LEN;
            }
            if (codeSignType.Contains(GLCODESIGNTPYE.ECDSA.ToString()))
            {
                return ECDSA_HASH_LEN + ECDSA_SIGNATURE_LEN + ECDSA_PUBLIC_KEY_LEN;
            }

            throw new ArgumentException($"Unsupported codeSignType: {codeSignType}");
        }
        private static byte[] ReadData(string filePath, string fileDescription)
        {
            if (string.IsNullOrEmpty(filePath))
                throw new FileNotFoundException($"{fileDescription} path is null or empty.");

            if (!File.Exists(filePath))
                throw new FileNotFoundException($"{fileDescription} not found: {filePath}");

            // 讀取檔案內容
            byte[] fileData = File.ReadAllBytes(filePath);

            if (fileData.Length == 0)
                throw new ArgumentException($"{fileDescription} is empty: {filePath}");

            // 判斷 Code Size
            string chipType = string.Empty;
            int codeSize = GetHubCodeSize(fileData, 0, ref chipType);

            if (codeSize <= 0 || codeSize > fileData.Length)
            {
                throw new ArgumentException($"{fileDescription} has invalid Code Size: {codeSize} bytes.");
            }

            Logger.Info($"{fileDescription} loaded successfully. Code Size: {codeSize} bytes. Chip Type: {chipType}");

            // 返回有效 Code Size 部分的資料
            byte[] validData = new byte[codeSize];
            Array.Copy(fileData, 0, validData, 0, codeSize);

            return validData;
        }


        private static RomConfig InitializeConfig(Options options, string fileType, string binChipType)
        {
            try
            {
                // 防禦性檢查
                if (string.IsNullOrEmpty(options.CodeSignType))
                    throw new ArgumentException("CodeSignType is required.");
                // 初始化 RomConfig
                var config = new RomConfig
                {
                    TotalSize = CalculateTotalSize(options, fileType, binChipType),
                    PublicKeySize = DeterminePublicKeySize(options.CodeSignType),
                    ChipTypes = new string[10],
                    SumDataBuffer = new byte[CalculateTotalSize(options, fileType, binChipType)]

                };

                Logger.Info("Configuration initialized successfully.");
                return config;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error in InitializeConfig: {ex.Message}");
                throw; // 重新拋出例外以讓主流程捕捉
            }
        }

        private static int DeterminePublicKeySize(string codeSignType)
        {
            if (string.IsNullOrEmpty(codeSignType))
                throw new ArgumentException("CodeSignType is required.");

            return codeSignType.Contains(GLCODESIGNTPYE.RSA.ToString()) ? RSA_PUBLICKEY_LEN :
                   codeSignType.Contains(GLCODESIGNTPYE.ECDSA.ToString()) ? ECDSA_PUBLIC_KEY_LEN :
                   throw new ArgumentException("Unsupported CodeSignType.");
        }

        private static int CalculateTotalSize(Options options, string fileType, string binChipType)
        {
            int totalSize = RomConstants.BLOCK_SIZE * 2; // Default size




            if ((binChipType.Contains(GLChipID.GLI7455.ToString())))
            {
                totalSize = GL7455_HUB_LEN * 2 + GL7455_PD_LEN * 2 + DeterminePublicKeySize(options.CodeSignType);
            }

            switch (fileType)
            {
                case "HUB":
                case "PD":

                    break;
                case "HUB_HOSTBRIDGE":
                    totalSize = RomConstants.BLOCK_SIZE * 4;

                    break;

                default:
                    Logger.Error($"Unsupported file type: {fileType}");
                    return (int)ERROR_CODE.FILE_MISMATCH;
            }

            if (!string.IsNullOrEmpty(options.InputPdFiles))
            {
                totalSize += RomConstants.PD_DATA_SIZE;
            }
            return totalSize;
        }

        private static bool ValidateHubData(byte[] hubData, RomConfig config)
        {
            config.ChipTypes[(int)GLTYPE.HUB] = string.Empty;
            int hubSize = GetHubCodeSize(hubData, 0, ref config.ChipTypes[(int)GLTYPE.HUB]);

            return hubSize != (int)ERROR_CODE.FILE_MISMATCH;
        }

        private static byte[] ProcessRomData(byte[] hubData, byte[] hostBridgeData, RomConfig config)
        {
            string chipType = config.ChipTypes[(int)GLTYPE.HUB];

            if (IsGLI742x(chipType))
            {
                Logger.Info("Processing GLI742x series HUB...");
                return ProcessGli74xx(hubData, hostBridgeData, config.ChipTypes, config.SumDataBuffer);
            }
            if (IsGLI7455(chipType))
            {
                Logger.Info("Processing GLI7455 HUB...");
                return ProcessGli7455(hubData, hostBridgeData, config.ChipTypes, config.SumDataBuffer, config.HasHostBridge);
            }
            if (IsGLI739xOr744x(chipType))
            {
                Logger.Info("Processing GLI739x/GLI744x HUB...");
                return ProcessGli744x(hubData, config.SumDataBuffer);
            }
            if (IsGLI7466(chipType))
            {
                Logger.Info("Processing GLI7466 HUB...");
                return ProcessGli7466(hubData, config.SumDataBuffer, config.PublicKeySize);
            }

            throw new NotSupportedException($"Unsupported chip type: {chipType}");
        }




        private static byte[] ExtractPublicKey(byte[] hubData, int offset, int publicKeySize)
        {
            if (hubData == null || hubData.Length < offset + publicKeySize)
            {
                throw new ArgumentException("Invalid hubData or offset is out of range.");
            }

            var publicKeyData = new byte[publicKeySize];
            Array.Copy(hubData, offset, publicKeyData, 0, publicKeySize);
            return publicKeyData;
        }

        private static void CopyHubDataWithChecksum(byte[] hubData, byte[] sumData, RomConfig config)
        {
            int hubSize = GetHubCodeSize(hubData, 0, ref config.ChipTypes[(int)GLTYPE.HUB]);
            ushort checksum = CalCheckSum(hubData, hubSize);

            Array.Copy(hubData, 0, sumData, 0, hubSize);
            CopyCheckSumToBuf(ref sumData, checksum, hubSize, 0);
        }

        private static void CopyPublicKey(byte[] publicKeyData, byte[] sumData, RomConfig config)
        {
            int offset = GL3523_HID_PUBLIC_KEY_OFFSET; //: GL3523_PUBLIC_KEY_OFFSET;
            Array.Copy(publicKeyData, 0, sumData, offset, config.PublicKeySize);
        }

        private static void CopyPdData(byte[] pdData, byte[] sumData, RomConfig config)
        {
            int offset = config.TotalSize - RomConstants.PD_DATA_SIZE;
            Array.Copy(pdData, 0, sumData, offset, RomConstants.PD_DATA_SIZE);
            ushort checksum = CalCheckSum(pdData, RomConstants.PD_DATA_SIZE);
            CopyCheckSumToBuf(ref sumData, checksum, RomConstants.PD_DATA_SIZE, offset);
        }

        private static void CopyHostBridgeData(byte[] hubData, byte[] sumData, RomConfig config)
        {
            int offset = config.TotalSize / 2;
            int size = GetHubCodeSize(hubData, offset, ref config.ChipTypes[(int)GLTYPE.HOSTBRIDGE]);
            ushort checksum = CalCheckSum(hubData, size);
            Array.Copy(hubData, offset, sumData, offset, size);
            CopyCheckSumToBuf(ref sumData, checksum, size, offset);
        }

        private static bool IsGLI742x(string chipType) =>
            chipType.Contains("GLI7423") ||
            chipType.Contains("CYC7423") ||
            chipType.Contains("GLI7504") ||
            chipType.Contains("GLI7509");
        private static bool IsGLI7455(string chipType) => chipType.Contains("GLI7455");
        private static bool IsGLI739xOr744x(string chipType) => chipType.Contains("GLI7394") || chipType.Contains("GLI7441");
        private static bool IsGLI7466(string chipType)
        {
            return chipType.Contains(GLChipID.GLI7466.ToString());
        }

```
### old_ok
```c#
 private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static class RomConstants
        {
            public const int INITIAL_BUFFER_SIZE = 0x100;
            public const int BLOCK_SIZE = 0x10000;
            public const int NULL_DATA_SIZE = 0x8000;
            public const int OFFSET_0x20 = 0x20;
            public const int PUBLIC_KEY_OFFSET = 0xFF00;
            public const int PD_DATA_SIZE = 0x8000;
            public const int PD_SIGNATURE_OFFSET = 0xFC;
            public const string PD_SIGNATURE = "PRDY";
        }
        public class RomConfig
        {
            public int PublicKeySize { get; set; }
            public string[] ChipTypes { get; set; }
            public int TotalSize { get; set; }
            public bool HasHostBridge { get; set; }
            public byte[] SumDataBuffer { get; set; }
            public byte[] PublicKeyBuffer { get; set; }

            // 參數化建構子
            public RomConfig(int totalSize)
            {
                TotalSize = totalSize;
                ChipTypes = new string[10]; // 假設有 10 種 GLTYPE
                SumDataBuffer = new byte[TotalSize];
                PublicKeyBuffer = new byte[0x100];
            }

            // 無參數建構子
            public RomConfig()
            {
                ChipTypes = new string[10]; // 假設有 10 種 GLTYPE
            }
        }
        static int MergeHubSignBinToRom(int mode, Options options)
        {
            int ret = (int)ERROR_CODE.SUCCESS;
            byte[] hubBinDataBuf;
            byte[] hostBridgeBinDataBuf;
            byte[] sumDataBuf;
            string[] binChipType = new string[(int)GLTYPE.GL_GLTYP_END];
            publickeySize = RSA_PUBLICKEY_LEN;
            int allSize = 0;
            byte[] nullDataBuf;
            bool gl7455AddHb = false;
            FW_TYPE eFwType = FW_TYPE.FW_TYPE_UNKNOWN;
            binChipType[(int)GLTYPE.HUB] = "";
            binChipType[(int)GLTYPE.HOSTBRIDGE] = "";
            binChipType[(int)GLTYPE.PD] = "";
            string binChipType_n = "";
            if (options.CodeSignType != null)
            {
                if (options.CodeSignType.Contains(GLCODESIGNTPYE.RSA.ToString()))
                    publickeySize = RSA_PUBLICKEY_LEN;
                else if (options.CodeSignType.Contains(GLCODESIGNTPYE.ECDSA.ToString()))
                    publickeySize = ECDSA_PUBLIC_KEY_LEN;
            }

            ////////////  Hub
            hubBinDataBuf = new byte[0x100];
            hostBridgeBinDataBuf = new byte[0x100];

            hubBufSize = FileStreamReadFile(options.InputSignFiles, ref hubBinDataBuf);

            if (hubBufSize == 0)
                return (int)ERROR_CODE.FILE_NOT_FIND;

            hubSumSize = GetHubCodeSize(hubBinDataBuf, 0, ref binChipType[(int)GLTYPE.HUB]);




            string fileType = DetectFileType(options.InputSignFiles, ref binChipType_n);

            RomConfig config = InitializeConfig(options, fileType, binChipType_n);

            if (fileType == "PD")
            {

                ProcessPd(options, fileType, binChipType_n);

            }
            else
            {
                if (hubSumSize == (int)ERROR_CODE.FILE_MISMATCH)
                    return (int)ERROR_CODE.FILE_MISMATCH;

                if (hubBinDataBuf.Length > (GL7455_HUB_LEN + GL7455_DEV_LEN))
                {
                    hostBridgeType =
                        System.Text.Encoding.UTF8.GetString(hubBinDataBuf, hubSumSize + HOST_BRIDGE_STRING_OFFSET, 4);
                    if ((hostBridgeType.Contains(GLChipID.HOST.ToString())))
                    {
                        gl7455AddHb = true;
                    }
                }

                if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7423.ToString())) ||
                    (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7504.ToString())) ||
                    (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7509.ToString())) ||
                    (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7518.ToString())))
                {
                    if ((hubSumSize + ECDSA_HASH_LEN + ECDSA_SIGNATURE_LEN + ECDSA_PUBLIC_KEY_LEN) <
                        Buffer.ByteLength(hubBinDataBuf))
                    {
                        hostBridgeSumSize = GetHubCodeSize(hubBinDataBuf, hubSumSize, ref binChipType[(int)GLTYPE.HOSTBRIDGE]);
                        Array.Resize<byte>(ref hostBridgeBinDataBuf, (int)hostBridgeSumSize);

                        Array.Copy(hubBinDataBuf, hubSumSize, hostBridgeBinDataBuf, 0, hostBridgeBinDataBuf.Length);
                    }

                    if ((binChipType[(int)GLTYPE.HOSTBRIDGE].Contains(GLChipID.HOST.ToString())))
                    {
                        allSize = 0x10000 * 4;
                    }
                    else
                        allSize = 0x10000 * 2;
                }
                else if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7455.ToString())))
                {
                    if (gl7455AddHb)
                        allSize = (GL7455_HUB_LEN * 2) + (GL7455_PD_LEN * 2) + (GL7455_DEV_LEN * 2);
                    else
                        allSize = (GL7455_HUB_LEN * 2) + publickeySize;
                }
                else if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7441.ToString())) ||
                         (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7394.ToString())) ||
                         (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7466.ToString())) ||
                         (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7518.ToString())))
                {
                    allSize = BLOCK_SIZE;
                }

                sumDataBuf = new byte[allSize];

                if (options.IcProgramming)
                    mode = IC_PROGRAMMING_RECOVERY_FLOW;

                if (mode == IC_PROGRAMMING_RECOVERY_FLOW)
                {
                    Array.Resize<byte>(ref sumDataBuf, allSize);
                }

                for (int i = 0; i < sumDataBuf.Length; i++)
                {
                    sumDataBuf[i] = INITIAL_NUMBER;
                }

                if (mode == IC_PROGRAMMING_RECOVERY_FLOW)
                {
                    if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7423.ToString())) ||
                        (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7504.ToString())) ||
                        (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7509.ToString())) ||
                        (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7518.ToString())))
                    {
                        byte[] publickeyBuf;
                        publickeyBuf = new byte[0];
                        Array.Resize<byte>(ref publickeyBuf, ECDSA_PUBLIC_KEY_LEN);
                        nullDataBuf = new byte[NULL_DATA_SIZE];
                        for (int i = 0; i < NULL_DATA_SIZE; i++)
                        {
                            nullDataBuf[i] = 0x00;
                        }

                        // Hub CheckSum

                        hubBinCheckSum = CalCheckSum(hubBinDataBuf, hubSumSize);

                        // Hub 0
                        Array.Copy(hubBinDataBuf, sumDataBuf, hubSumSize);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, hubSumSize, 0);

                        Array.Copy(hubBinDataBuf, 0, sumDataBuf, hubSumSize, hubSumSize);

                        Array.Copy(nullDataBuf, 0, sumDataBuf, hubSumSize, BLOCK_SIZE - hubSumSize); // NULL DATA

                        // Hub 1
                        Array.Copy(hubBinDataBuf, 0, sumDataBuf, BLOCK_SIZE, hubSumSize);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, hubSumSize, BLOCK_SIZE);

                        Array.Copy(nullDataBuf, 0, sumDataBuf, BLOCK_SIZE + hubSumSize, BLOCK_SIZE - hubSumSize); // NULL DATA

                        if ((binChipType[(int)GLTYPE.HOSTBRIDGE].Contains(GLChipID.HOST.ToString())))
                        {
                            // HostBridge CheckSum

                            hostBridgeBinCheckSum = CalCheckSum(hostBridgeBinDataBuf, hostBridgeSumSize);

                            // Host Bridge 0
                            Array.Copy(
                                hostBridgeBinDataBuf, 0, sumDataBuf, BLOCK_SIZE + BLOCK_SIZE, hostBridgeBinDataBuf.Length);

                            CopyCheckSumToBuf(
                                ref sumDataBuf, hostBridgeBinCheckSum, hostBridgeSumSize, BLOCK_SIZE + BLOCK_SIZE);

                            Array.Copy(nullDataBuf,
                                       0,
                                       sumDataBuf,
                                       BLOCK_SIZE + BLOCK_SIZE + hostBridgeSumSize,
                                       BLOCK_SIZE - hostBridgeSumSize); // NULL DATA

                            // Host Bridge 1
                            Array.Copy(hostBridgeBinDataBuf,
                                       0,
                                       sumDataBuf,
                                       BLOCK_SIZE + BLOCK_SIZE + BLOCK_SIZE,
                                       hostBridgeBinDataBuf.Length);

                            CopyCheckSumToBuf(
                                ref sumDataBuf, hostBridgeBinCheckSum, hostBridgeSumSize, BLOCK_SIZE + BLOCK_SIZE + BLOCK_SIZE);

                            System.Array.Copy(nullDataBuf,
                                              0,
                                              sumDataBuf,
                                              BLOCK_SIZE + BLOCK_SIZE + BLOCK_SIZE + hostBridgeSumSize,
                                              BLOCK_SIZE - hostBridgeSumSize); // NULL DATA

                            Array.Copy(
                                hubBinDataBuf, hubSumSize + hostBridgeSumSize + 0x20, publickeyBuf, 0, ECDSA_PUBLIC_KEY_LEN);

                            System.Array.Copy(publickeyBuf, 0, sumDataBuf, 0x2FF00, ECDSA_PUBLIC_KEY_LEN);
                            System.Array.Copy(publickeyBuf, 0, sumDataBuf, 0x3FF00, ECDSA_PUBLIC_KEY_LEN);
                        }
                        else
                            Array.Copy(hubBinDataBuf, hubSumSize + 0x20, publickeyBuf, 0, ECDSA_PUBLIC_KEY_LEN);

                        // Public Key
                        System.Array.Copy(publickeyBuf, 0, sumDataBuf, 0xFF00, ECDSA_PUBLIC_KEY_LEN);
                        System.Array.Copy(publickeyBuf, 0, sumDataBuf, 0x1FF00, ECDSA_PUBLIC_KEY_LEN);
                    }
                    else if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7455.ToString())))
                    {
                        // Hub CheckSum

                        hubBinCheckSum = CalCheckSum(hubBinDataBuf, GL7455_HUB_LEN);

                        // Hub 0
                        Array.Copy(hubBinDataBuf, sumDataBuf, GL7455_HUB_LEN);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, GL7455_HUB_LEN, 0);

                        // Hub 1
                        Array.Copy(hubBinDataBuf, 0, sumDataBuf, GL7455_HUB_LEN, GL7455_HUB_LEN);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, hubSumSize, GL7455_HUB_LEN);

                        if (gl7455AddHb)
                        {
                            // public key
                            System.Array.Copy(hubBinDataBuf,
                                              GL7455_HUB_LEN + GL7455_DEV_LEN,
                                              sumDataBuf,
                                              (GL7455_HUB_LEN * 2),
                                              publickeySize);

                            // public key
                            System.Array.Copy(hubBinDataBuf,
                                              GL7455_HUB_LEN + GL7455_DEV_LEN,
                                              sumDataBuf,
                                              (GL7455_HUB_LEN * 2) + 0x1000,
                                              publickeySize);

                            // HB 1
                            Array.Copy(hubBinDataBuf,
                                       GL7455_HUB_LEN,
                                       sumDataBuf,
                                       (GL7455_HUB_LEN * 2) + (GL7455_PD_LEN * 2),
                                       GL7455_DEV_LEN);

                            // HB 2
                            Array.Copy(hubBinDataBuf,
                                       GL7455_HUB_LEN,
                                       sumDataBuf,
                                       (GL7455_HUB_LEN * 2) + (GL7455_PD_LEN * 2) + GL7455_DEV_LEN,
                                       GL7455_DEV_LEN);
                        }
                        else
                        {
                            // public key
                            System.Array.Copy(hubBinDataBuf, GL7455_HUB_LEN, sumDataBuf, (GL7455_HUB_LEN * 2), publickeySize);
                        }
                    }
                    else if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7441.ToString())) ||
                             (binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7394.ToString())))
                    {
                        // Hub CheckSum

                        hubBinCheckSum = CalCheckSum(hubBinDataBuf, hubSumSize);

                        // Hub 0
                        Array.Copy(hubBinDataBuf, sumDataBuf, hubBinDataBuf.Length);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, hubSumSize, 0);

                        // Hub 1
                        Array.Copy(hubBinDataBuf, 0, sumDataBuf, BLOCK_SIZE / 2, hubBinDataBuf.Length);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, hubSumSize, hubSumSize);
                    }
                    else if ((binChipType[(int)GLTYPE.HUB].Contains(GLChipID.GLI7466.ToString())))
                    {
                        int publicKeyOffset = GL3523_PUBLIC_KEY_OFFSET;

                        if (hubBinDataBuf[SUPPORT_HID_ISP_FLAG] == '1')
                            publicKeyOffset = GL3523_HID_PUBLIC_KEY_OFFSET;

                        // Hub CheckSum

                        hubBinCheckSum = CalCheckSum(hubBinDataBuf, hubSumSize);

                        // Hub 0
                        Array.Copy(hubBinDataBuf, sumDataBuf, hubSumSize);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, hubSumSize, 0);

                        // public key Area 0
                        System.Array.Copy(
                            hubBinDataBuf, hubSumSize, sumDataBuf, BLOCK_SIZE / 2 - publicKeyOffset, publickeySize);

                        // Hub 1
                        Array.Copy(hubBinDataBuf, 0, sumDataBuf, BLOCK_SIZE / 2, hubSumSize);

                        CopyCheckSumToBuf(ref sumDataBuf, hubBinCheckSum, BLOCK_SIZE / 2, hubSumSize);

                        // public key Area 1
                        System.Array.Copy(hubBinDataBuf, hubSumSize, sumDataBuf, BLOCK_SIZE - publicKeyOffset, publickeySize);
                    }
                }

                File.Exists(options.OutputFiles);

                options.OutputFiles = options.OutputFiles.Trim();

                File.WriteAllBytes(options.OutputFiles, sumDataBuf);

                Console.WriteLine("Write File Success\n");
            }
            return ret;
        }
        private static void ProcessPd(Options options, string fileType, string binChipType)
        {
            var config = InitializeConfig(options, fileType, binChipType);

            // 讀取 PD 檔案內容
            var pdData = ReadData(options.InputSignFiles, "PD file");

            if (pdData == null || pdData.Length == 0)
            {
                throw new Exception("Invalid PD data.");
            }

            // 複製 PD 資料生成 ROM
            var romData = ProcessPdData(pdData, config);

            // 輸出生成的 ROM 檔案
            WriteOutputFile(options.OutputFiles, romData);

        }
        private static byte[] ProcessPdData(byte[] pdData, RomConfig config)
        {

            // 獲取 PD 的 Code Size
            string chipType = string.Empty;
            int codeSize = GetHubCodeSize(pdData, 0, ref chipType);

            if (codeSize <= 0)
            {
                throw new Exception("Code Size is invalid.");
            }


            // 計算 ROM 的大小（Code Size 的兩倍）
            int romSize = codeSize * 2;

            // 創建 ROM 資料緩衝區
            var romData = new byte[romSize];

            // 將 PD 資料的有效部分複製到 ROM 的第一塊
            Array.Copy(pdData, 0, romData, 0, codeSize);

            // 將 PD 資料的有效部分複製到 ROM 的第二塊
            Array.Copy(pdData, 0, romData, codeSize, codeSize);

            return romData;
        }
        private static byte[] ReadData(string filePath, string fileDescription)
        {
            if (string.IsNullOrEmpty(filePath))
                throw new FileNotFoundException($"{fileDescription} path is null or empty.");

            if (!File.Exists(filePath))
                throw new FileNotFoundException($"{fileDescription} not found: {filePath}");

            // 讀取檔案內容
            byte[] fileData = File.ReadAllBytes(filePath);

            if (fileData.Length == 0)
                throw new ArgumentException($"{fileDescription} is empty: {filePath}");

            // 判斷 Code Size
            string chipType = string.Empty;
            int codeSize = GetHubCodeSize(fileData, 0, ref chipType);

            if (codeSize <= 0 || codeSize > fileData.Length)
            {
                throw new ArgumentException($"{fileDescription} has invalid Code Size: {codeSize} bytes.");
            }

            Logger.Info($"{fileDescription} loaded successfully. Code Size: {codeSize} bytes. Chip Type: {chipType}");

            // 返回有效 Code Size 部分的資料
            byte[] validData = new byte[codeSize];
            Array.Copy(fileData, 0, validData, 0, codeSize);

            return validData;
        }
        private static RomConfig InitializeConfig(Options options, string fileType, string binChipType)
        {
            try
            {
                // 防禦性檢查
                if (string.IsNullOrEmpty(options.CodeSignType))
                    throw new ArgumentException("CodeSignType is required.");
                // 初始化 RomConfig
                var config = new RomConfig
                {
                    TotalSize = CalculateTotalSize(options, fileType, binChipType),
                    PublicKeySize = DeterminePublicKeySize(options.CodeSignType),
                    ChipTypes = new string[10],
                    SumDataBuffer = new byte[CalculateTotalSize(options, fileType, binChipType)]

                };

                Logger.Info("Configuration initialized successfully.");
                return config;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error in InitializeConfig: {ex.Message}");
                throw; // 重新拋出例外以讓主流程捕捉
            }
        }
        private static string DetectFileType(string filePath, ref string binChipType)
        {
            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
            {
                throw new ArgumentException($"File not found or invalid: {filePath}");
            }

            // 讀取檔案內容
            byte[] hubBinDataBuf = File.ReadAllBytes(filePath);
            if (hubBinDataBuf.Length == 0)
            {
                throw new ArgumentException("Input file is empty.");
            }


            FW_TYPE eFwType = FW_TYPE.FW_TYPE_UNKNOWN;
            int offset = 0;

            // 獲取 Hub 的 Code Size 和 Chip Type
            int hubCodeSize = GetHubCodeSize(hubBinDataBuf, 0, ref binChipType);

            // 設定偏移量根據不同的 Chip Type 和 Code Size
            offset = CalculateOffset(binChipType, hubCodeSize, hubBinDataBuf.Length);

            // 使用 QuerySignature 檢測檔案類型
            if (QuerySignature(hubBinDataBuf, offset, ref eFwType) != ERROR_CODE.SUCCESS)
            {
                throw new ArgumentException("Failed to detect file type: Signature mismatch.");
            }

            // 返回檔案類型
            return MapFwTypeToFileType(eFwType);
        }
        private static int CalculateOffset(string binChipType, int hubCodeSize, int totalSize)
        {
            if ((binChipType.Contains(GLChipID.GLI7423.ToString())) ||
                      (binChipType.Contains(GLChipID.CYC7423.ToString())) ||
                      (binChipType.Contains(GLChipID.GLI7504.ToString())) ||
                      (binChipType.Contains(GLChipID.GLI7509.ToString())))

            {
                return totalSize > BLOCK_SIZE ? hubCodeSize : 0;
            }
            else if (binChipType.Contains(GLChipID.GLI7455.ToString()))
            {
                return totalSize > GL7455_HUB_LEN + GL7455_PD_LEN ? GL7455_HUB_LEN : 0;
            }
            else if (binChipType.Contains(GLChipID.GLI7441.ToString()) ||
                binChipType.Contains(GLChipID.GLI7394.ToString()) ||
                binChipType.Contains(GLChipID.GLI7466.ToString()))
            {
                return 0;
            }

            return 0; // 預設偏移為 0
        }
        private static int DeterminePublicKeySize(string codeSignType)
        {
            if (string.IsNullOrEmpty(codeSignType))
                throw new ArgumentException("CodeSignType is required.");

            return codeSignType.Contains(GLCODESIGNTPYE.RSA.ToString()) ? RSA_PUBLICKEY_LEN :
                   codeSignType.Contains(GLCODESIGNTPYE.ECDSA.ToString()) ? ECDSA_PUBLIC_KEY_LEN :
                   throw new ArgumentException("Unsupported CodeSignType.");
        }

        private static int CalculateTotalSize(Options options, string fileType, string binChipType)
        {
            int totalSize = RomConstants.BLOCK_SIZE * 2; // Default size




            if ((binChipType.Contains(GLChipID.GLI7455.ToString())))
            {
                totalSize = GL7455_HUB_LEN * 2 + GL7455_PD_LEN * 2 + DeterminePublicKeySize(options.CodeSignType);
            }

            switch (fileType)
            {
                case "HUB":
                case "PD":

                    break;
                case "HUB_HOSTBRIDGE":
                    totalSize = RomConstants.BLOCK_SIZE * 4;

                    break;

                default:
                    Logger.Error($"Unsupported file type: {fileType}");
                    return (int)ERROR_CODE.FILE_MISMATCH;
            }

            if (!string.IsNullOrEmpty(options.InputPdFiles))
            {
                totalSize += RomConstants.PD_DATA_SIZE;
            }
            return totalSize;
        }
        private static void WriteOutputFile(string outputFile, byte[] data)
        {
            try
            {
                if (string.IsNullOrEmpty(outputFile))
                    throw new ArgumentException("Output file path is required.");

                outputFile = outputFile.Trim();
                // 檢查並處理目錄部分
                string directory = Path.GetDirectoryName(outputFile);

                // 如果有目錄部分，檢查是否存在，若不存在則建立
                if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                // 將資料寫入檔案
                File.WriteAllBytes(outputFile, data);

                Console.WriteLine($"File written successfully to: {outputFile}");
            }
            catch (UnauthorizedAccessException)
            {
                throw new UnauthorizedAccessException($"Access to the file path '{outputFile}' is denied. Check your permissions.");
            }
            catch (IOException ex)
            {
                throw new IOException($"An I/O error occurred while writing to the file '{outputFile}': {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Unexpected error while writing to the file '{outputFile}': {ex.Message}");
            }
        }
```
