import Counter from "../components/counter/Counter";
import { JammerCountersProvider } from "../components/jammersCounter/JammersCounterProvider";
import "./timers.less";

const Timers = () => {
  return (
    <JammerCountersProvider>
      <div className="timers">
        <div className="teamTimers">
          {Array.from({ length: 2 }).map((_, index) => (
            <Counter key={index} type="blocker" />
          ))}

          <Counter type="jammer" jammerId="jammer1" />
        </div>
        <div className="teamTimers">
          <Counter type="jammer" jammerId="jammer2" />
          {Array.from({ length: 2 }).map((_, index) => (
            <Counter key={index} type="blocker" />
          ))}
        </div>
      </div>
    </JammerCountersProvider>
  );
};

export default Timers;
