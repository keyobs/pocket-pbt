import { useState } from "react";
import ToggleButton from "@components/buttons/toggleButton/ToggleButton";

type TAppSettings = {
  jammerTimeOnly: boolean;
  blockerTimeOnly: boolean;
  timeOnlyOneTeam: boolean;
};

const settingsConfig: { key: keyof TAppSettings; label: string }[] = [
  {
    key: "jammerTimeOnly",
    label: "Jammer time only",
  },
  {
    key: "blockerTimeOnly",
    label: "Blocker time only",
  },
  {
    key: "timeOnlyOneTeam",
    label: "Time only one team",
  },
];

const SettingsMenu = () => {
  const [appSettings, setAppSettings] = useState<TAppSettings>({
    jammerTimeOnly: false,
    blockerTimeOnly: false,
    timeOnlyOneTeam: false,
  });

  const handleToggle = (settingName: keyof TAppSettings) => {
    setAppSettings((previous) => ({
      ...previous,
      [settingName]: !previous[settingName],
    }));
  };

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
