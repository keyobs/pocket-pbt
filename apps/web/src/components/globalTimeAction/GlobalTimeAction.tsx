import { useTimeContext, useTimeDispatch } from "@core/time";
import { Button } from "@components/buttons/Button";

const GlobalTimeAction = () => {
  const { isTimePaused } = useTimeContext();
  const onPauseTime = useTimeDispatch();

  return (
    <div>
      <Button
        style="secondary"
        onClick={onPauseTime}
        size="fit"
        active={isTimePaused === true}
        paused={isTimePaused === true}
      >
        {isTimePaused ? "resume all" : "pause all"}
      </Button>
    </div>
  );
};

export default GlobalTimeAction;
