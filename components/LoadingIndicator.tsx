import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  isLoading: boolean;
  timeoutMs: number;
};

export function LoadingIndicator({ isLoading, timeoutMs = 700 }) {
  const [showing, setIsShowing] = useState(false);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      timeout = setTimeout(() => setIsShowing(true), timeoutMs);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, timeoutMs]);

  return showing ? <CircularProgress /> : null;
}
