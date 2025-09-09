import "./App.css";
import { TimeProvider } from "@components/globalTimeAction/time";
import BottomBar from "@features/bottomBar/BottomBar";
import { SettingsMenuProvider } from "@features/menu/context/SettingsMenuProvider";
import PenaltyTimers from "@features/penaltyTimers/PenaltyTimers";
import { TeamColorProvider } from "@features/teamsColor/context/TeamsColorProvider";

function App() {
  return (
    <div id="app-container" className="container">
      <SettingsMenuProvider>
        <TeamColorProvider>
          <TimeProvider>
            <div id="app-content">
              <PenaltyTimers />
              <BottomBar />
            </div>
          </TimeProvider>
        </TeamColorProvider>
      </SettingsMenuProvider>
    </div>
  );
}

export default App;
