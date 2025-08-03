import { useQuery } from "@tanstack/react-query";
import { Label } from "../../components/ui/label";
import { useAccount } from "wagmi";
import balanceService from "../../services/balance";
import { formatUnits } from "viem";


const Portfolio = () => {
  const { address } = useAccount();
  const balance = useQuery({
    queryKey: ["balance", address],
    queryFn: () => balanceService.GetAll(address!, "STABLE_COINS"),
    enabled: !!address,
  });
  const portfolio = useQuery({
    queryKey: ["portfolio", address],
    queryFn: () => balanceService.GetAll(address!, "TRADING_COINS"),
    enabled: !!address,
  });
  return (
    <div className="flex flex-col w-full p-4">
      <div>
        <Label className="font-bold ">Balance</Label>
        <div className="flex gap-1 items-end">
          <p className="font-bold text-2xl ">
            ${balance.data?.aggregatedBalance || "-"}
          </p>
          <span className="text-xs leading-6">USDC</span>
        </div>
      </div>
      <div className="flex flex-col mt-4 border-t divide-y">
        {
          portfolio.data?.balances?.map((asset:any)=>(
            <div className="py-3">
              <div className=" flex justify-between items-center font-bold">
                <div className=" flex items-center">
                  <img src={asset.logoURI} className="w-10"/>
                  <p className="font-bold">{asset.name}</p>
                </div>
                {/**@ts-ignore */}
                <div>{Number(formatUnits(asset.balance,asset.decimals)).toFixed(5)}</div>
              </div>
              <div className=" flex justify-between items-center ml-10 text-gray-500">
                <div>{asset.symbol}</div>
                <div>${(Number(formatUnits(asset.balance,asset.decimals))*Number(asset.price)).toFixed(3)}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default Portfolio;
