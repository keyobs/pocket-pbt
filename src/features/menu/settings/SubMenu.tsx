const SubMenu = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div>
      <div>{title}</div>
      {children}
    </div>
  );
};

export default SubMenu;
