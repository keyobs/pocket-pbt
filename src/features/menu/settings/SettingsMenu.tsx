import { useState } from "react";
import SubMenu from "./SubMenu";
import VersionLog from "./versionLog/VersionLog";
import MainSettings, { TSubMenuOptions } from "./MainSettings";

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
