import { API } from "../constants";

class InsightService {
  GetOpenOrders = async (walletAddress: string) => {
    const { data } = await API.get(`insight/open-orders/${walletAddress}`);
    return data;
  };
  GetTradeHistory = async (walletAddress: string) => {
    const { data } = await API.get(`insight/trade-history/${walletAddress}`);
    return data;
  };
}
const insightService = new InsightService();
export default insightService;
