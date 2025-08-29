import "./timer.less";

interface ITimer {
  count: number;
}

const Timer = ({ count }: ITimer) => {
  return <div className="timer">{count}</div>;
};

export default Timer;
