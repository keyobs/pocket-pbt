import SubMenuButton from "@components/buttons/subMenuButton/SubMenuButton";

const SubMenu = ({
  children,
  title,
  goBack,
}: {
  children: React.ReactNode;
  title: string;
  goBack: () => void;
}) => {
  return (
    <div>
      <div>{title}</div>
      {children}
      <SubMenuButton handleOnClick={goBack} text="go back" />
    </div>
  );
};

export default SubMenu;
