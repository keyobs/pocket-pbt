import "./menuButton.less";

interface IMenuButton {
  onClick: () => void;
}

const MenuButton = ({ onClick }: IMenuButton) => {
  return (
    <button id="pbt-menu-button" onClick={onClick} className="pbt-menu-button ">
      <span>Oo</span>
    </button>
  );
};

export default MenuButton;
