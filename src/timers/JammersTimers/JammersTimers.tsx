import Counter from "../../components/counter/Counter";

const JammersTimers = () => {
  return (
    <div className="timers">
      <div className="teamTimers">
        <Counter type="jammer" />
      </div>
      <div className="teamTimers">
        <Counter type="jammer" />
      </div>
    </div>
  );
};

export default JammersTimers;
