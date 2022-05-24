import React, { useEffect } from 'react';
import TextInputDialog from '../Components/TextInputDialog';
import { io } from 'socket.io-client';

function CreateRoomView() {
  const handleFormSubmit = (userNickName: string) => {
    // TODO
  };

  useEffect(() => {
    const socket = io({
      host: 'localhost:8000',
    });
    
    
    return () => {
      socket.disconnect();
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
