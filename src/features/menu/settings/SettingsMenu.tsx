import "./settings.less";
const version = import.meta.env.VITE_APP_VERSION;

import ToggleButton from "@components/buttons/toggleButton/ToggleButton";
import { settingsConfig, TAppSettings } from "./SettingsConfig";
import {
  useSettingsDispatch,
  useSettingsState,
} from "./context/SettingsMenuContext";

const SettingsMenu = () => {
  const appSettings = useSettingsState();
  const handleToggle = useSettingsDispatch();
  return (
    <div className="settings">
      <h3>Settings</h3>
      <div className="content">
        {settingsConfig.map((setting) => (
          <ToggleButton
            key={setting.key}
            label={setting.label}
            isToggled={appSettings[setting.key]}
            onToggle={() => handleToggle(setting.key as keyof TAppSettings)}
          />
        ))}
      </div>
      <footer>
        <span>Version: {version}</span>
        <br />
        <span>Update: {__LAST_UPDATE_DATE__}</span>
      </footer>
    </div>
  );
};

export default SettingsMenu;
