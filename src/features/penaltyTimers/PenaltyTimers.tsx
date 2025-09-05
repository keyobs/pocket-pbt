import "./penaltyTimers.less";
import { useTeamsColorContextState } from "@features/teamsColor/context/index";
import Counter from "./counter/Counter";
import { JammersCounterProvider } from "./counter/jammersCounter/jammersContext/JammersCounterProvider";

const PenaltyTimers = () => {
  const { team1Color, team2Color } = useTeamsColorContextState();

  return (
    <JammersCounterProvider>
      <div className="penalty-timers">
        <div
          id="team-wrapper-1"
          className="team-wrapper"
          style={{ backgroundColor: team1Color.code }}
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <Counter key={index} type="blocker" />
          ))}

          <Counter type="jammer" jammerId="jammer1" />
        </div>
        <div
          id="team-wrapper-2"
          className="team-wrapper"
          style={{ backgroundColor: team2Color.code }}
        >
          <Counter type="jammer" jammerId="jammer2" />
          {Array.from({ length: 2 }).map((_, index) => (
            <Counter key={index} type="blocker" />
          ))}
        </div>
      </div>
    </JammersCounterProvider>
  );
};

export default PenaltyTimers;
