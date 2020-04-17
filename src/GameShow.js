

import React, { Component } from 'react';
import TileSheetOne from './sprites/maps/tile_sheet01.png'
import HeroSprite from './sprites/hero.png'
// import HeroIdle from './sprites/heroidle.png'
import BossWalk from './sprites/bosswalk.png'
import BossIdle from './sprites/bossidle.png'
import DeadMonster from './sprites/tombstone.png'

const hero = new Image()
const monster = new Image()
const tombstone = new Image()

class GameShow extends Component {
    constructor() {
        super();
        this.state = {
            canvasWidth: 800,
            canvasHeight: 400,
            context: null,
            //player sprite
            heroImgSrc: HeroSprite, //Player sprite sheet image source
            playerSourceX: 0, //Player sprite sheet x coord for cutting start
            playerSourceY: 0, //Player sprite sheet y coord for cutting start
            playerSourceWidth: 175,  //How many pixels we are cutting across form the playerSourceX 
            playerSourceHeight: 140,  //How many pixels we are cutting across form the playerSourceY
            playerSourceColumns: 6, // How many columns (animmations in a row) are in the sprite sheet 
            playerDX: -20, // Player Destination x position on the canvas
            playerDY: 95, // Player Destination y position on the canvas
            playerSpriteWidth: 45, // How wide the sprite will show up on the canvas
            playerSpriteHeight: 40, // How tall the sprite will show up on the canvas
            playerSpeed: .5,
            playerFrameIndex: 0,
            playerFrameSet: [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17]],
            playerFrame: null,

            //monster sprite 
            monsterImgSrc: BossWalk,
            monsterSourceX: 0,
            monsterSourceY: 0,
            monsterSourceWidth: 177,
            monsterSourceHeight: 296,
            monsterSourceColumns: 4,
            monsterDX: 275,
            monsterDY: 62,
            monsterSpriteHeight: 35,
            monsterSpriteWidth: 25,
            monsterSpeed: .3,
            monsterFrameIndex: 0,
            monsterFrame: null,

            //Game attr
            gameRunning: false,
            timeCounter: 120,
            //Animation

            stopAnimation: null,
            count: 0,
            delay: 10,
            //Background 

            tileSheetColumns: 8, //tilesheet dimensions 175 × 141
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

    // Three layers of background
    //1
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
    //2
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
    //3
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

    componentDidMount() {
        const cvs = document.getElementById("gameCanvas")
        // Configure canvas to draw on
        const ctx = cvs.getContext('2d')
        this.setState({ context: ctx })
        //Draw Background
        this.renderBackGound()
        this.renderMiddleGround()
        this.renderForeground()
    }


    componentDidUpdate() {
        if (this.props.gameState === true && this.state.stopAnimation === null) {
            this.playGame()
        }
    }
    //Point of entry for Game loop
    playGame = () => {
        this.update()
    }


    //Main game loop -- calling functions that redraw the stage 60 times per second
    update = () => {
        // console.log("game is running")
        this.renderBackGound()
        this.renderMiddleGround()
        this.renderForeground()
        this.renderHero()
        if(this.props.gameState){
        this.renderMonster()
        } else {
            let newImage = DeadMonster 
            this.setState({
                monsterImgSrc: newImage
            })
            this.renderTombStone()
        }
        let stopId = window.requestAnimationFrame(this.update)
        this.setState({ stopAnimation: stopId })
    }

    renderTombStone = () => {
        tombstone.src = this.state.monsterImgSrc
        tombstone.onload = () => {
            this.state.context.drawImage(tombstone, 0, 0, 1929, 2210, this.state.monsterDX, this.state.monsterDY, 35, 35 )
        }
    }



    renderHero = () => {

        hero.src = this.state.heroImgSrc // Set the hero sprite img src
        hero.onload = () => {
            // console.log(this.state.playerSourceX)
            this.state.context.drawImage(hero, this.state.playerSourceX, this.state.playerSourceY, this.state.playerSourceWidth, this.state.playerSourceHeight, this.state.playerDX, this.state.playerDY, this.state.playerSpriteWidth, this.state.playerSpriteHeight)
            console.log("drawing image")
        }

        if (this.state.playerDX < 80) {
            let newDX = this.state.playerDX + this.state.playerSpeed
            let newCount = this.state.count + 1
            this.setState({
                playerDX: newDX,
                count: newCount
            })
            this.heroWalkOn()
        }
        else if (this.state.playerDX >= 80) {
            let newPlayerSourceY = 140
            this.setState({ playerSourceY: newPlayerSourceY })
            this.heroIdle()
        }
    }

    heroWalkOn = () => {
        if (this.state.stopAnimation % 5 === 0) {
            let newCurrentFrame = this.state.playerFrameIndex + 1
            let newSourceX = (newCurrentFrame % this.state.playerSourceColumns) * this.state.playerSourceWidth
            this.setState({
                playerFrameIndex: newCurrentFrame,
                playerSourceX: newSourceX
            })
        }

    }



    heroIdle = () => {
        if (this.state.stopAnimation % 17 === 0) {
            let newCurrentFrame = this.state.playerFrameIndex + 1
            let newSourceX = (newCurrentFrame % this.state.playerSourceColumns) * this.state.playerSourceWidth
            this.setState({
                playerFrameIndex: newCurrentFrame,
                playerSourceX: newSourceX
            })
        }
    }

    monsterIdle = () => {
        if (this.state.stopAnimation % 10 === 0) {
            let newCurrentMonsterFrame = this.state.monsterFrameIndex + 1
            let newMonsterSrcX = (newCurrentMonsterFrame % this.state.monsterSourceColumns) * this.state.monsterSourceWidth
            this.setState({
                monsterFrameIndex: newCurrentMonsterFrame,
                monsterSourceX: newMonsterSrcX
            })
        }
    }







    renderMonster = () => {
        monster.src = this.state.monsterImgSrc
        monster.onload = () => {
            this.state.context.drawImage(monster, this.state.monsterSourceX, this.state.monsterSourceY, this.state.monsterSourceWidth, this.state.monsterSourceHeight, this.state.monsterDX, this.state.monsterDY, this.state.monsterSpriteWidth, this.state.monsterSpriteHeight )
        }
        if (this.state.monsterDX > 220){
            let newMonsterDX = this.state.monsterDX - this.state.monsterSpeed
            this.setState({
                monsterDX: newMonsterDX
            })
            this.monsterWalkOn()
        } else if(this.state.monsterDX <= 220) {
            let newMonsterSrcWidth = 237
            let newMonsterSrc = BossIdle
            this.setState({
                monsterImgSrc: newMonsterSrc,
                monsterSourceWidth: newMonsterSrcWidth
            })
            this.monsterIdle()
        }
    }

   

    monsterWalkOn = () => {
        if (this.state.stopAnimation % 8 === 0) {
            let newMonsterFrame = this.state.monsterFrameIndex + 1
            let newMonsterSourceX = (newMonsterFrame % this.state.monsterSourceColumns) * this.state.monsterSourceWidth
            this.setState({
                monsterFrameIndex: newMonsterFrame,
                monsterSourceX: newMonsterSourceX
            })
        }
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


