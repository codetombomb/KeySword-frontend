import React, { Component } from 'react';
import TileSheetOne from './sprites/maps/tile_sheet01.png'

//WILL HAVE TO REMOBVE THIS ONCE THE INFORMATION FOR THE BACKGROUND IMAGE IS CAPTURED FROM THE INITIAL FETCH
import LevelOneBackGround from './sprites/maps/level_one_background.png'

class GameShow extends Component {
    constructor() {
        super();
        this.state = {
            canvasWidth: 800,
            canvasHeight: 400,
            context: null,
            levelBackgroundImage: null,
            tileSheetColumns: 8,
            tileHeight: 16,
            tileWidth: 16,
            matrixColumns: 19,
            foregroundMatrix: [
                64, 64, 43, 35, 17, 28, 20, 64, 64, 64, 64, 64, 64, 64, 64, 43, 4, 17, 17,
                64, 64, 64, 43, 35, 17, 11, 20, 64, 64, 64, 64, 64, 64, 64, 64, 16, 17, 17,
                64, 64, 64, 64, 24, 4, 17, 11, 9, 10, 64, 64, 64, 64, 64, 64, 16, 17, 17,
                64, 64, 64, 64, 64, 24, 25, 25, 25, 44, 64, 64, 64, 64, 64, 64, 43, 4, 17,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 16, 17,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 43, 25,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 19, 9, 9, 9, 9, 9,
                20, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 19, 9, 12, 17, 17, 17, 17, 17,
                11, 9, 9, 9, 9, 9, 9, 20, 64, 64, 19, 12, 17, 17, 17, 17, 17, 17, 17,
                17, 17, 17, 17, 17, 17, 17, 11, 9, 9, 12, 17, 17, 17, 17, 17, 17, 17, 17,
            ],
            middlegroundMatrix: [
                46, 59, 64, 64, 64, 64, 64, 64, 64, 58, 38, 38, 47, 30, 30, 30, 30, 30, 30,
                59, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 58, 38, 47, 30, 30, 30, 30,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 58, 47, 30, 30, 30,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 58, 38, 38, 38,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
                64, 21, 23, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
                64, 29, 54, 51, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
                22, 55, 55, 31, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
                64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
            ],
            backgroundMatrix: [
                33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33,
                40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40,
                41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41,
                48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48,
                49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49,
                57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57,
                56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56,
                56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56,
                56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56,
                56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56,

            ]
        }
    }

    /*
    00 01 02 03 04 05 06 07
    08 09 10 11 12 13 14 15 
    16 17 18 19 20 21 22 23
    24 25 26 27 28 29 30 31
    32 33 34 35 36 37 38 39
    40 41 42 43 44 45 46 47 
    48 49 50 51 52 53 54 55
    56 57 58 59 60 61 62 63 
   
    */
    componentDidMount() {
        const cvs = document.getElementById("gameCanvas")
        const ctx = cvs.getContext('2d')
        this.setState({ context: ctx })
        this.renderBackGound()
        this.renderMiddleGround()
        this.renderForeground()
    }



    renderBackGound = () => {
        const bgTile = new Image()
        bgTile.src = TileSheetOne
        bgTile.onload = () => {

            for (let i = this.state.backgroundMatrix.length - 1; i > -1; --i) {
                let worldMatrix = this.state.backgroundMatrix[i]
                let source_x = (worldMatrix % this.state.tileSheetColumns) * this.state.tileWidth
                let source_y = Math.floor(worldMatrix / this.state.tileSheetColumns) * this.state.tileHeight
                let destination_x = (i % this.state.matrixColumns) * this.state.tileWidth
                let destination_y = Math.floor(i / this.state.matrixColumns) * this.state.tileHeight
                this.state.context.drawImage(bgTile, source_x, source_y, 16, 16, destination_x, destination_y, this.state.tileWidth, this.state.tileHeight)
            }
        }
    }

    renderMiddleGround = () => {
        const mgTile = new Image()
        mgTile.src = TileSheetOne
        mgTile.onload = () => {

            for (let i = this.state.middlegroundMatrix.length - 1; i > -1; --i) {

                let worldMatrix = this.state.middlegroundMatrix[i]
                let source_x = (worldMatrix % this.state.tileSheetColumns) * this.state.tileWidth
                let source_y = Math.floor(worldMatrix / this.state.tileSheetColumns) * this.state.tileHeight
                let destination_x = (i % this.state.matrixColumns) * this.state.tileWidth
                let destination_y = Math.floor(i / this.state.matrixColumns) * this.state.tileHeight
                this.state.context.drawImage(mgTile, source_x, source_y, 16, 16, destination_x, destination_y, this.state.tileWidth, this.state.tileHeight)
            }
        }

    }

    renderForeground = () => {
        const tile = new Image()
        tile.src = TileSheetOne
        tile.onload = () => {

            for (let i = this.state.foregroundMatrix.length - 1; i > -1; --i) {

                let worldMatrix = this.state.foregroundMatrix[i]
                console.log(`WorldMatrix ${worldMatrix}`)

                let source_x = (worldMatrix % this.state.tileSheetColumns) * this.state.tileWidth
                console.log(`source_x${source_x}`)

                let source_y = Math.floor(worldMatrix / this.state.tileSheetColumns) * this.state.tileHeight
                console.log(`source_y${source_y}`)

                let destination_x = (i % this.state.matrixColumns) * this.state.tileWidth
                console.log(`destination_x${destination_x}`)

                let destination_y = Math.floor(i / this.state.matrixColumns) * this.state.tileHeight
                console.log(`destination_y${destination_y}`)
                // debugger
                this.state.context.drawImage(tile, source_x, source_y, 16, 16, destination_x, destination_y, this.state.tileWidth, this.state.tileHeight)
                //        void ctx.drawImage(image,      sx,       sy, sWidth, sHeight,            dx,            dy,              bdWidth,               dHeight);
            }
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
                backgroundColor: 'grey'
            }}
            >

            </canvas>
        )
    }
}
export default GameShow;


//NOTES:
// The hard numbers to drawImage for level one background is: 300x150