import { useEffect, useRef } from "react";
import "./timer.less";

interface ITimer {
  count: number;
  isPaused: boolean;
  total?: number;
}

const Timer = ({ count, isPaused, total = 30 }: ITimer) => {
  const rectRef = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    if (!rectRef.current) return;

    const length = rectRef.current.getTotalLength();
    const progress = count / total;
    rectRef.current.style.strokeDasharray = `${length}`;
    rectRef.current.style.strokeDashoffset = `${length * (1 - progress)}`;
  }, [count, total]);

  const strokeColor = count <= 10 ? "#ff7a00" : "#2a86fb";

  return (
    <div className="timer">
      {count !== 0 && (
        <svg className="timer-border" viewBox="0 0 100 100" fill="none">
          <rect
            ref={rectRef}
            x="10"
            y="6"
            width="84%"
            height="88%"
            rx="5"
            ry="5"
            className={`border-rect ${isPaused ? "paused" : ""}`}
            style={{ stroke: strokeColor }}
          />
        </svg>
      )}
      <span className="timer-count">{count}</span>
    </div>
  );
};

export default Timer;
