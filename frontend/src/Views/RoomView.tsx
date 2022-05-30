import React, { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Room } from 'watch-tube-backend/common/Room';
import ClipBoardCoppyLabel from '../Components/ClipBoardCoppyLabel';
import { ISokcketContext, SocketContext } from '../Context/SocketContext';
import { useYtPlayer } from '../hooks/useYtPlayer';

const RoomView: FC = () => {
  const { roomId } = useParams();
  const { socket, socketStatus } = useContext(SocketContext) as ISokcketContext;
  const [player, PlayerComponent] = useYtPlayer(
    't6isux5XWH0',
    (playerState: any) => {
      console.log('YEE');
    },
  );
  const [player1, PlayerComponent1] = useYtPlayer(
    't6isux5XWH0',
    (playerState: any) => {
      console.log('YEE');
    },
  );

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

  const handleBtnClick = () => {
    player?.playVideo();
  };

  const handleBtnPouseClick = () => {
    player?.pauseVideo();
  };

  return (
    <div>
      RoomView - {roomId}
      <ClipBoardCoppyLabel label={roomJoinLink} textToCoppy={roomJoinLink} />
      {PlayerComponent}
      {PlayerComponent1}
      <button onClick={handleBtnClick}>play</button>
      <button onClick={handleBtnPouseClick}>pouse</button>
    </div>
  );
};

export default RoomView;
