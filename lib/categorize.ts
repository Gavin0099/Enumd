// Maps page titles / section headings to VitePress doc category folders
// Order matters: first match wins

const RULES: { patterns: RegExp[]; category: string }[] = [
  {
    patterns: [/driver/i, /驅動/],
    category: "driver",
  },
  {
    patterns: [/code.?sign/i, /code sign/i, /etoken/i, /ecdsa/i, /ecc.?key/i, /mbedtls/i, /rsa/i, /簽章/, /簽署/, /code sign/],
    category: "code-sign",
  },
  {
    patterns: [/\bmac\b/i, /xcode/i, /macos/i, /apple/i, /oci/i, /bundle.?id/i],
    category: "mac",
  },
  {
    patterns: [/monitor/i, /scaler/i, /mtk/i, /rtk/i, /realtek/i, /hp.*monitor/i, /lenovo.*monitor/i, /asus.*monitor/i, /顯示器/, /螢幕/],
    category: "monitor",
  },
  {
    patterns: [/hub/i, /usb.*hub/i, /gl35/i, /gl39/i, /gl75/i],
    category: "hub",
  },
];

const DEFAULT_CATEGORY = "general";

export function categorize(title: string): string {
  for (const { patterns, category } of RULES) {
    if (patterns.some((p) => p.test(title))) {
      return category;
    }
  }
  return DEFAULT_CATEGORY;
}

export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
