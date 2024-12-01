interface CellProps {
  color: string;
  classes?: string;
}

const Cell: React.FC<CellProps> = ({ color, classes }) => {
  return <div className={`${color} ${classes} border-black`}></div>;
};

export default Cell;
