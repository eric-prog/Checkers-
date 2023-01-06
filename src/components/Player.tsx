import React from 'react'
import { PlayerModel } from '../models/PlayerModel'


interface PlayerProps{
    player: PlayerModel, 
    color: string
}


function Player(props: PlayerProps) {
  return (
    <>
        <div 
            style={{height: props.player.height + 'px', 
            width: props.player.width + 'px', 
            backgroundColor: props.color,
            borderRadius: "50%"}}>
        </div> 
    </>
  )
}

export default Player
