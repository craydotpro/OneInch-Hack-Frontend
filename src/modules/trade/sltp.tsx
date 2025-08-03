
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
const SLTP = ({ sltp, setSLTP }: any) => {
  return (
    <div className="flex items-center gap-24">
      <Label>
        <Checkbox
          id="sltp"
          checked={sltp.isActive}
          onCheckedChange={() =>
            setSLTP((state: any) => ({ ...state, isActive: !state.isActive }))
          }
        />{" "}
        SLTP
      </Label>
      <div
        className={`flex items-center justify-center gap-4 ${
          !sltp.isActive ? "opacity-40" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <p>SL </p>
          <Input placeholder="SL" disabled={!sltp.isActive} />
        </div>
        <div className="flex items-center gap-2">
          <p>TP </p>
          <Input placeholder="SL" disabled={!sltp.isActive} />
        </div>
      </div>
    </div>
  );
  return (
    <Popover>
      <PopoverTrigger>
        TP: {}, SL: {}
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
export default SLTP;
