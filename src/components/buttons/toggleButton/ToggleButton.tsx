import { ReactNode } from "react";
import "./toggleButton.less";

type TToggleButton = {
  label: string | ReactNode;
  isToggled: boolean;
  onToggle: () => void;
};

const ToggleButton = ({ label, isToggled, onToggle }: TToggleButton) => {
  return (
    <div className="pbt-toggle-container">
      {label && <span className="label">{label}</span>}
      <div className="pbt-toggle-button" onClick={onToggle}>
        <input
          className="checkbox"
          type="checkbox"
          checked={isToggled}
          readOnly
        />
        <div className="switch"></div>
      </div>
    </div>
  );
};

export default ToggleButton;
