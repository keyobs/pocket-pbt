import "./App.css";
import AllTimersActionsBar from "./components/allCountersActions/AllCountersActions";
import TimeProvider from "./components/allCountersActions/AllCountersActionsContext";
import PenaltyTimers from "./feat/penaltyTimers/PenaltyTimers";

function App() {
  return (
    <div id="app-container" className="container">
      <TimeProvider>
        <PenaltyTimers />
        <AllTimersActionsBar />
      </TimeProvider>
    </div>
  );
}

export default App;
