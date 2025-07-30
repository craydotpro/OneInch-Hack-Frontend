import BottomMenu from "./components/bottom_menu";
import Trade from "./modules/trade";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col border md:rounded-xl w-screen h-screen md:w-96 md:h-[70vh]">
        <div className="flex-grow flex justify-center">
          <Routes>
            <Route path="/" element={<Trade />} />
          </Routes>
        </div>
        <BottomMenu />
      </div>
    </div>
  );
}

export default App;
