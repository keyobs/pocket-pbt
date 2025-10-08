import "./colorsList.less";
import { Button } from "@components/buttons/Button";
import ColorDot from "@components/colorDot/ColorDot";
import { useTeamsColorContextState } from "../context";
import { TTeamColor } from "@constants/defaultColorsSet";

interface ITeamColors {
  title: string | null;
  team: number;
  teamColors: TTeamColor[];
  onChange: (team: number) => (color: TTeamColor) => void;
  disabledStyle?: "selectable" | null;
}

const ColorsList = (props: ITeamColors) => {
  const { team1Color, team2Color } = useTeamsColorContextState();
  const { team, teamColors, title, onChange } = props;

  return (
    <div className="colors-list">
      <h3>{title || "\u00a0"}</h3>
      {teamColors.map((color, index) => (
        <Button
          disabled={color === (team === 1 ? team1Color : team2Color)}
          key={index}
          onClick={() => onChange(team)(color)}
          size="fit"
          align="start"
          disabledStyle={props.disabledStyle || "default"}
        >
          <ColorDot color={color.code} />
          <span style={{ marginLeft: "4px" }}>{color.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default ColorsList;
