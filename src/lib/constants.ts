// 1mb limit for logo upload
export const logoMaxSize = 1 * 1024 * 1024;

// items per page for pagination
export const ITEMS_PER_PAGE = 10;

// items per batch for calendar view
export const ITEMS_PER_MONTH = 25;

// allowed social platforms to share
export const allowedSocialDomains = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "tiktok.com",
  "youtube.com",
];

// blocked TLDs for link submission (temporary)
export const blockedTLDS = [
  "accountant",
  "bid",
  "click",
  "country",
  "date",
  "download",
  "faith",
  "gdn",
  "loan",
  "men",
  "party",
  "pro",
  "racing",
  "review",
  "science",
  "stream",
  "top",
  "trade",
  "work",
  "xyz",
  "cf",
  "ga",
  "gq",
  "ml",
  "tk",
  "cam",
  "casino",
  "crypto",
  "shop",
  "site",
  "vip",
  "win",
  "exe",
];

// blocked extensions for link submission (temporary)
export const blockedExtensions = [
  ".exe",
  ".bat",
  ".cmd",
  ".sh",
  ".msi",
  ".jar",
  ".scr",
  ".vbs",
  ".ps1",
  ".apk",
];

// blocked keywords in searchparams for link submission (temporary)
export const suspiciousKeywords = [
  "download",
  "dl",
  "file",
  "attachment",
  "get",
  "setup",
  "install",
];

// constants for target age
export const START_AGE = 5;
export const AGE_RANGE = 18;
export const CURRENT_YEAR = new Date().getFullYear();
