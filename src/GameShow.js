import React, { Component } from 'react';
import TileSheetOne from './sprites/maps/tile_sheet01.png'
import HeroSprite from './sprites/hero.png'

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
            gameRunning: false,
            timeCounter: 120,
            stopAnimation: null,
            playerX: 32,
            playerY: 0,
            playerSourceX: 32,
            playerSourceY: 64,
            playerSourceColumns: 6,
            playerDX: 0,
            playerDY: 95,
            playerCurrentFrame: 0,

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
                64, 64, 64, 64, 64, 64, 64, 64, 61, 63, 64, 64, 64, 64, 64, 64, 64, 64, 64,
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

    componentDidMount() {
        // debugger;
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
                let source_x = (worldMatrix % this.state.tileSheetColumns) * this.state.tileWidth
                let source_y = Math.floor(worldMatrix / this.state.tileSheetColumns) * this.state.tileHeight
                let destination_x = (i % this.state.matrixColumns) * this.state.tileWidth
                let destination_y = Math.floor(i / this.state.matrixColumns) * this.state.tileHeight
                this.state.context.drawImage(tile, source_x, source_y, 16, 16, destination_x, destination_y, this.state.tileWidth, this.state.tileHeight)
                //        void ctx.drawImage(image,      sx,       sy, sWidth, sHeight,            dx,            dy,              bdWidth,               dHeight);
            }
        }
    }

    renderHero = () => {
            // debugger
            const hero = new Image()
            hero.src = HeroSprite
            hero.onload = () => {
                console.log("drawing hero")
                this.state.context.drawImage(hero, this.state.playerSourceX, this.state.playerSourceY, 32, 32, this.state.playerDX, this.state.playerDY, 32, 32)
            }

    }

    updateHero = () => {
        if (this.state.playerDX < 70) {
            console.log('updating hero')
            let newPos = this.state.playerDX + 0.5
            let newSourceX = Math.floor(this.state.playerCurrentFrame % this.state.playerSourceColumns) * 32
            this.updateFrame()
            this.setState({
                playerDX: newPos,
                playerSourceX: newSourceX
                })
        }
    }
    updateFrame = () => {
        let newX = ++this.state.playerCurrentFrame % this.state.playerSourceColumns
        this.setState({
            playerCurrentFrame: newX
        })
    }





    playGame = () => {
        this.update()
    }

    componentDidUpdate(){
        if(this.props.gameState === true && this.state.stopAnimation === null){
            this.playGame()
        }
    }



    update = () => {
        console.log("game is running")
        this.renderBackGound()
        this.renderMiddleGround()
        this.renderForeground()
        this.updateHero()
        this.renderHero()



        let stopId = window.requestAnimationFrame(this.update)
        debugger
        this.setState({ stopAnimation: stopId })
    }







    render() {
        return (
            <div>
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
                    {/* <Hero context={this.state.context} x={this.state.playerX} y={this.state.playerY} /> */}
                </canvas>

            </div>


        )
    }
}
export default GameShow;


