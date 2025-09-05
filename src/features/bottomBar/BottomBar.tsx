import "./bottomBar.less";
import { useState } from "react";
import TeamsColorManager from "@features/teamsColor/TeamsColorManager";
import Drawer from "@components/drawer/Drawer";
import AllCountersActions from "@components/allCountersActions/AllCountersActions";
import ColorsMenuButton from "./ColorsMenuButton";

const BottomBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-item">
        <ColorsMenuButton onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
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
