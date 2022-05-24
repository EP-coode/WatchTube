import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import TextInputDialog from '../Components/TextInputDialog';
import { ClientToServerEvents } from 'watch-tube-backend/events/clientToServerEvents';
import { ServerToClientEvents } from 'watch-tube-backend/events/serverToClientEvents';
import { Room } from 'watch-tube-backend/common/Room';

function CreateRoomView() {
  // TODO make custom hook to remove redundant code
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  >(undefined);
  const [createRoomEmmited, setCreateRoomEmmited] = useState(false);

  const handleFormSubmit = (userNickName: string) => {
    if (!socket || !socket.active) return;
    socket.emit('createRoom', userNickName);
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
    <TextInputDialog
      open={true}
      onFormSubmit={handleFormSubmit}
      title={`Enter your nick name to create room`}
      inputTitle="nick name"
      submitLabel="Create room"
    />
  );
}

export default CreateRoomView;
