import { useRef } from 'react'

export function useDebounce(time: number | null) {
  const timer = useRef(null);

  return (fn: () => void) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fn();
      clearTimeout(timer.current)
    }, time ??1000);

    timer.current;
  }
}

