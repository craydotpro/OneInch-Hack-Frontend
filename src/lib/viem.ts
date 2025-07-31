import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  publicActions,
} from "viem";
import { base } from "viem/chains";

export const publicClient = createPublicClient({
  chain: base,
  transport: http("http://localhost:5050/"),
});
export const getWalletClient = async (chain?: typeof base) => {
  const [account] = await (window.ethereum as any).request({
    method: "eth_requestAccounts",
  });

  const ethereum = (window as any).ethereum;
  return createWalletClient({
    account,
    chain,
    transport: ethereum ? custom(ethereum) : http(),
  }).extend(publicActions);
};
