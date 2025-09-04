import "./App.css";
import { TimeProvider } from "@components/allCountersActions/time";
import BottomBar from "@features/bottomBar/BottomBar";
import PenaltyTimers from "@features/penaltyTimers/PenaltyTimers";
import { TeamColorProvider } from "@features/teamsColor/context/TeamsColorProvider";

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
