import { API } from "../constants";
import signPaymentData from "../lib/sign_data";

class TradeService {
  Trade = async (type: "buy" | "sell", data: Record<string, any>) => {
    const {
      data: { result: payload },
    } = await API.post(`prepare-${type}`, data);

    const {
      signedApprovalData,
      signedOrder,
      signedLimitOrder,
      signedSltpOrder,
      signedSellOrder,
    } = await signPaymentData({
      crayOrder: payload?.typedOrder,
      allowanceData: payload?.approvalTypedData,
      limitOrderTypedData: payload?.limitOrderTypedData,
      sltpOrderTypedData: payload?.sltpOrderTypedData,
      sellTypedData: payload?.sellTypedData,
    });
    const { positionId, typedOrder } = payload;
    const body1 = {
      signedOrder:
        typedOrder &&
        typedOrder?.message.inputs.map(({ chainId }: { chainId: number }) => ({
          chainId: chainId,
          data: signedOrder,
        })), //[{ chainId: ChainId.BASE_CHAIN_ID, data: signedOrder }],
      signedApprovalData,
      signedLimitOrder: signedLimitOrder && [{ data: signedLimitOrder }],
      signedSltpOrder,
      signedSellOrder: signedSellOrder && [{ data: signedSellOrder }],
    };
    const result = await API.post(`submit/${positionId}`, body1);
    return result;
  };
}
const tradeService = new TradeService();
export default tradeService;
