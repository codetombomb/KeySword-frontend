
import React, { Component } from 'react';
import TileSheetOne from './sprites/maps/tile_sheet01.png'
import HeroSprite from './sprites/hero.png'
import HeroIdle from './sprites/heroidle.png'
import BossWalk from './sprites/bosswalk.png'

const hero = new Image()

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
            //player sprite
            heroImgSrc: HeroSprite,
            playerX: 32, 
            playerY: 0,
            playerSourceX: 0,
            playerSourceY: 0,
            playerSourceWidth: 25,
            playerSourceHeight: 25,
            playerSourceColumns: 6,
            playerDX: 0,
            playerDY: 105,
            playerSpriteHeight: 20,
            playerSpriteWidth: 14,
            playerCurrentFrame: 0,
            //monster sprite 
            monsterX: 275, 
            monsterY: 51,
            monsterSourceX: 0,
            monsterSourceY: 0,
            monsterSourceColumns: 6,
            monsterDX: 0,
            monsterDY: 100,
            monsterSpriteHeight: 296,
            monsterSpriteWidth: 200,
            monsterCurrentFrame: 0,
            
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
        // const hero = new Image()
        // this.setHeroSprite()
        hero.src = this.state.heroImgSrc
        hero.onload = () => {
            // console.log("drawing hero")
            this.state.context.drawImage(hero, this.state.playerSourceX, this.state.playerSourceY, this.state.playerSpriteWidth, this.state.playerSpriteHeight, this.state.playerDX, this.state.playerDY, this.state.playerSourceWidth, this.state.playerSourceHeight )
        }
        this.updateHero()
        
    }
    
    renderMonster = () => {
        
        const monster = new Image()
        monster.src = BossWalk
        monster.onload = () => {
            this.state.context.drawImage(monster, this.state.monsterSourceX, this.state.monsterSourceY, this.state.monsterSpriteWidth, this.state.monsterSpriteHeight, this.state.monsterX, this.state.monsterY, 45, 45)
        }
        // this.updateMonster()
        
    }
    
    // setHeroSprite = () => {
    //     if (this.state.playerDX < 80) {
    //         hero.src = HeroSprite
    //     } else if (this.state.playerDX = 80) {
    //         debugger
    //         hero.src = HeroIdle
    //     }
    // }
    
    updateHero = () => {
        if (this.state.playerDX < 80) {
    //         // console.log('updating hero')
            let newPos = this.state.playerDX + 1
            let newSourceX = Math.floor(this.state.playerCurrentFrame % this.state.playerSourceColumns) * 16
            this.updateHeroFrame()
            this.setState({
                playerDX: newPos,
                playerSourceX: newSourceX
            })
        }
    //     } else if (this.state.playerDX === 80 && this.state.playerDX !== 81) {
    //         // hero.src = HeroIdle
    //         let newDX = this.state.playerDX + 1
    //         let newSourceHeight = this.state.playerSourceHeight - 2
    //         this.setState({
    //             playerSourceColumns: 4,
    //             playerSourceHeight: newSourceHeight,
    //             playerSourceY: 0,
    //             playerSpriteHeight: 27,
    //             playerSpriteWidth: 16,
    //             playerDX: newDX,
    //             // playerDY: 
    //         })
    //     } else if (this.state.playerDX === 80 ){
    //         debugger
    //         console.log("in the idle frame loop")
    //         this.idleFrame()            
    //     }
    }
 

    // Function that will update the coordinates on the sprite sheet for cutout
    updateHeroFrame = () => {
        if (this.state.stopAnimation % 4 === 0) {
            let newX = Math.floor(++this.state.playerCurrentFrame % this.state.playerSourceColumns)
            this.setState({
                playerCurrentFrame: newX
            })
        }
    }

    idleFrame = () => {
        if (this.state.stopAnimation % 5 === 0) {
            let newX = Math.floor(++this.state.playerCurrentFrame % this.state.playerSourceColumns)
            this.setState({
                playerCurrentFrame: newX
            })
        }
    }





    playGame = () => {
        this.update()
    }

    componentDidUpdate() {
        if (this.props.gameState === true && this.state.stopAnimation === null) {
            this.playGame()
        }
    }



    update = () => {
        console.log("game is running")
        this.renderBackGound()
        this.renderMiddleGround()
        this.renderForeground()
        // this.updateHero()
        this.renderHero()
        this.renderMonster()



        let stopId = window.requestAnimationFrame(this.update)
        // debugger
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


