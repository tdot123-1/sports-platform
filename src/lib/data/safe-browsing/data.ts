"use server";

interface URLsToCheck {
  contact_url?: string | null;
  event_link?: string | null;
}

export const validateURLs = async (urlsToCheck: URLsToCheck) => {
  // check if any links were submitted
  if (!urlsToCheck.contact_url && !urlsToCheck.event_link) {
    return { success: true, checkedUrls: urlsToCheck };
  }

  const threatEntries: string[] = [];

  // check if URLs were formatted correctly
  try {
    if (urlsToCheck.contact_url) {
      new URL(urlsToCheck.contact_url);
      threatEntries.push(urlsToCheck.contact_url);
    }
    if (urlsToCheck.event_link) {
      new URL(urlsToCheck.event_link);
      threatEntries.push(urlsToCheck.event_link);
    }
  } catch (error) {
    console.error("Incorrectly formatted URL: ", error);
    return null;
  }

  if (threatEntries.length === 0) {
    console.error("No threat entries added");
    return { success: true, checkedUrls: urlsToCheck };
  }

  const API_KEY = process.env.SAFE_BROWSING_KEY;

  if (!API_KEY) {
    console.error("API KEY MISSING!");
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

    // find threats
    if (data.matches) {
      const blockedURLs: string[] = [];

      data.matches.forEach((match: any) => {
        // log reasons
        console.log("Blocked URL: ", match.threat.url);
        console.log("Reason: ", match.threatType);

        // push blocked urls into array
        blockedURLs.push(match.threat.url);
      });

      // check which URL was blocked (?)
      if (
        urlsToCheck.contact_url &&
        blockedURLs.includes(urlsToCheck.contact_url)
      ) {
        urlsToCheck.contact_url = "blocked";
      }

      if (
        urlsToCheck.event_link &&
        blockedURLs.includes(urlsToCheck.event_link)
      ) {
        urlsToCheck.event_link = "blocked";
      }

      return { success: false, checkedUrls: urlsToCheck };
    } else {
      console.log("All URLs safe.");
    }
    // return URLs that were not a threat
    return { success: true, checkedUrls: urlsToCheck };
  } catch (error) {
    console.error("Unexpected error checking URLs: ", error);
    return null;
  }
};
