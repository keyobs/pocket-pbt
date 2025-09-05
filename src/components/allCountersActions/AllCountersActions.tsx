import { Button } from "@components/buttons/Button";
import { useTimeContext, useTimeDispatch } from "./time";

const AllCountersActions = () => {
  const { isTimePaused } = useTimeContext();
  const onPauseTime = useTimeDispatch();

  return (
    <div>
      <Button onClick={onPauseTime} size="fit">
        {isTimePaused ? "resume all" : "pause all"}
      </Button>
    </div>
  );
};

export default AllCountersActions;
