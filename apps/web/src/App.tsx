import "./App.css";
import { TimeProvider } from "@components/globalTimeAction/time";
import BottomBar from "@features/bottomBar/BottomBar";
import { SettingsMenuProvider } from "@features/menu/settings/context/SettingsMenuProvider";
import PenaltyTimers from "@features/penaltyTimers/PenaltyTimers";
import { TeamColorProvider } from "@features/menu/teamsColor/context/TeamsColorProvider";
import { useWakeLock } from "@core/hooks/useWakeLock";

function App() {
  useWakeLock(true);

  return (
    <div id="app-container" className="container">
      <SettingsMenuProvider>
        <TeamColorProvider>
          <TimeProvider>
            <main id="app-content">
              <PenaltyTimers />
              <BottomBar />
            </main>
          </TimeProvider>
        </TeamColorProvider>
      </SettingsMenuProvider>
    </div>
  );
}

export default App;
