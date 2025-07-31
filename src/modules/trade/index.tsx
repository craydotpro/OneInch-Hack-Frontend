import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Buy from "./buy";
import Sell from "./sell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount } from "wagmi";
import { prettifyAddress } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import balanceService from "../../services/balance";
import { useState } from "react";
import { ORDER_TYPES, TOKENS } from "../../constants";
const TradeHome = () => {
  const [orderType, setOrderType] = useState(() => ORDER_TYPES.market);
  const [token, setToken] = useState(TOKENS[0]);
  const { address } = useAccount();
  const balance = useQuery({
    queryKey: ["balance", address],
    queryFn: () => balanceService.GetAll(address!),
    enabled: !!address,
  });
  return (
    <div className="w-full  p-4 flex flex-col gap-4">
      <div className="flex border-b">
        {Object.keys(ORDER_TYPES).map((type) => (
          <button
            onClick={() => setOrderType(type)}
            className={`w-full capitalize border-b-2 cursor-pointer py-2 ${
              orderType === type ? "border-b-black" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <Tabs defaultValue="buy" className=" h-full">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Select value={token} onValueChange={setToken}>
              <SelectTrigger className="">
                <SelectValue placeholder={TOKENS[0]} />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.map((token) => (
                  <SelectItem value={token}>{token}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <TabsList>
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
          </div>
          {address ? (
            <button className=" font-bold text-gray-600">
              {prettifyAddress(address)}
            </button>
          ) : (
            <appkit-button />
          )}
        </div>
        <div className="mt-2 flex-grow">
          <Buy {...balance.data} token={token} orderType={orderType} />
          <Sell />
        </div>
      </Tabs>
    </div>
  );
};

export default TradeHome;
