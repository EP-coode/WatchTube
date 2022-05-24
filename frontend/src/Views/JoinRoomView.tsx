import React from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';

import TextInputDialog from '../Components/TextInputDialog';

const JoinRoomView = () => {
  const { roomId } = useParams();

  const handleFormSubmit = (userNickName: string) => {
    // TODO
  };

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
