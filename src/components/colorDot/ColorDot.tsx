import "./colorDot.less";

type TColorDot = {
  color: string;
};

export const ColorDot = ({ color }: TColorDot) => {
  return <div className="color-dot" style={{ backgroundColor: color }}></div>;
};

export default ColorDot;
