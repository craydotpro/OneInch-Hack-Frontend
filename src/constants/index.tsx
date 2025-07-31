import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { base } from "viem/chains";
export const queryClient = new QueryClient();
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_HOST + "/api/",
});
export const TOKENS = ["WBTC", "ETH", "POL"];
export const CHAINS = {
  [base.id]: base,
} as Record<number, typeof base>;
export const ORDER_TYPES = {
  market: "market",
  limit: "limit",
};
