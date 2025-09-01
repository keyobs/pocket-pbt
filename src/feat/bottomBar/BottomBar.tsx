import "./bottomBar.less";
import { useState } from "react";
import MenuButton from "../../components/buttons/MenuButton";
import Drawer from "../../components/drawer/Drawer";
import TeamsColorManager from "../teamsColor/TeamsColorManager";
import AllCountersActions from "../../components/allCountersActions/AllCountersActions";

const BottomBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-item">
        <MenuButton onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
      </div>
      <AllCountersActions />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <TeamsColorManager />
      </Drawer>
      <div className="bottom-bar-item"></div>
    </div>
  );
};

export default BottomBar;
