import { useDispatch } from 'react-redux';
import usePlaySounds from '../hooks/usePlaySounds';
import Container from './Container';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { AppDispatch } from '../app/store';
import { setPlaySounds } from '../app/slices/gameSettingsSlice';

const Header = () => {
  const playSounds = usePlaySounds();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className="bg-slate-700 text-slate-200 py-3">
      <Container additionalClassnames="flex justify-center gap-8">
        <h1 className="text-center font-bebas text-7xl">Ludo Game</h1>
        <button
          onClick={() => {
            dispatch(setPlaySounds(!playSounds));
          }}
        >
          {playSounds ? (
            <FaVolumeUp size={'2.5rem'} />
          ) : (
            <FaVolumeMute size={'2.5rem'} />
          )}
        </button>
      </Container>
    </header>
  );
};

export default Header;
