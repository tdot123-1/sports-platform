import { allowedSocialDomains } from "./constants";

export const isValidSocialLink = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return allowedSocialDomains.some((domain) =>
      parsedUrl.hostname.includes(domain)
    );
  } catch (error) {
    console.error("Failed to validate social link: ", error);
    return false;
  }
};
