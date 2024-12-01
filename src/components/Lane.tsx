import Cell from './Cell';

type Position = 'top' | 'left' | 'right' | 'bottom';

interface LaneProps {
  position: Position;
  color: string;
}

const findBorder = (row: number, col: number, position: Position): string => {
  switch (position) {
    case 'top':
    case 'bottom': {
      if ((col === 0 || col === 2) && row < 5) {
        return 'border-b-2';
      }
      if (col === 1 && row < 5) {
        return 'border-2 border-t-0';
      }
      if (col === 1 && row === 5) {
        return 'border-x-2';
      }
      return '';
      break;
    }

    case 'left':
    case 'right': {
      if ((row === 0 || row === 2) && col < 5) {
        return 'border-r-2';
      }
      if (row === 1 && col < 5) {
        return 'border-2 border-l-0';
      }
      if (row === 1 && col === 5) {
        return 'border-y-2';
      }
      return '';
      break;
    }
  }
};

const Lane: React.FC<LaneProps> = ({ position, color }) => {
  let positionClasses;
  let gridClasses;
  switch (position) {
    case 'top': {
      positionClasses =
        'col-start-7 col-span-3 row-start-1 row-span-6 border-b-2';
      gridClasses = 'grid-cols-3 grid-rows-6';
      break;
    }
    case 'left': {
      positionClasses =
        'col-start-1 col-span-6 row-start-7 row-span-3 border-r-2';
      gridClasses = 'grid-cols-6 grid-rows-3';
      break;
    }
    case 'right': {
      positionClasses =
        'col-start-10 col-span-6 row-start-7 row-span-3 border-l-2';
      gridClasses = 'grid-cols-6 grid-rows-3';
      break;
    }
    case 'bottom': {
      positionClasses =
        'col-start-7 col-span-3 row-start-10 row-span-6 border-t-2';
      gridClasses = 'grid-cols-3 grid-rows-6';
      break;
    }
  }

  let cols = 6;
  let rows = 3;

  if (position === 'bottom' || position === 'top') {
    [rows, cols] = [cols, rows];
  }

  const cells = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0))
    .map((row, rowIdx) => {
      return row.map((_, colIdx) => {
        const border = findBorder(rowIdx, colIdx, position);

        if (
          position === 'left' &&
          ((colIdx > 0 && rowIdx === 1) || (colIdx === 1 && rowIdx === 0))
        ) {
          return (
            <Cell color={color} key={`${rowIdx}${colIdx}`} classes={border} />
          );
        }
        if (
          position === 'right' &&
          ((colIdx < 5 && rowIdx === 1) || (colIdx === 4 && rowIdx === 2))
        ) {
          return (
            <Cell color={color} key={`${rowIdx}${colIdx}`} classes={border} />
          );
        }
        if (
          position === 'top' &&
          ((rowIdx > 0 && colIdx === 1) || (colIdx === 2 && rowIdx === 1))
        ) {
          return (
            <Cell color={color} key={`${rowIdx}${colIdx}`} classes={border} />
          );
        }
        if (
          position === 'bottom' &&
          ((rowIdx < 5 && colIdx === 1) || (colIdx === 0 && rowIdx === 4))
        ) {
          return (
            <Cell color={color} key={`${rowIdx}${colIdx}`} classes={border} />
          );
        }
        return (
          <Cell color={'white'} key={`${rowIdx}${colIdx}`} classes={border} />
        );
      });
    });

  return (
    <div className={`${positionClasses}  border-black grid ${gridClasses}`}>
      {cells}
    </div>
  );
};

export default Lane;
