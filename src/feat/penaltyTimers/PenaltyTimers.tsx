import Counter from "./counter/Counter";
import { JammersCounterProvider } from "./counter/jammersCounter/jammersContext/JammersCounterProvider";
import "./penaltyTimers.less";

const PenaltyTimers = () => {
  return (
    <JammersCounterProvider>
      <div className="penalty-timers">
        <div className="team-wrapper">
          {Array.from({ length: 2 }).map((_, index) => (
            <Counter key={index} type="blocker" />
          ))}

          <Counter type="jammer" jammerId="jammer1" />
        </div>
        <div className="team-wrapper">
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
