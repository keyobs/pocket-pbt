import { Button } from "../../components/buttons/Button";
import ColorDot from "../../components/colorDot/ColorDot";
import { teamColors } from "../../constants/teamColors";

const TeamBackgroundColor = () => {
  return (
    <div>
      {teamColors.map((color, index) => (
        <Button key={index} onClick={() => console.log(`Team color ${color}`)}>
          <ColorDot color={color} />
        </Button>
      ))}
    </div>
  );
};

export default TeamBackgroundColor;
