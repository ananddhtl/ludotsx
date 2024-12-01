import useWidth from '../hooks/useWidth';
import Center from './Center';
import Controls from './Controls';
import Lane from './Lane';
import PlayerBase from './PlayerBase';

const GameBoard = () => {
  const ref = useWidth();
  return (
    <div className="w-[900px] mx-auto mt-3">
      <Controls position="top" />
      <div
        className="grid grid-cols-[repeat(15,_minmax(0,_1fr))] grid-rows-[repeat(15,_minmax(0,_1fr))] border-2 border-black relative"
        ref={ref}
      >
        <PlayerBase
          color={'bg-red-500'}
          horizontal="left"
          vertical="bottom"
          animationClass="pulse-red"
          playerNumber="4"
        />
        <PlayerBase
          color={'bg-green-600'}
          horizontal="left"
          vertical="top"
          animationClass="pulse-green"
          playerNumber="1"
        />
        <PlayerBase
          color={'bg-yellow-400'}
          horizontal="right"
          vertical="top"
          animationClass="pulse-yellow"
          playerNumber="2"
        />
        <PlayerBase
          color={'bg-blue-600'}
          horizontal="right"
          vertical="bottom"
          animationClass="pulse-blue"
          playerNumber="3"
        />
        <Center />
        <Lane position="top" color={'bg-yellow-400'} />
        <Lane position="bottom" color={'bg-red-500'} />
        <Lane position="left" color={'bg-green-600'} />
        <Lane position="right" color={'bg-blue-600'} />
      </div>
      <Controls position="bottom" />
    </div>
  );
};

export default GameBoard;
