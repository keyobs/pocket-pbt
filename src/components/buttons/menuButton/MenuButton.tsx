import "./menuButton.less";
import { ReactNode } from "react";

interface IMenuButton {
  children: ReactNode;
  onClick: () => void;
}

const MenuButton = ({ children, onClick }: IMenuButton) => {
  return (
    <button
      id="pbt-menu-button"
      role="button"
      onClick={onClick}
      className="pbt-menu-button "
    >
      {children}
    </button>
  );
};

export default MenuButton;
