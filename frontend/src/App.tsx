import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CreateRoomView from './Views/CreateRoomView';
import JoinRoomView from './Views/JoinRoomView';
import RoomView from './Views/RoomView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateRoomView />} />
        <Route path="/joinRoom/:roomId" element={<JoinRoomView />} />
        <Route path="/room/:roomId" element={<RoomView />} />
      </Routes>
    </BrowserRouter>
  );
}
