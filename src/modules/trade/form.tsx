import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TabsContent } from "@/components/ui/tabs";
import { ORDER_TYPES } from "@/constants";
import { readableError } from "@/lib/utils";
import tradeService from "@/services/trade";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
const TradeForm = ({ aggregatedBalance, token, orderType, type }: any) => {
  const { address } = useAccount();
  const TOTAL_BALANCE = aggregatedBalance || 0;
  const [size, setSize] = useState<number>();
  const [triggerPrice, setTriggerPrice] = useState<number>();
  const handleSliderChange = (value: number | number[]) => {
    if (!Array.isArray(value)) value = [value];
    setSize((TOTAL_BALANCE * value[0]) / 100);
  };
  const slTriggerPrice = 1211; // @ahmad: todo
  const tpTriggerPrice = 3511;
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
          sl: { price: slTriggerPrice },
          tp: { price: tpTriggerPrice }
        }
      }),
    onError: (error: any) => {
      toast(readableError(error))
    }
  })

  return (
    <TabsContent value={type} className="flex flex-col gap-4 h-full">
      <div className="flex-grow h-full flex flex-col gap-4">
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
          label={`Available to Trade: $${TOTAL_BALANCE?.toFixed(3)}`}
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
      </div>
      <Button
        onClick={() => tradeMutation.mutate()}
        isLoading={tradeMutation.isPending}
        className=" capitalize"
      >
        {type}
      </Button>
    </TabsContent>
  );
};
export default TradeForm;
