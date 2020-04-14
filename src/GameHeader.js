import React, { Component } from 'react';
import logo from './sprites/logo/KeySword.png'

class GameHeader extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <img src={logo}></img>
            </div>
        )
    }
}
export default GameHeader;