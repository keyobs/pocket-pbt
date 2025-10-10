import "./settings.less";

import { useState } from "react";
import SubMenu from "./SubMenu";
import VersionLog from "./versionLog/VersionLog";
import MainSettings, { TSubMenuOptions } from "./MainSettings";
import SubMenuButton from "@components/buttons/subMenuButton/SubMenuButton";

const SettingsMenu = () => {
  const [subMenuSelected, setSubMenuSelected] =
    useState<TSubMenuOptions>("default");

  const renderDrawerContent = () => {
    switch (subMenuSelected) {
      case "default":
        return <MainSettings handleOnClick={setSubMenuSelected} />;
      case "about":
        return (
          <SubMenu title="about">
            <VersionLog />
          </SubMenu>
        );
      default:
        return null;
    }
  };

  const goBack = () => setSubMenuSelected("default");

  return (
    <div className="settings">
      <div className="content">{renderDrawerContent()}</div>
      {subMenuSelected !== "default" && (
        <div className="goBack-wrapper">
          <SubMenuButton handleOnClick={goBack} text="go back" />
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
