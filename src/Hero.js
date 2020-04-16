import React, { Component } from 'react';
import HeroSprite from './sprites/hero.png'

class Hero extends Component {
    constructor(){
        super();

        this.state = {
            ssColumns: 8,
            ssRows: 7
        }
    }
    
    componentDidMount() {
        const hero = new Image()
        hero.src = HeroSprite
        hero.onload = () => {
            this.props.context.drawImage(hero, 32, 64, 32, this.props.x, this.props.y, 96, 32, 32)
        }
    }




    render() {
        return (
            <div id='hero'>
                {/* {this.renderHero()} */}
            </div>
        )
    }
}
export default Hero;

// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);