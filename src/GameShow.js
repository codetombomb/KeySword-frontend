import React, { Component } from 'react';

//WILL HAVE TO REMOBVE THIS ONCE THE INFORMATION FOR THE BACKGROUND IMAGE IS CAPTURED FROM THE INITIAL FETCH
import LevelOneBackGround from './sprites/maps/level_one_background.png'

class GameShow extends Component {
    constructor() {
        super();
        this.state = {
            canvasWidth: 400,
            canvasHeight: 400,
            context: null,
            levelBackgroundImage: null,
            tileSheetColumns: 0,
            tileHeight: 0,
            tileWidth: 0,
            matrixColumns: 0,
            matrix: []
        }
    }

    componentDidMount() {
        const cvs = document.getElementById("gameCanvas")
        const ctx = cvs.getContext('2d')
        this.setState({ context: ctx  })
        this.renderBackGound()
    }

    renderBackGound = () => {
        const bg = new Image()
        bg.src = LevelOneBackGround
        // debugger;
            bg.onload = () => {
                
                this.state.context.drawImage(bg, 0, 0, 300, 150)

            }
    }
    render() {
        return (
            <canvas id="gameCanvas" style={{
                width: `${this.state.canvasWidth}px`,
                height: `${this.state.canvasHeight}px`,
                paddingRight: '0',
                paddingLeft: '0',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                border: "20px solid white",
                backgroundColor: 'lightGreen'
            }}
            >

            </canvas>
        )
    }
}
export default GameShow;


//NOTES:
// The hard numbers to render the level one background image on the fixed canvas size is: 300x150