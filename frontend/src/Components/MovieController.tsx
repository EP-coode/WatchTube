import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Movie } from 'watch-tube-backend/common/Movie';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';
import { useYtPlayer } from '../hooks/useYtPlayer';
import { PlayerState } from '../interfaces/IYoutubePlayer';

type Props = {
  movieId: string;
};

export function MovieController({ movieId }: Props) {
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;
  
  const handlePlayerSeek = (progress: number) => {
    socket?.emit('seekTo', progress);
    console.log('seekTo ', progress);
  };

  const hadlePlayerPouse = () => {
    socket?.emit('pouseMovie');
    console.log('pouseMovie ');
  };

  const handlePlayerPlay = () => {
    socket?.emit('playMovie');
    console.log('playMovie ');
  };

  const [player, PlayerComponent] = useYtPlayer(
    movieId,
    handlePlayerPlay,
    hadlePlayerPouse,
    handlePlayerSeek,
  );

  const handleRemotePlayerChange = ({ isPlaying, currentProggres }: Movie) => {
    if (player == undefined) return;

    const state = player.getPlayerState();
    if (isPlaying && state != PlayerState.PLAYING) player.playVideo();
    else player.pauseVideo();

    player?.seekTo(currentProggres, false);
  };

  useEffect(() => {
    socket?.on('onMovieChange', handleRemotePlayerChange);
    return () => {
      socket?.off('onMovieChange', handleRemotePlayerChange);
    };
  }, [socket]);

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
