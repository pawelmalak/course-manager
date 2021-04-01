import React from 'react';
import ReactPlayer from 'react-player';

import classes from './Player.module.css';
import cover from '../../assets/img/cover.png';

const Player = (props) => {

  const coursePath = `http://localhost:5001/uploads/${props.slug}`;

  return (
    <video
      className={classes.Player}
      src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4'
      poster={props.cover ? `${coursePath}/${props.cover}` : cover}
      controls
    >

    </video>

  )
}

export default Player;