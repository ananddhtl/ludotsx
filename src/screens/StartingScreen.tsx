import { useSelector } from 'react-redux';
import Card from '../components/Card';
import SelectSettings from '../components/SelectSettings';
import { selectGameSettings } from '../app/slices/gameSettingsSlice';
import { useState } from 'react';
import useStartGame from '../hooks/useStartGame';

const StartingScreen = () => {
  const { numberOfPlayers, playerColor, difficulty } =
    useSelector(selectGameSettings);
  const startGame = useStartGame();

  const [pressed, setPressed] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card additionalClassnames="p-10 flex flex-col justify-center gap-4">
        <SelectSettings />

        {(!numberOfPlayers || !playerColor || !difficulty) && pressed && (
          <p className="text-lg text-center text-red-600 font-semibold mt-3">
            Select number of players, color and <br />
            difficulty
          </p>
        )}

        <button
          className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-2 text-xl rounded-md"
          onClick={() => {
            setPressed(true);
            if (!numberOfPlayers || !playerColor || !difficulty) return;
            startGame();
          }}
        >
          Play
        </button>
      </Card>
    </div>
  );
};

export default StartingScreen;
