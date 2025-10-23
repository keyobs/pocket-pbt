import "./settings.less";
import SubMenuButton from "@components/buttons/subMenuButton/SubMenuButton";
import QuickSettings from "./QuickSettings";

export type TSubMenuOptions = "default" | "about";

const MainSettings = ({
  handleOnClick,
}: {
  handleOnClick: (option: TSubMenuOptions) => void;
}) => {
  const subMenuOptions: TSubMenuOptions[] = ["about"];

  return (
    <>
      <h3>Settings</h3>
      <div className="main-settings">
        <QuickSettings />
        {subMenuOptions.map((option) => (
          <SubMenuButton
            key={option}
            text={option}
            handleOnClick={() => handleOnClick(option)}
          />
        ))}
      </div>
    </>
  );
};

export default MainSettings;
