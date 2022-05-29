import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { Room } from 'watch-tube-backend/common/Room';
import { useSocket } from '../hooks/useSocket';

const RoomView: FC = () => {
  const { roomId } = useParams();
  const [socket, socketStatus] = useSocket();

  useEffect(() => {
    socket.on('onRoomChange', (room: Room) => {
      console.log('roomChange', room);
    });
    socket.onAny(() => {
      'YEE';
    });
  }, []);

  return <div>RoomView - {roomId}</div>;
};

export default RoomView;
