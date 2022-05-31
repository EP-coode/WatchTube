import { jsx } from '@emotion/react';
import React, { useEffect, useMemo, useState } from 'react';
import { randomString } from '../helpers/random';
import { IYoutubePleyer } from '../interfaces/IYoutubePlayer';

export function useYtPlayer(
  ytVideId: string,
  onPlayerStateChange?: (playerState: any) => void,
) {
  const anyWindow = window as any;
  const [player, setPlayer] = useState<any>(undefined);
  const playerId = useMemo(() => randomString(10), []);

  const loadVideo = () => {
    // the Player object is created uniquely based on the id in props
    const player = new anyWindow.YT.Player(`youtube-player-${playerId}`, {
      videoId: ytVideId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange ?? (() => {}),
      },
    });
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  useEffect(() => {
    if (!anyWindow.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      anyWindow.onYouTubeIframeAPIReady = loadVideo;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
  }, []);

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
