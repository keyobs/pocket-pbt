import "./teamsColorManager.less";
import { teamColors } from "@constants/teamColors";
import { useTeamsColorContextDispatch } from "./context/index";
import ColorsList from "./colorsList/ColorsList";

const TeamsColorManager = () => {
  const { getOnChangeColor } = useTeamsColorContextDispatch();
  const userTeamColors = [...teamColors];

  return (
    <div className="teams-color-manager">
      <div className="teams-colors">
        {[1, 2].map((team) => (
          <ColorsList
            key={team}
            team={team}
            title={`Team ${team} Color`}
            teamColors={userTeamColors}
            onChange={getOnChangeColor}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamsColorManager;
