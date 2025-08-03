import BottomMenu from "./components/bottom_menu";
import Portfolio from "./modules/portfolio";
import Trade from "./modules/trade";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col border md:rounded-xl w-screen h-screen md:w-[500px] md:h-[80vh]">
        <div className="flex-grow flex justify-center">
          <Routes>
            <Route path="/" element={<Trade />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
        <BottomMenu />
      </div>
    </div>
  );
}

export default App;
