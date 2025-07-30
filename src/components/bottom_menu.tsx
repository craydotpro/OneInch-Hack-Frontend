import { BriefcaseBusiness, LineChart, RefreshCcw } from "lucide-react";
import { NavLink } from "react-router-dom";

const MENU = [
  {
    title: "Markets",
    location: "/markets",
    icon: <LineChart size={18} />,
  },
  {
    title: "Trade",
    location: "/",
    icon: <RefreshCcw size={18} />,
  },
  {
    title: "portfolio",
    location: "/portfolio",
    icon: <BriefcaseBusiness size={18} />,
  },
];
const BottomMenu = () => {
  return (
    <div className="flex  w-full justify-between px-4 text-xs border-t">
      {MENU.map((menu) => (
        <NavLink
          to={menu.location}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-4 gap-1 ${
              !isActive ? "opacity-40" : ""
            }`
          }
        >
          {menu.icon}
          <p>{menu.title}</p>
        </NavLink>
      ))}
    </div>
  );
};
export default BottomMenu;
