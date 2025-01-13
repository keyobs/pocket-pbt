import JammersTimers from "./JammersTimers/JammersTimers";
import "./timers.less";

const Timers = () => {
  return (
    <div className="timers">
      <JammersTimers />

      {/*  <div className="teamTimers">
        {Array.from({ length: 2 }).map((_, index) => (
          <Counter key={index} type="blocker" />
        ))}
        <Counter type="jammer" />
      </div>
      <div className="teamTimers">
        <Counter type="jammer" />
        {Array.from({ length: 2 }).map((_, index) => (
          <Counter key={index} type="blocker" />
        ))}
      </div> */}
    </div>
  );
};

export default Timers;
