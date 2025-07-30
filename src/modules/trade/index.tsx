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
const TradeHome = () => {
  return (
    <div className="w-full  p-4 flex flex-col gap-4">
      <Tabs defaultValue="buy" className="">
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <TabsList>
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
        </div>
        <div className="mt-2">
          <Buy />
          <Sell />
        </div>
      </Tabs>
    </div>
  );
};

export default TradeHome;
