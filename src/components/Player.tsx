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
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"}}>
            { props.player.special ? 
            <>
              <div style={{height: props.player.height-70 + 'px', 
                width: props.player.width-70 + 'px', 
                backgroundColor: "gold",
                borderRadius: "50%"}}>
              </div>
            </> : null}
        </div> 
    </>
  )
}

export default Player
