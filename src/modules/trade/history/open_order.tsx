import { useQuery } from "@tanstack/react-query";
import insightService from "../../../services/insight";
import { useAccount } from "wagmi";

const OpenOrders = () => {
  const { address } = useAccount();
  const openOrders = useQuery({
    queryKey: ["open_orders", address],
    queryFn: () => insightService.GetOpenOrders(address!),
    enabled: !!address,
  });
  return (
    <>
      <div className="grid grid-cols-4 font-bold text-xs py-2 text-center text-gray-500 sticky top-0 bg-white">
        <div>Type</div>
        <div>Token</div>
        <div>Price</div>
        <div>Amount</div>
      </div>
      {openOrders.data?.map((data: any) => (
        <div className="grid grid-cols-4 font-bold text-xs py-2 text-center text-gray-500">
          <div>{data.OrderType}</div>
          <div>{data.token || "-"}</div>
          <div>{data.price}</div>
          <div>{data.amount}</div>
        </div>
      ))}
    </>
  );
};
export default OpenOrders;
