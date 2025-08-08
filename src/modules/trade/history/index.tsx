import { useState } from "react";
import OpenOrders from "./open_order";
import Histories from "./history";

const HISTORY_TYPES = {
  OPEN_ORDER: "Open Orders",
  HISTORY: "History",
} as Record<string, string>;
const TradeHistory = () => {
  const [historyType, setHistoryType] = useState("OPEN_ORDER");
  return (
    <div className="flex flex-col h-full ">
      <div className="flex border-b">
        {Object.keys(HISTORY_TYPES).map((type) => (
          <button
            onClick={() => setHistoryType(type)}
            className={`px-8 text-xs capitalize border-b cursor-pointer py-2 ${
              historyType === type ? "border-b-black" : ""
            }`}
          >
            {HISTORY_TYPES[type]}
          </button>
        ))}
      </div>
      <div className="flex flex-col overflow-scroll">
        {historyType === "OPEN_ORDER" ? <OpenOrders /> : <Histories />}
      </div>
    </div>
  );
};
export default TradeHistory;
