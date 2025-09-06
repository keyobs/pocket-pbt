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
    <div>
      {settingsConfig.map((setting) => (
        <ToggleButton
          key={setting.key}
          label={setting.label}
          isToggled={appSettings[setting.key]}
          onToggle={() => handleToggle(setting.key as keyof TAppSettings)}
        />
      ))}
    </div>
  );
};

export default SettingsMenu;
