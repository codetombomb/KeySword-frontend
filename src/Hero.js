import React, { Component } from 'react';
import HeroSprite from './sprites/hero.png'

class Hero extends Component {
    constructor(){
        super();
        const hero = new Image()
        hero.src = HeroSprite

        this.state = {
            hero: hero,
            ssColumns: 8,
            ssRows: 7
        }
    }
    
    componentDidMount() {
        this.state.hero.onload = () => {
            this.props.context.drawImage(this.state.hero, 32, 64, 32, 32, 0, 96, 32, 32)
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