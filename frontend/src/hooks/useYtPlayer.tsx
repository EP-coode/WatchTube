import React, { useEffect, useMemo, useState } from 'react';
import { randomString } from '../helpers/random';
import { IYoutubePleyer, PlayerState } from '../interfaces/IYoutubePlayer';

export function useYtPlayer(
  ytVideId: string,
  onPlay?: () => void,
  onPouse?: () => void,
  onSeek?: (proggres: number) => void,
) {
  const anyWindow = window as any;
  const [player, setPlayer] = useState<undefined | IYoutubePleyer>(undefined);
  const playerId = useMemo(() => randomString(10), []);

  const onYoutubeLoad = () => {
    const handlePleyerStateChange = ({ data }: any) => {
      if (player == undefined) return;
      const newPlayerState = data;
      const currentTime = player.getCurrentTime();

      if (newPlayerState == PlayerState.PLAYING) onPlay?.();
      else if (newPlayerState == PlayerState.PAUSED) onPouse?.();
      else if (newPlayerState == PlayerState.BUFFERING) onSeek?.(currentTime);
    };

    // the Player object is created uniquely based on the id in props
    const player = new anyWindow.YT.Player(`youtube-player-${playerId}`, {
      videoId: ytVideId,
      events: {
        onReady: onPlayerReady,
        onStateChange: handlePleyerStateChange,
      },
    });
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
  };

  useEffect(() => {
    console.log(`New movie: ${ytVideId}`);
  
    if (!anyWindow.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      anyWindow.onYouTubeIframeAPIReady = onYoutubeLoad;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    player?.cueVideoById(ytVideId);
  }, [ytVideId]);

  return [
    player,
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        id={`youtube-player-${playerId}`}
      />
    </div>,
  ] as [IYoutubePleyer | undefined, JSX.Element];
}
