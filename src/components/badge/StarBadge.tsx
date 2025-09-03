import "./badge.less";
import { Star } from "react-feather";

type TBadge = {
  jammerId: "jammer1" | "jammer2";
};

const StarBadge = ({ jammerId }: TBadge) => {
  return (
    <div id={`badge-${jammerId}`} className="badge">
      <Star fill="yellow" size={30} />
    </div>
  );
};

export default StarBadge;
