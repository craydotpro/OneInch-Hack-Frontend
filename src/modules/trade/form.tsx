import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TabsContent } from "@/components/ui/tabs";
import { ORDER_TYPES } from "@/constants";
import { readableError } from "@/lib/utils";
import tradeService from "@/services/trade";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import TradeHistory from "./history";
import { queryClient } from "../../constants";
import SLTP from "./sltp";
import balanceService from "../../services/balance";
import { formatEther } from "viem";
const TradeForm = ({ token, orderType, type }: any) => {
  const { address } = useAccount();
  const usdcBalance = useQuery({
    queryKey: ["balance", address],
    queryFn: () => balanceService.GetAll(address!, "STABLE_COINS"),
    enabled: !!address,
  });
   const tradeTokenBalances = useQuery({
    queryKey: ["portfolio", address],
    queryFn: () => balanceService.GetAll(address!, "TRADING_COINS"),
    enabled: !!address,
  });
  const TOTAL_BALANCE = useMemo(()=>{
    if(! tradeTokenBalances.data||!usdcBalance.data) return 0
    if(type==='buy'){
      return usdcBalance.data?.aggregatedBalance
    }else{
      const currentToken = tradeTokenBalances.data?.balances.find((_:any)=>_.token===token)
      if(!currentToken) return 0
      return Number(formatEther(BigInt(currentToken.balance)))
    }
  },[type, tradeTokenBalances.data, usdcBalance.data, token])
  const [sltp, setSLTP] = useState({
    isActive: false,
    slTriggerPrice: 0,
    tpTriggerPrice: 0,
  });
  const [size, setSize] = useState<number>();
  const [triggerPrice, setTriggerPrice] = useState<number>();
  const handleSliderChange = (value: number | number[]) => {
    if (!Array.isArray(value)) value = [value];
    setSize((TOTAL_BALANCE * value[0]) / 100);
  };
  const tradeMutation = useMutation({
    mutationFn: () =>
      tradeService.Trade(type, {
        userAddress: address,
        ...(type === 'buy'
          ? {
              toToken: token,
              amountInUSD: String(size)
            }
          : {
              sellingToken: token,
              amountInToken: String(size)
            }),
        type: orderType,
        amountInUSD: String(size),
        ...(orderType === ORDER_TYPES.limit && {
          triggerPrice
        }),
        advanceSLTP: {
          sl: { price: sltp.slTriggerPrice },
          tp: { price: sltp.tpTriggerPrice },
        },
      }),
      onSuccess:()=>{
        queryClient.invalidateQueries({
          queryKey: ["balance", address]
        })
        queryClient.invalidateQueries({
          queryKey: ["portfolio", address]
        })
        queryClient.invalidateQueries({
          queryKey: ["open_orders", address],
        })
         queryClient.invalidateQueries({
          queryKey: ["histories", address],
        })
        toast("Position submitted successfully")
      },
    onError: (error: any) => {
      toast(readableError(error))
    }
  })

  const availableToTrade = useMemo(()=>{
    if(type==='buy'){
      return `Available to Trade: $${TOTAL_BALANCE?.toFixed(3)}`
    }else{
      return `Available to Trade: ${TOTAL_BALANCE?.toFixed(10)}`
    }
  },[TOTAL_BALANCE])
  return (
    <TabsContent value={type} className="flex flex-col gap-4 h-full">
      {orderType === ORDER_TYPES.limit ? (
        <Input
          type="text"
          label={`Trigger Price (USDC)`}
          id="size"
          placeholder="Trigger Price"
          onChange={(e: any) => setTriggerPrice(e.target.value)}
          value={triggerPrice?.toFixed?.(2)}
        />
      ) : null}
      <Input
        type="text"
        label={availableToTrade}
        id="size"
        placeholder="Size"
        onChange={(e: any) => setSize(e.target.value)}
        value={size?.toFixed?.(2)}
      />
      <div className="flex gap-4">
        <Slider
          onValueChange={handleSliderChange}
          value={[(100 / TOTAL_BALANCE) * size!]}
          defaultValue={[33]}
          max={100}
          step={1}
          min={0}
        />
        <div className="relative">
          <Input
            id="size"
            placeholder="0"
            onChange={(e: any) => handleSliderChange(Number(e.target.value))}
            value={size ? ((100 / TOTAL_BALANCE) * size!).toFixed(0) : ""}
            max={TOTAL_BALANCE}
            min={0}
            className="w-22 after:absolute "
          />
          <span className="absolute top-1/2 -translate-1/2 right-1 text-gray-500">
            %
          </span>
        </div>
      </div>
      <SLTP sltp={sltp} setSLTP={setSLTP} />
      <Button
        onClick={() => tradeMutation.mutate()}
        isLoading={tradeMutation.isPending}
        className=" capitalize"
      >
        {type}
      </Button>
      <TradeHistory />
    </TabsContent>
  );
};
export default TradeForm;
