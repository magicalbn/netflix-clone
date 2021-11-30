import React from 'react'
import ReactPlayer from 'react-player'


const Player = (props) => {
    
    return (
        <div className='backdrop' onClick={props.backdrop}>
            <div className='player-wrapper'>
                <ReactPlayer url='/rick.mp4' controls muted playing width='100%'
                    height='100%' />
            </div>
        </div>
    )
}

export default Player;