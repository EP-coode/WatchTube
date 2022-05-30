import { jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { randomString } from '../helpers/random';
import { IYoutubePleyer } from '../interfaces/IYoutubePlayer';

export function useYtPlayer(
  ytVideId: string,
  onPlayerStateChange: (playerState: any) => void,
) {
  const anyWindow = window as any;
  const [player, setPlayer] = useState<any>(undefined);
  const playerId = randomString(10);

  const loadVideo = () => {
    // the Player object is created uniquely based on the id in props
    const player = new anyWindow.YT.Player(`youtube-player-${playerId}`, {
      videoId: ytVideId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
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
  }, [playerId]);

  return [
    player,
    <div>
      <div id={`youtube-player-${playerId}`} />
    </div>,
  ] as [IYoutubePleyer | undefined, JSX.Element];
}
