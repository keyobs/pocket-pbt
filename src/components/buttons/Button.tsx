import { CSSProperties, ReactNode } from "react";
import { cleanClasses } from "@utils/cleanClasses";
import "./pbt-button.less";

interface IButton {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  paused?: boolean;
  size?: "medium" | "large" | "fit";
  align?: "center" | "start";
  style?: "default" | "primary" | "secondary" | "go" | "selection";
  activeStyle?: "default" | "active" | "selected";
  customStyle?: CSSProperties;
  children: ReactNode;
}

export const Button = ({
  active = false,
  disabled = false,
  onClick,
  paused = false,
  size = "medium",
  align = "center",
  style = "default",
  activeStyle = "default",
  customStyle,
  children,
}: IButton) => {
  const buttonClass = cleanClasses(
    [
      "pbt-button",
      style,
      size,
      paused ? "paused" : "",
      active ? "active" : "",
      active ? activeStyle : "",
    ].join(" ")
  );

  const textClass = cleanClasses(align);

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
