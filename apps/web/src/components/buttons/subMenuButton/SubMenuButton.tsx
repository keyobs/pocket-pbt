import "./subMenuButton.less";

type TSubMenuButton = {
  text: string;
  handleOnClick: () => void;
};
const SubMenuButton = ({ text, handleOnClick }: TSubMenuButton) => {
  return (
    <button className="sub-menu-button" onClick={handleOnClick}>
      <span>{text}</span>
    </button>
  );
};

export default SubMenuButton;
