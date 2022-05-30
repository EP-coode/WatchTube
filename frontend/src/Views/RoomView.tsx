import React, { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Room } from 'watch-tube-backend/common/Room';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';

const RoomView: FC = () => {
  const { roomId } = useParams();
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;

  const roomChangeListener = (room: Room) => {
    console.log('Changed state of Room: ', room);
  };

  useEffect(() => {
    socket?.on('onRoomChange', roomChangeListener);
    return () => {
      socket?.off('onRoomChange', roomChangeListener);
    };
  }, [socket]);

  return <div>RoomView - {roomId}</div>;
};

export default RoomView;
