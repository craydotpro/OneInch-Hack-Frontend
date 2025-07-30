import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const Buy = () => {
  const TOTAL_BALANCE = 120;
  const [size, setSize] = useState<number>();
  const handleSliderChange = (value: number | number[]) => {
    if (!Array.isArray(value)) value = [value];
    setSize((TOTAL_BALANCE * value[0]) / 100);
  };
  return (
    <TabsContent value="buy" className="flex flex-col gap-4">
      total Balance {TOTAL_BALANCE}$
      <Input
        type="number"
        label="size"
        id="size"
        placeholder="Size"
        onChange={(e: any) => setSize(Number(e.target.value))}
        value={size}
        max={TOTAL_BALANCE}
        min={0}
      />
      <div className="flex gap-4">
        <Slider
          onValueChange={handleSliderChange}
          value={[(100 / TOTAL_BALANCE) * size!]}
          defaultValue={[33]}
          max={100}
          step={1}
        />
        <div className="relative">
          <Input
            type="number"
            id="size"
            placeholder="Size"
            onChange={(e: any) => handleSliderChange(Number(e.target.value))}
            value={((100 / TOTAL_BALANCE) * size!).toFixed(2)}
            max={TOTAL_BALANCE}
            min={0}
            className="w-22 after:absolute "
          />
          <span className="absolute top-1/2 -translate-1/2 right-1 text-gray-500">
            %
          </span>
        </div>
      </div>
    </TabsContent>
  );
};
export default Buy;
