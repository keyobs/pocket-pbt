import "./badge.less";
import { Star } from "react-feather";

type TBadge = {
  jammerId: "jammer1" | "jammer2";
};

const StarBadge = ({ jammerId }: TBadge) => {
  return (
    <div
      id={`badge-${jammerId}`}
      data-testid={`badge-${jammerId}`}
      className="badge"
    >
      <Star
        role="img"
        aria-label="star"
        fill="#d3b605"
        stroke="#c7ac04"
        size={30}
      />
    </div>
  );
};

export default StarBadge;
