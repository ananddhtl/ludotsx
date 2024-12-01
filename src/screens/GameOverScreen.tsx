import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { selectWinner } from '../app/slices/gameSettingsSlice';
import useRestart from '../hooks/useRestart';

const GameOverScreen = () => {
  const winner = useSelector(selectWinner);

  const restart = useRestart();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card additionalClassnames="p-10 flex flex-col justify-center gap-4">
        <h2 className="font-semibold text-6xl">Game is OVER</h2>
        <p className="text-center text-2xl">
          {winner === 'bot' ? 'You lost' : 'You won!'}
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-2 text-xl rounded-md"
          onClick={() => {
            restart();
          }}
        >
          Restart
        </button>
      </Card>
    </div>
  );
};

export default GameOverScreen;
