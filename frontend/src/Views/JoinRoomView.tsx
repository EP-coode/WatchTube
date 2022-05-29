import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Room } from 'watch-tube-backend/common/Room';

import TextInputDialog from '../Components/TextInputDialog';
import { useSocket } from '../hooks/useSocket';

const JoinRoomView = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [socket, socketStatus] = useSocket();
  const [createRoomEmmited, setCreateRoomEmmited] = useState(false);

  const navigateToRoomView = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const handleFormSubmit = (userNickName: string) => {
    if (!socket || !socket.active || !roomId) return;
    socket.emit('joinRoom', { roomId, userNick: userNickName });
    setCreateRoomEmmited(true);
    console.log(' submited', userNickName);
  };

  useEffect(() => {
    if (socketStatus != 'active') return;

    socket.on('onRoomChange', (room: Room) => {
      console.log('Joined Room: ', room);
      navigateToRoomView(room.roomId);
    });
  }, [socketStatus]);

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
