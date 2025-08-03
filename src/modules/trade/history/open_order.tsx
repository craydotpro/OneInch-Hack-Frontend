import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import insightService from "../../../services/insight";

const OpenOrders = () => {
  const { address } = useAccount();
  const openOrders = useQuery({
    queryKey: ["open_orders", address],
    queryFn: () => insightService.GetOpenOrders(address!),
    enabled: !!address,
  });
  return (
    <>
      <div className="grid grid-cols-3 font-bold text-xs py-2 text-center text-gray-500 sticky top-0 bg-white">
        <div>Type</div>
        {/* <div>Token</div> */}
        <div>You Pay</div>
        <div>You Receive</div>
      </div>
      {openOrders.data?.map((data: any) => (
        <div className="grid grid-cols-3 font-bold text-xs py-2 text-center text-gray-500">
          <div>{data.OrderType}</div>
          {/* <div>{data.token || "-"}</div> */}
          <div>{data.youPay}</div>
          <div>{data.youReceive}</div>
        </div>
      ))}
    </>
  );
};
export default OpenOrders;
