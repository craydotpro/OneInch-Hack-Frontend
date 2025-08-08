import { useQuery } from "@tanstack/react-query";
import insightService from "../../../services/insight";
import { useAccount } from "wagmi";

const TradeHistory = () => {
  const { address } = useAccount();
  const histories = useQuery({
    queryKey: ["histories", address],
    queryFn: () => insightService.GetTradeHistory(address!),
    enabled: !!address,
  });
  return (
    <>
      <div className="grid grid-cols-4 font-bold text-xs py-2 text-center text-gray-500 sticky top-0 bg-white">
        <div>Type</div>
        <div>Token</div>
        <div>Quantity</div>
        <div>Amount</div>
      </div>
      {histories.data?.map((data: any) => (
        <div className="grid grid-cols-4 font-bold text-xs py-2 text-center text-gray-500">
          <div>{data.side}</div>
          <div>{data.token || "-"}</div>
          <div>{data.qty}</div>
          <div>{data.amount}</div>
        </div>
      ))}
    </>
  );
};
export default TradeHistory;
