import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on(
  'timeupdate',
  throttle(function (onPlay) {
    localStorage.setItem('videoplayer-current-time', onPlay.seconds);
  }, 1000)
);

const savedTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(savedTime || 0);
