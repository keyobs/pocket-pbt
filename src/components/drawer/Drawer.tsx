import { ReactNode } from "react";
import "./drawer.less";
import { Button } from "../buttons/Button";

interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Drawer = ({ isOpen, onClose, children }: IDrawer) => {
  return (
    <div className={`drawer ${isOpen ? "open" : "closed"}`}>
      <div className="content">
        {children}
        <div className="bottom-line">
          <Button onClick={onClose}>X</Button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
