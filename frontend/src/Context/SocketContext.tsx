import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents } from 'watch-tube-backend/events/clientToServerEvents';
import { ServerToClientEvents } from 'watch-tube-backend/events/serverToClientEvents';

type SocketStatus = 'active' | 'error' | 'connecting' | 'unactive';

export interface ISokcketContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  socketStatus: SocketStatus;
}

export const SocketContext = React.createContext<ISokcketContext | null>(null);

type SocketContextProviderProps = {
  children?: React.ReactNode;
  socketServerUrl: string;
};

export const SocketContextProvider = ({
  children,
  socketServerUrl,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  const [socketStatus, setSocketStatus] = useState<SocketStatus>('unactive');

  useEffect(() => {
    const socket = io(socketServerUrl) as Socket<
      ServerToClientEvents,
      ClientToServerEvents
    >;
    socket.on('connect', () => setSocketStatus('active'));
    socket.on('connect_error', () => setSocketStatus('error'));
    setSocketStatus('connecting');
    socket.connect();
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, socketStatus }}>
      {children}
    </SocketContext.Provider>
  );
};
