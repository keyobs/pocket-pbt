import Counter from "../components/counter/Counter";
import "./timers.less";

const Timers = () => {
  return (
    <div className="timers">
      <div className="teamTimers">
        {Array.from({ length: 2 }).map((_, index) => (
          <Counter key={index} />
        ))}
        <Counter />
      </div>
      <div className="teamTimers">
        {Array.from({ length: 2 }).map((_, index) => (
          <Counter key={index} />
        ))}
        <Counter />
      </div>
    </div>
  );
};

export default Timers;
