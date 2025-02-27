import {
  allowedSocialDomains,
  blockedExtensions,
  blockedTLDS,
  suspiciousKeywords,
} from "./constants";

export const isValidSocialLink = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    // ensure correct protocol
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return false;
    }

    return allowedSocialDomains.some(
      (domain) =>
        parsedUrl.hostname === domain ||
        parsedUrl.hostname.endsWith(`.${domain}`)
    );
  } catch (error) {
    console.error("Failed to validate social link: ", error);
    return false;
  }
};

export const isValidEventLink = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    // ensure correct protocol
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return false;
    }

    // check suspicious TLD
    const tld = parsedUrl.hostname.split(".").pop()?.toLowerCase();
    if (tld && blockedTLDS.includes(tld)) {
      return false;
    }

    // check suspicious extensions
    if (blockedExtensions.some((ext) => parsedUrl.pathname.endsWith(ext))) {
      return false;
    }

    // check for suspicious keywords and values (file=file.exe)
    for (const [key, value] of parsedUrl.searchParams.entries()) {
      if (
        suspiciousKeywords.some((keyword) =>
          key.toLowerCase().includes(keyword)
        ) &&
        blockedExtensions.some((ext) => value.toLowerCase().endsWith(ext))
      ) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Failed to validate event link: ", error);
    return false;
  }
};
