import Counter from "./counter/Counter";
import { JammersCounterProvider } from "./counter/jammersCounter/jammersContext/JammersCounterProvider";
import "./timers.less";

const Timers = () => {
  return (
    <JammersCounterProvider>
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
    </JammersCounterProvider>
  );
};

export default Timers;
