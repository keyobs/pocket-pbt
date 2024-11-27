import { useTimeContext } from "./useTimeContext";
import { useTimeDispatchContext } from "./useTimeDispatchContext";

const AllCountersActions = () => {
  const { isTimePaused } = useTimeContext();
  const { onPauseTime } = useTimeDispatchContext();

  return (
    <div>
      <button onClick={onPauseTime}>
        {isTimePaused ? "resume all" : "pause all"}
      </button>
    </div>
  );
};

export default AllCountersActions;
