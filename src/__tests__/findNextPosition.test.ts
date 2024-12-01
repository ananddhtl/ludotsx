import findNextPosition from '../utils/findNextPosition';

it('should return correct position', () => {
  const newPosition1 = findNextPosition({ x: 6, y: 14 }, 3, '1');
  const newPosition2 = findNextPosition({ x: 3, y: 8 }, 3, '1');
  const newPosition3 = findNextPosition({ x: 0, y: 6 }, 3, '1');

  expect(newPosition1).toEqual({ x: 6, y: 11 });
  expect(newPosition2).toEqual({ x: 0, y: 8 });
  expect(newPosition3).toEqual({ x: 3, y: 6 });
});

it('should handle corners', () => {
  const newPosition1 = findNextPosition({ x: 6, y: 10 }, 3, '1');

  expect(newPosition1).toEqual({ x: 4, y: 8 });
});
