import React, { Component } from 'react';
import logo from './sprites/logo/KeySword.png'
import background from './sprites/backgrounds/stonebackground.jpg'

class GameHeader extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundImage:`url(${background})`
            }}
            >
                <img alt="keysword-logo"src={logo}></img>
            </div>
        )
    }
}
export default GameHeader;