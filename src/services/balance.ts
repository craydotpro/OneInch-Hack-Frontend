import { formatUnits } from "viem";
import { API } from "../constants";

class BalanceService {
  GetAll = async (walletAddress: string) => {
    const { data: balances } = await API.get(`balance/${walletAddress}`);
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
