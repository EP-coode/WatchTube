import { Box, Grid } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Room } from 'watch-tube-backend/common/Room';
import ClipBoardCoppyLabel from '../Components/ClipBoardCoppyLabel';
import { MovieController } from '../Components/MovieController';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';
import { useYtPlayer } from '../hooks/useYtPlayer';

const RoomView: FC = () => {
  const { roomId } = useParams();
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;
  const [movieId, setMovieId] = useState('t6isux5XWH0');

  const roomChangeListener = (room: Room) => {
    console.log('Changed state of Room: ', room);
  };

  useEffect(() => {
    socket?.on('onRoomChange', roomChangeListener);
    return () => {
      socket?.off('onRoomChange', roomChangeListener);
    };
  }, [socket]);

  const roomJoinLink = `http://localhost:3000/joinRoom/${roomId}`;

  return (
    <Grid container>
      <Grid item xs={12} md={9}>
        SearchBar
      </Grid>
      <Grid item xs={12} md={3}>
        <ClipBoardCoppyLabel label={roomJoinLink} textToCoppy={roomJoinLink} />
      </Grid>
      <Grid item xs={12} md={9} sx={{ height: '80vh' }}>
        <MovieController movieId={movieId} />
      </Grid>
      <Grid item xs={3}>
        Chat
      </Grid>
    </Grid>
  );
};

export default RoomView;
