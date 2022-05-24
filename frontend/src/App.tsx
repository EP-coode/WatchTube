import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TextInputDialog from './Components/TextInputDialog';
import CreateRoomView from './Views/CreateRoomView';
import JoinRoomView from './Views/JoinRoomView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/joinRoom/:roomId" element={<JoinRoomView />} />
        <Route path="/createRoom" element={<CreateRoomView />} />
      </Routes>
    </BrowserRouter>
  );
}
