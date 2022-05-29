import React, { useEffect, useState } from 'react';

import TextInputDialog from '../Components/TextInputDialog';
import { Room } from 'watch-tube-backend/common/Room';
import { useNavigate } from 'react-router';
import { useSocket } from '../hooks/useSocket';

function CreateRoomView() {
  // TODO make custom hook to remove redundant code
  const [socket, socketStatus] = useSocket();
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

  useEffect(() => {
    if (socketStatus != 'active') return;

    socket.on('onRoomChange', (room: Room) => {
      console.log('Created Room: ', room);
      navigateToRoomView(room.roomId);
    });
  }, [socketStatus]);

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
