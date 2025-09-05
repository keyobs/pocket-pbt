import "./drawer.less";
import { ReactNode } from "react";
import { Button } from "@components/buttons/Button";
import { ChevronRight } from "react-feather";

interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Drawer = ({ isOpen, onClose, children }: IDrawer) => {
  const customStyle = {
    backgroundColor: "unset",
    borderWidth: "0 1px 0 0",
    borderRadius: 0,
    margin: "10px 0",
    padding: 12,
  };

  return (
    <div id="pbt-drawer" className={`drawer ${isOpen ? "open" : "closed"}`}>
      <Button onClick={onClose} customStyle={customStyle} size="fit">
        {<ChevronRight />}
      </Button>
      <div id="pbt-drawer-content" className="content">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
