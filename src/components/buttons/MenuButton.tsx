interface IMenuButton {
  onClick: () => void;
}

const MenuButton = ({ onClick }: IMenuButton) => {
  return (
    <button onClick={onClick} className="menu-button">
      <span>Oo</span>
    </button>
  );
};

export default MenuButton;
