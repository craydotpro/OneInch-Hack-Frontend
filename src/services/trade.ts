import { API } from "../constants";
import signPaymentData from "../lib/sign_data";

class TradeService {
  Buy = async (data: Record<string, any>) => {
    let {
      data: { result: payload },
    } = await API.post(`prepare-buy`, data);

    const { signedApprovalData, signedOrder } = await signPaymentData(
      payload.typedOrder,
      payload.allowance
    );
    const { positionId, typedOrder } = payload;
    const body1 = {
      signedOrder: typedOrder.message.inputs.map(
        ({ chainId }: { chainId: number }) => ({
          chainId: chainId,
          data: signedOrder,
        })
      ), //[{ chainId: ChainId.BASE_CHAIN_ID, data: signedOrder }],
      signedApprovalData,
    };
    const result = await API.post(`submit/${positionId}`, body1);
    return result;
  };
}
const tradeService = new TradeService();
export default tradeService;
