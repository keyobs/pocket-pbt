import "./teamsColorManager.less";
import { Button } from "@components/buttons/Button";
import ColorDot from "@components/colorDot/ColorDot";
import { teamColors } from "@constants/teamColors";
import {
  useTeamsColorContextDispatch,
  useTeamsColorContextState,
} from "./context/index";

const TeamsColorManager = () => {
  const { team1Color, team2Color } = useTeamsColorContextState();
  const { onChangeTeam1Color, onChangeTeam2Color } =
    useTeamsColorContextDispatch();

  const getOnChangeColor = (team: number) => {
    return team === 1 ? onChangeTeam1Color : onChangeTeam2Color;
  };

  return (
    <div className="teams-color-manager">
      {[1, 2].map((team) => (
        <div key={team}>
          <h3>Team {team}</h3>
          {teamColors.map((color, index) => (
            <Button
              disabled={color === (team === 1 ? team1Color : team2Color)}
              key={index}
              onClick={() => getOnChangeColor(team)(color)}
              size="fit"
            >
              <ColorDot color={color.code} />
              <span style={{ marginLeft: "4px" }}>{color.name}</span>
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamsColorManager;
