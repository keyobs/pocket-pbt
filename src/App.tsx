import "./App.css";
import AllTimersActionsBar from "./components/allCountersActions/AllCountersActions";
import { TimeProvider } from "./components/allCountersActions/time";
import PenaltyTimers from "./feat/penaltyTimers/PenaltyTimers";
import TeamBackgroundColor from "./feat/teamBackgroundColor/TeamBackgroundColor";

function App() {
  return (
    <div id="app-container" className="container">
      <TeamBackgroundColor />
      <TimeProvider>
        <PenaltyTimers />
        <AllTimersActionsBar />
      </TimeProvider>
    </div>
  );
}

export default App;
