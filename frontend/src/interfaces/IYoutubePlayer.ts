export interface IYoutubePleyer {
  getDuration: () => number;
  getVideoUrl: () => string;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (ytVideoId: string) => void;
}
