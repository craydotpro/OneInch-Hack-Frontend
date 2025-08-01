import { formatUnits } from "viem";
import { API } from "../constants";

class BalanceService {
  GetAll = async (
    walletAddress: string,
    type: "TRADING_COINS" | "STABLE_COINS"
  ) => {
    const { data: balances } = await API.get(
      `balance/${walletAddress}/${type}`
    );
    const aggregatedBalance = balances.reduce((sum: number, token: any) => {
      const balance = formatUnits(
        token.wallets[walletAddress].balance,
        token.decimals
      );
      return sum + Number(balance);
    }, 0);
    return {
      balances,
      aggregatedBalance,
    };
  };
}
const balanceService = new BalanceService();
export default balanceService;
