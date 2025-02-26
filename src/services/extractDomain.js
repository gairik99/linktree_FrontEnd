export const extractDomain = (url) => {
  try {
    // Add protocol if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, ""); // Remove www prefix

    // Domain matching logic
    if (/(^|\.)facebook\.com$/i.test(hostname)) {
      return "facebook";
    } else if (/(^|\.)instagram\.com$/i.test(hostname)) {
      return "instagram";
    } else if (/(^|\.)(youtube\.com|youtu\.be)$/i.test(hostname)) {
      return "youtube";
    } else if (/(^|\.)(twitter\.com|x\.com)$/i.test(hostname)) {
      return "x";
    } else if (/(^|\.)amazon\./i.test(hostname)) {
      // Matches any Amazon domain (amazon.com, amazon.in, etc.)
      return "amazon";
    } else if (/(^|\.)flipkart\.com$/i.test(hostname)) {
      return "flipkart";
    } else if (/(^|\.)myntra\.com$/i.test(hostname)) {
      return "myntra";
    }

    return "other";
  } catch (error) {
    console.error("Invalid URL:", error);
    return "other";
  }
};
