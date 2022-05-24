import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io, Socket } from 'socket.io-client';
import { Room } from 'watch-tube-backend/common/Room';
import { ClientToServerEvents } from 'watch-tube-backend/events/clientToServerEvents';
import { ServerToClientEvents } from 'watch-tube-backend/events/serverToClientEvents';

import TextInputDialog from '../Components/TextInputDialog';

const JoinRoomView = () => {
  const { roomId } = useParams();

  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >(undefined);
  const [createRoomEmmited, setCreateRoomEmmited] = useState(false);

  const handleFormSubmit = (userNickName: string) => {
    if (!socket || !socket.active || !roomId) return;
    socket.emit('joinRoom', { roomId, userNick: userNickName });
    setCreateRoomEmmited(true);
    console.log(' submited', userNickName);
  };

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io('localhost:8000');
    socket.connect();
    setSocket(socket);

    socket.on('onRoomChange', (room: Room) => {
      console.log('Created Room: ', room);
    });

    return () => {
      socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <div>
      <TextInputDialog
        open={true}
        onFormSubmit={handleFormSubmit}
        title={`Enter your nick name to join room ${roomId}`}
        inputTitle="nick name"
        submitLabel="Join room"
      />
    </div>
  );
};

export default JoinRoomView;
