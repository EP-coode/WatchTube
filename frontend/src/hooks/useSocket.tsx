import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents } from 'watch-tube-backend/events/clientToServerEvents';
import { ServerToClientEvents } from 'watch-tube-backend/events/serverToClientEvents';

type SocketStatus = 'active' | 'error' | 'connecting' | 'unactive';

export const useSocket = (): [
  Socket<ServerToClientEvents, ClientToServerEvents>,
  SocketStatus,
] => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io('localhost:8000');
  const [status, setStatus] = useState<SocketStatus>('unactive');

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io('localhost:8000');

    socket.connect();
    setStatus('connecting');

    socket.on('connect', () => setStatus('active'));
    socket.on('connect_error', () => setStatus('error'));

    return () => {
      socket.disconnect();
    };
  }, []);

  return [socket, status];
};
