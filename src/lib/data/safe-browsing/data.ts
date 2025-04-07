"use server";

interface URLsToCheck {
  contact_url?: string;
  event_link?: string;
}

export const validateURLs = async (urlsToCheck: URLsToCheck) => {
  // start with empty object
  const validUrls: URLsToCheck = {};

  // check if URLs were formatted correctly
  try {
    if (urlsToCheck.contact_url) {
      new URL(urlsToCheck.contact_url);
      validUrls.contact_url = urlsToCheck.contact_url;
    }
    if (urlsToCheck.event_link) {
      new URL(urlsToCheck.event_link);
      validUrls.event_link = urlsToCheck.event_link;
    }
  } catch (error) {
    console.error("Incorrectly formatted URL: ", error);
    return null;
  }

  if (!validUrls.contact_url && !validUrls.event_link) {
    console.error("Both URLs were not properly formatted or missing");
    return null;
  }

  const API_KEY = process.env.SAFE_BROWSING_KEY;

  if (!API_KEY) {
    console.error("API KEY MISSING!");
    return null;
  }

  // construct array of submitted URLs
  const threatEntries: string[] = [];

  if (validUrls.contact_url) {
    threatEntries.push(validUrls.contact_url);
  }

  if (validUrls.event_link) {
    threatEntries.push(validUrls.event_link);
  }

  if (threatEntries.length === 0) {
    console.error("No threat entries added");
    return null;
  }

  const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

  // safe browsing API
  const requestBody = {
    client: {
      clientId: "sports-platform",
      clientVersion: "1.5.2",
    },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION",
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: threatEntries.map((url) => ({
        url,
      })),
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error("API response not OK: ", response);
      return null;
    }

    const data = await response.json();

    // find threats (?)
    if (data.matches) {
      const blockedURLs: string[] = [];

      data.matches.forEach((match: any) => {
        // log reasons
        console.log("Blocked URL: ", match.threat.url);
        console.log("Reason: ", match.threatType);

        // push blocked urls into array
        blockedURLs.push(match.threat.url);
      });

      // check which URL was blocked
      if (
        validUrls.contact_url &&
        blockedURLs.includes(validUrls.contact_url)
      ) {
        delete validUrls.contact_url;
      }

      if (validUrls.event_link && blockedURLs.includes(validUrls.event_link)) {
        delete validUrls.event_link;
      }
    } else {
      console.log("All URLs safe.");
    }
    // return URLs that were not a threat
    return validUrls;
  } catch (error) {
    console.error("Unexpected error checking URLs: ", error);
    return null;
  }
};
