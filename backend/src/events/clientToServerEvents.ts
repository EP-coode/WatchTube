export interface ClientToServerEvents {
  ping: (response: string) => void;
  createRoom: (userNick: string) => void;
  joinRoom: (userNick: string, roomId: string) => void;
}
