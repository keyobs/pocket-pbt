import "./bottomBar.less";
import { useEffect, useState } from "react";
import TeamsColorManager from "@features/menu/teamsColor/TeamsColorManager";
import Drawer from "@components/drawer/Drawer";
import AllCountersActions from "@components/globalTimeAction/GlobalTimeAction";
import ColorsMenuButton from "./ColorsMenuButton";
import MenuButton from "@components/buttons/MenuButton";
import ParametersMenu from "@features/menu/settings/SettingsMenu";

const BottomBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<
    null | "app-parameters" | "colors"
  >(null);
  type MenuSelection = typeof menuSelected;

  const onOpenMenu = (menu: MenuSelection) => {
    if (menuSelected === menu) {
      setMenuSelected(null);
    } else if (menuSelected && menuSelected !== menu) {
      setIsDrawerOpen(false);
      setTimeout(() => {
        setMenuSelected(menu);
        // wait to drawer open/close animation when changing the opened menu
      }, 300);
    } else {
      setMenuSelected(menu);
    }
  };

  useEffect(() => {
    setIsDrawerOpen(menuSelected !== null);
  }, [menuSelected]);

  const renderDrawerContent = () => {
    switch (menuSelected) {
      case "app-parameters":
        return <ParametersMenu />;
      case "colors":
        return <TeamsColorManager />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bottom-bar">
        <MenuButton onClick={() => onOpenMenu("app-parameters")}>oO</MenuButton>
        <AllCountersActions />
        <ColorsMenuButton onClick={() => onOpenMenu("colors")} />
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setMenuSelected(null)}>
        {renderDrawerContent()}
      </Drawer>
    </>
  );
};

export default BottomBar;
