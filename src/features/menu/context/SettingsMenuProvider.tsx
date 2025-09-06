import { ReactNode, useState } from "react";
import { TAppSettings } from "../SettingsConfig";
import { SettingsMenuContext } from "./SettingsMenuContext";

export function SettingsMenuProvider({ children }: { children: ReactNode }) {
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
    <SettingsMenuContext.Provider value={{ appSettings, handleToggle }}>
      {children}
    </SettingsMenuContext.Provider>
  );
}
