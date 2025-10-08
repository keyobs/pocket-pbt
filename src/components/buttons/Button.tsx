import { CSSProperties } from "react";
import { cleanClasses } from "@utils/cleanClasses";
import "./pbt-button.less";

interface IButton {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  paused?: boolean;
  size?: "medium" | "large" | "fit";
  align?: "center" | "start";
  style?: "default" | "primary" | "secondary" | "go";
  children: React.ReactNode;
  customStyle?: CSSProperties;
  disabledStyle?: "default" | "selectable";
}

export const Button = ({
  active = false,
  disabled = false,
  onClick,
  paused = false,
  size = "medium",
  align = "center",
  style = "default",
  disabledStyle = "default",
  customStyle,
  children,
}: IButton) => {
  const disabledClass =
    disabledStyle === "selectable" ? "selected" : "disabled";

  const buttonClass = cleanClasses(
    `pbt-button ${style} ${size} ${disabled && disabledClass}
    ${active && "active"} ${paused && "paused"}`
  );

  const textClass = cleanClasses(`${align}`);

  return (
    <button
      id="pbt-button"
      role="button"
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
      style={customStyle}
    >
      <span className={textClass}>{children}</span>
    </button>
  );
};
