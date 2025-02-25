"use server";

import { validCurrencyCodesSet } from "@/lib/countries";

export const getExchangeRate = async (from: string) => {
  const API_KEY = process.env.EXCHANGERATE_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_EXCHANGERATE_URL;

  if (!API_KEY || !BASE_URL) {
    console.error("No API key or URL found!");
    return null;
  }

  if (from === "KPW" || !validCurrencyCodesSet.has(from)) {
    console.error("Unsupported currency");
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/EUR`);

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

export const convertCostToEuro = async (
  cost_estimate: number,
  cost_currency: string
) => {
  let cost_estimate_eur = cost_estimate;

  if (cost_currency === "EUR") {
    return cost_estimate_eur;
  }

  const exchangeRate = await getExchangeRate(cost_currency);

  if (exchangeRate) {
    cost_estimate_eur = Math.round(cost_estimate * exchangeRate);
  } else {
    console.error("Error fetching exchange rate, cannot store converted value");
  }

  return cost_estimate_eur;
};
