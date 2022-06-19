import React, { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Grid, Skeleton, TextField } from '@mui/material';

import { Room } from 'watch-tube-backend/common/Room';
import ClipBoardCoppyLabel from '../Components/ClipBoardCoppyLabel';
import { MovieController } from '../Components/MovieController';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { ParticipantsManagmentPanel } from '../Components/ParticipantsManagmentPanel';

const RoomView: FC = () => {
  const { roomId } = useParams();
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;
  const [movieId, setMovieId] = useState('rvrZJ5C_Nwg');
  const [roomInfo, setRoomInfo] = useState<Room | undefined>();
  const debouncedMovieId = useDebouncedValue(movieId);

  const roomChangeListener = (room: Room) => {
    console.log('Changed state of Room: ', room);
    setRoomInfo(room);
  };

  // TODO debounce
  const handleMovieIdInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setMovieId(e.target.value);
  };

  const handleRemoteMovieIdChange = (movieId: string) => {
    setMovieId(movieId);
  };

  useEffect(() => {
    socket?.on('onRoomChange', roomChangeListener);
    socket?.on('onMovieChange', handleRemoteMovieIdChange);
    if (roomId) {
      socket?.emit('getRoomInfo', roomId);
    }
    return () => {
      socket?.off('onRoomChange', roomChangeListener);
      socket?.off('onMovieChange', handleRemoteMovieIdChange);
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit('setMovie', debouncedMovieId);
  }, [debouncedMovieId]);

  const roomJoinLink = `http://localhost:3000/joinRoom/${roomId}`;

  return (
    <Grid spacing={1} container>
      <Grid item xs={12} md={9} sx={{ display: 'flex' }}>
        <TextField
          label="YT movie id"
          value={movieId}
          onChange={handleMovieIdInputChange}
          sx={{
            flexGrow: 1,
            // m: 1
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <ClipBoardCoppyLabel
          label={roomJoinLink}
          textToCoppy={roomJoinLink}
          toltipText="Invite link"
        />
      </Grid>
      <Grid item xs={12} md={9} sx={{ height: '80vh' }}>
        <MovieController movieId={debouncedMovieId} />
      </Grid>
      <Grid item container xs={12} md={3}>
        <Grid item xs={12}>
          {roomInfo ? (
            <ParticipantsManagmentPanel
              owner={roomInfo.owner}
              participants={roomInfo.participants}
            />
          ) : (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          {/* Chat */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoomView;
