import "./App.css";
import { TimeProvider } from "@components/globalTimeAction/time";
import BottomBar from "@features/bottomBar/BottomBar";
import { SettingsMenuProvider } from "@features/menu/settings/context/SettingsMenuProvider";
import PenaltyTimers from "@features/penaltyTimers/PenaltyTimers";
import { TeamColorProvider } from "@features/menu/teamsColor/context/TeamsColorProvider";
import { useWakeLock } from "@hooks/useWakeLock";

function App() {
  useWakeLock(true);

  return (
    <div id="app-container" className="container">
      <SettingsMenuProvider>
        <TeamColorProvider>
          <TimeProvider>
            <div id="app-content" role="main">
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
