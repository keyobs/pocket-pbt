import { Button } from "../buttons/Button";
import { useTimeContext } from "./useTimeContext";
import { useTimeDispatchContext } from "./useTimeDispatchContext";

const AllCountersActions = () => {
  const { isTimePaused } = useTimeContext();
  const { onPauseTime } = useTimeDispatchContext();

  return (
    <div>
      <Button onClick={onPauseTime} size="fit">
        {isTimePaused ? "resume all" : "pause all"}
      </Button>
    </div>
  );
};

export default AllCountersActions;
