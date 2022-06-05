export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5,
}

export interface IYoutubePleyer {
  getDuration: () => number;
  getVideoUrl: () => string;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (ytVideoId: string) => void;
  getPlayerState: () => PlayerState;
  getCurrentTime: () => number; 
  cueVideoById: (videoId: string, startSeconds?: number) => void;
}
