import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setWidth } from '../app/slices/boardSlice';

export default function useWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getClientRects()[0];
      dispatch(setWidth(width));
    }
  }, [ref, dispatch]);
  return ref;
}
