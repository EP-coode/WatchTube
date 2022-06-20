import { Box, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Movie } from 'watch-tube-backend/common/Movie';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';
import { useYtPlayer } from '../hooks/useYtPlayer';
import { PlayerState } from '../interfaces/IYoutubePlayer';

type Props = {
  movieId: string;
};

const MIN_SEEK_DIFF = 2;

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

  const handleRemotePlay = () => {
    if (player == undefined) return;

    const canPlay = player.getPlayerState() == PlayerState.PAUSED;

    if (canPlay) player.playVideo();
  };

  const handleRemotePouse = () => {
    if (player == undefined) return;

    const canPause = player.getPlayerState() == PlayerState.PLAYING;

    if (canPause) player.pauseVideo();
  };

  const handleRemoteSeek = (progress: number) => {
    if (player == undefined) return;

    const currentTime = player.getCurrentTime();
    const canSeek = Math.abs(progress - currentTime) > MIN_SEEK_DIFF;
    if (canSeek) player.seekTo(progress, true);
  };

  useEffect(() => {
    socket?.on('onPlay', handleRemotePlay);
    socket?.on('onPause', handleRemotePouse);
    socket?.on('onSeekTo', handleRemoteSeek);
    return () => {
      socket?.off('onPlay', handleRemotePlay);
      socket?.off('onPause', handleRemotePouse);
      socket?.off('onSeekTo', handleRemoteSeek);
    };
  }, [socket, player]);

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
