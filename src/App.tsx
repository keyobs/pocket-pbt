import "./App.css";
import AllTimersActionsBar from "./components/allCountersActions/AllCountersActions";
import { TimeProvider } from "./components/allCountersActions/time";
import PenaltyTimers from "./feat/penaltyTimers/PenaltyTimers";
import TeamsColorManager from "./feat/teamsColor/TeamsColorManager";
import { TeamColorProvider } from "./feat/teamsColor/context/TeamsColorProvider";

function App() {
  return (
    <div id="app-container" className="container">
      <TeamColorProvider>
        <TeamsColorManager />
        <TimeProvider>
          <PenaltyTimers />
          <AllTimersActionsBar />
        </TimeProvider>
      </TeamColorProvider>
    </div>
  );
}

export default App;
