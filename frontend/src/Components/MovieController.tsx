import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';
import { useYtPlayer } from '../hooks/useYtPlayer';

type Props = {
  movieId: string;
};

export function MovieController({ movieId }: Props) {
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;
  const [player, PlayerComponent] = useYtPlayer(movieId);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {PlayerComponent}
    </Box>
  );
}
