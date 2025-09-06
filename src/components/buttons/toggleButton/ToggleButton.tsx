import { ReactNode, useState } from "react";
import "./toggleButton.less";

type TToggleButton = {
  label: string | ReactNode;
};

const ToggleButton = ({ label }: TToggleButton) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="pbt-toggle-container">
      {label && <span className="label">{label}</span>}
      <div className="pbt-toggle-button" onClick={handleToggle}>
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          readOnly
        />
        <div className="switch"></div>
      </div>
    </div>
  );
};

export default ToggleButton;
