import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SocketContextProvider } from './Context/SocketContext';

import CreateRoomView from './Views/CreateRoomView';
import JoinRoomView from './Views/JoinRoomView';
import RoomView from './Views/RoomView';

const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL ?? '127.0.0.1:8000';

export default function App() {
  return (
    <SocketContextProvider socketServerUrl="127.0.0.1:8000">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateRoomView />} />
          <Route path="/joinRoom/:roomId" element={<JoinRoomView />} />
          <Route path="/room/:roomId" element={<RoomView />} />
        </Routes>
      </BrowserRouter>
    </SocketContextProvider>
  );
}
