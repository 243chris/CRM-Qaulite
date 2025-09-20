import axios from 'axios';

const DEFAULT_RATES = {
  USD: 1,
  EUR: 0.92,
  FC: 2500,
};

export async function getRates() {
  try {
    // Placeholder for real API. Fallback to defaults.
    return DEFAULT_RATES;
  } catch (e) {
    return DEFAULT_RATES;
  }
}

export async function convertAmount(amount, from, to) {
  const rates = await getRates();
  const baseUsd = Number(amount) / Number(rates[from] || 1);
  return baseUsd * Number(rates[to] || 1);
}

