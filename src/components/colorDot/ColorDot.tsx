import "./colorDot.less";

type TColorDot = {
  color: { code: string; color: string };
};

export const ColorDot = ({ color }: TColorDot) => {
  return (
    <div className="color-dot" style={{ backgroundColor: color.code }}></div>
  );
};

export default ColorDot;
