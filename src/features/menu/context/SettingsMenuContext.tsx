import { createContext, useContext } from "react";
import { TAppSettings } from "../SettingsConfig";

type TSettingsMenuContext = {
  appSettings: TAppSettings;
  handleToggle: (settingName: keyof TAppSettings) => void;
};
export const SettingsMenuContext = createContext<TSettingsMenuContext | null>(
  null
);

export function useSettingsMenuContext() {
  const context = useContext(SettingsMenuContext);
  if (!context) {
    throw new Error(
      "useSettingsMenuContext must be used within a SettingsMenuProvider"
    );
  }
  return context;
}

export function useSettingsState() {
  return useSettingsMenuContext().appSettings;
}

export function useSettingsDispatch() {
  return useSettingsMenuContext().handleToggle;
}
