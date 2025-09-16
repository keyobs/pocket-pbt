import "./colorDot.less";

type TColorDot = {
  color: string;
};

export const ColorDot = ({ color }: TColorDot) => {
  return (
    <div
      role="img"
      aria-label={`${color} color-dot`}
      className="color-dot"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default ColorDot;
