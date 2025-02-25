"use server";

import { validCurrencyCodesSet } from "@/lib/countries";

export const getExchangeRate = async (from: string, to: string = "EUR") => {
  const API_KEY = process.env.EXCHANGE_API_KEY;
  const BASE_URL = process.env.EXCHANGERATE_URL;

  if (!API_KEY || !BASE_URL) {
    console.error("No API key or URL found!");
    return null;
  }

  if (from === "KPW" || !validCurrencyCodesSet.has(from)) {
    console.error("Unsupported currency");
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/${to}`);

    if (!response.ok) {
      throw new Error("Exchange rate response not ok");
    }

    const data = await response.json();

    if (!data || typeof data.conversion_rate !== "number") {
      throw new Error("Unexpected response structure");
    }

    return data.conversion_rate;
  } catch (error) {
    console.error("Error fetching exchange rate: ", error);
    return null;
  }
};
