import React, { useContext, useEffect, useState } from 'react';

import TextInputDialog from '../Components/TextInputDialog';
import { Room } from 'watch-tube-backend/common/Room';
import { useNavigate } from 'react-router';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';

function CreateRoomView() {
  // TODO make custom hook to remove redundant code
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;
  const [createRoomEmmited, setCreateRoomEmmited] = useState(false);
  const navigate = useNavigate();

  const navigateToRoomView = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const handleFormSubmit = (userNickName: string) => {
    if (!socket || !socket.active) return;
    socket.emit('createRoom', userNickName);
    setCreateRoomEmmited(true);
    console.log(' submited', userNickName);
  };

  const roomChangeListener = (room: Room) => {
    console.log('Created Room: ', room);
    navigateToRoomView(room.roomId);
  };

  useEffect(() => {
    socket?.on('onRoomChange', roomChangeListener);
    return () => {
      socket?.off('onRoomChange', roomChangeListener);
    };
  }, [socket]);

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
