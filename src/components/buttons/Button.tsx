import { cleanClasses } from "../../utils/cleanClasses";
import "./pbt-button.less";

interface IButton {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  paused?: boolean;
  size?: "medium" | "large" | "fit";
  style?: "default" | "primary";
  children: React.ReactNode;
}

export const Button = ({
  active = false,
  disabled = false,
  onClick,
  paused = false,
  size = "medium",
  style = "default",
  children,
}: IButton) => {
  const buttonClass = cleanClasses(
    `pbt-button ${style} ${size} ${disabled && "disabled"}
    ${active && "active"} ${paused && "paused"}`
  );

  return (
    <button
      id="pbt-button"
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      <span>{children}</span>
    </button>
  );
};
