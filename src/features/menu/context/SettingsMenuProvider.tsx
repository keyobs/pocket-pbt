import { ReactNode, useState } from "react";
import { TAppSettings } from "../SettingsConfig";
import { SettingsMenuContext } from "./SettingsMenuContext";

const exclusiveSettings: Partial<
  Record<keyof TAppSettings, keyof TAppSettings>
> = {
  jammerTimeOnly: "blockerTimeOnly",
  blockerTimeOnly: "jammerTimeOnly",
};

export function SettingsMenuProvider({ children }: { children: ReactNode }) {
  const [appSettings, setAppSettings] = useState<TAppSettings>({
    jammerTimeOnly: false,
    blockerTimeOnly: false,
    timeOnlyOneTeam: false,
  });

  const handleToggle = (settingName: keyof TAppSettings) => {
    setAppSettings((previous) => {
      const newSettings = { ...previous };
      const exclusiveSetting = exclusiveSettings[settingName];
      if (exclusiveSetting) {
        newSettings[exclusiveSetting] = false;
      }

      newSettings[settingName] = !previous[settingName];
      return newSettings;
    });
  };

  return (
    <SettingsMenuContext.Provider value={{ appSettings, handleToggle }}>
      {children}
    </SettingsMenuContext.Provider>
  );
}
