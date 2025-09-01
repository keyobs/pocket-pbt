import "./App.css";
import { TimeProvider } from "./components/allCountersActions/time";
import BottomBar from "./feat/bottomBar/BottomBar";
import PenaltyTimers from "./feat/penaltyTimers/PenaltyTimers";
import { TeamColorProvider } from "./feat/teamsColor/context/TeamsColorProvider";

function App() {
  return (
    <div id="app-container" className="container">
      <TeamColorProvider>
        <TimeProvider>
          <div id="app-content">
            <PenaltyTimers />
            <BottomBar />
          </div>
        </TimeProvider>
      </TeamColorProvider>
    </div>
  );
}

export default App;
