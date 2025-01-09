import { useEffect, useMemo, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const debouncedValueMemo = useMemo(() => debouncedValue, [debouncedValue]);

  return debouncedValueMemo;
};

export default useDebounce;
