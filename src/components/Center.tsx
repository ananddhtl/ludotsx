import { useSelector } from 'react-redux';
import { selectWidth } from '../app/slices/boardSlice';

interface CenterProps {}

const Center: React.FC<CenterProps> = () => {
  const width = useSelector(selectWidth);

  return (
    <div
      className={`row-start-7 row-span-3 col-start-7 col-span-3 bg-transparent h-0 w-0 border-l-green-600 border-r-blue-600 border-t-yellow-400 border-b-red-500 `}
      style={{
        borderWidth: width ? width / 10 : 0,
      }}
    ></div>
  );
};

export default Center;
