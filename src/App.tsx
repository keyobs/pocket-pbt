import "./App.css";
import AllTimersActionsBar from "./components/allCountersActions/AllCountersActions";
import TimeProvider from "./components/allCountersActions/AllCountersActionsContext";
import Timers from "./timers/Timers";

function App() {
  return (
    <div id="app-container" className="container">
      <TimeProvider>
        <Timers />
        <AllTimersActionsBar />
      </TimeProvider>
    </div>
  );
}

export default App;
