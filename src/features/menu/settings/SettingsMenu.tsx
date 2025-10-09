import SubMenuButton from "@components/buttons/subMenuButton/SubMenuButton";
import { useState } from "react";
import QuickSettings from "./QuickSettings";
import SubMenu from "./SubMenu";
import VersionLog from "./versionLog/VersionLog";

type TSubMenuOptions = "default" | "about";
const subMenuOptions: TSubMenuOptions[] = ["about"];

const SettingsMenu = () => {
  const [subMenuSelected, setSubMenuSelected] =
    useState<TSubMenuOptions>("default");

  const renderDrawerContent = () => {
    switch (subMenuSelected) {
      case "default":
        return <MainSettings handleOnClick={setSubMenuSelected} />;
      case "about":
        return (
          <SubMenu title="about" goBack={() => setSubMenuSelected("default")}>
            <VersionLog />
          </SubMenu>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings">
      <div className="content">{renderDrawerContent()}</div>
    </div>
  );
};

export default SettingsMenu;

const MainSettings = ({
  handleOnClick,
}: {
  handleOnClick: (option: TSubMenuOptions) => void;
}) => {
  return (
    <>
      <h3>Settings</h3>
      <QuickSettings />
      <div>
        {subMenuOptions.map((option) => (
          <SubMenuButton
            key={option}
            text={option}
            handleOnClick={() => handleOnClick(option)}
          />
        ))}
      </div>
    </>
  );
};
