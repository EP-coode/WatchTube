export interface ClientToServerEvents {
  ping: (response: string) => void;
  createRoom: (userNick: string) => void;
  joinRoom: (joiRoomDto: { userNick: string; roomId: string }) => void;
  seekTo: (time: number) => void;
  setMovie: (ytMovieId: string) => void;
  playMovie: () => void;
  pouseMovie: () => void;
  canPlay: () => void;
  getRoomInfo: (roomId: string) => void;
}
