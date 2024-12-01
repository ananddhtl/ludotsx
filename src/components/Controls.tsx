import PlayerPanel from './PlayerPanel';

interface ControlsProps {
  position: 'top' | 'bottom';
}

const Controls: React.FC<ControlsProps> = ({ position }) => {
  if (position === 'top') {
    return (
      <div className={`flex justify-between mb-3 items-end`}>
        <PlayerPanel playerNumber={'1'} />
        <PlayerPanel playerNumber={'2'} />
      </div>
    );
  } else {
    return (
      <div className={`flex justify-between mt-3 items-start`}>
        <PlayerPanel playerNumber={'4'} />
        <PlayerPanel playerNumber={'3'} />
      </div>
    );
  }
};

export default Controls;
