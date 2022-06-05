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
  const [movieId, setMovieId] = useState('t6isux5XWH0');
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

  useEffect(() => {
    socket?.on('onRoomChange', roomChangeListener);
    if (roomId) socket?.emit('getRoomInfo', roomId);
    return () => {
      socket?.off('onRoomChange', roomChangeListener);
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
              participants={[
                { nickName: 'Joshua', userId: 'asdfg' },
                { nickName: 'Mark', userId: 'asdf2g' },
                { nickName: 'Bob', userId: 'asd43fg' },
              ]}
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
          Chat
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoomView;
