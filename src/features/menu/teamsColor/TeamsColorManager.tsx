import "./teamsColorManager.less";
import { useState } from "react";
import { Settings } from "react-feather";
import MenuButton from "@components/buttons/menuButton/MenuButton";
import ColorsList from "./colorsList/ColorsList";

const TeamsColorManager = () => {
  const [settingsMode, setSettingsMode] = useState(false);
  const numberOfList = settingsMode ? 1 : 2;

  return (
    <div className={`teams-color-manager${settingsMode ? " active" : ""}`}>
      <div className="top-line">
        <span>{settingsMode ? "Set your colors" : `Teams color`}</span>
        <MenuButton onClick={() => setSettingsMode(!settingsMode)}>
          {
            <Settings
              className={`settings-icon${settingsMode ? " active" : ""}`}
              color={settingsMode ? "#2a86fb" : "#fff"}
            />
          }
        </MenuButton>
      </div>

      <div className="teams-colors">
        {Array.from({ length: numberOfList }, (_, index) => index + 1).map(
          (team) => (
            <ColorsList
              settingsMode={settingsMode}
              key={team}
              team={team}
              title={!settingsMode ? `Team ${team}` : null}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TeamsColorManager;
