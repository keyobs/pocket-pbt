import { Button } from "../../components/buttons/Button";
import ColorDot from "../../components/colorDot/ColorDot";

const teamColors = [
  { code: "#33FF57", color: "green" },
  { code: "#FF5733", color: "red" },
  { code: "#33C1FF", color: "blue" },
] as const;

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
