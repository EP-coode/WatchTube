export interface ClientToServerEvents {
  ping: (response: string) => void;
  createRoom: (userNick: string) => void;
  joinRoom: (joiRoomDto: { userNick: string; roomId: string }) => void;
}
