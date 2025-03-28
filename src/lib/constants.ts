// 1mb limit for logo upload
export const IMG_MAX_SIZE = 1 * 1024 * 1024;

// items per page for pagination
export const ITEMS_PER_PAGE = 10;

// items per batch for calendar view
export const ITEMS_PER_MONTH = 25;

// items per batch for map view
export const ITEMS_ON_MAP = 50;

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

// months and years for calendar navigation
export const MONTHS = [
  {
    name: "January",
    number: 0,
  },
  {
    name: "February",
    number: 1,
  },
  {
    name: "March",
    number: 2,
  },
  {
    name: "April",
    number: 3,
  },
  {
    name: "May",
    number: 4,
  },
  {
    name: "June",
    number: 5,
  },
  {
    name: "July",
    number: 6,
  },
  {
    name: "August",
    number: 7,
  },
  {
    name: "September",
    number: 8,
  },
  {
    name: "October",
    number: 9,
  },
  {
    name: "November",
    number: 10,
  },
  {
    name: "December",
    number: 11,
  },
];

export const mapStartCoords = {
  center: { lat: 50.76438662690668, lng: 5.302024181510556 },
  bounds: {
    east: 12.146506333616388,
    north: 54.62309477257084,
    south: 46.55899848476438,
    west: -1.5424579705952568,
  },
};
