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

  const closeButtonCustomStyle = {
    backgroundColor: "unset",
    borderWidth: "0 1px 0 0",
    borderRadius: 0,
    margin: "10px 0",
    padding: 20,
  };

  return (
    <div
      id="pbt-drawer"
      aria-label="drawer"
      role="complementary"
      className={`drawer ${isOpen ? "open" : "closed"}`}
    >
      <Button onClick={onClose} customStyle={closeButtonCustomStyle} size="fit">
        {<ChevronRight />}
      </Button>
      <div id="pbt-drawer-content" className="content">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
