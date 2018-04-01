import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sound1 from '../../sounds/1.mp3';
import sound2 from '../../sounds/2.mp3';
import sound3 from '../../sounds/3.mp3';
import sound4 from '../../sounds/4.mp3';
import './style.css';

export default class Simon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionToLightUp: 0,
            defeat: false
        };

        this.passedRounds = 0;
        this.isSequenceRunning = false;
        this.active = false;

        this.sounds = {
            1 : new Audio(sound1),
            2 : new Audio(sound2),
            3 : new Audio(sound3),
            4 : new Audio(sound4)
        };

        for(let sound in this.sounds) {
            this.sounds[sound].volume = 0.5;
        }

        this.onClick = this.onClick.bind(this);
        this.startGame = this.startGame.bind(this);
        this.newRound = this.newRound.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
    }

    onClick(section) {
        let {active, sequence, playerAnswers} = this;

        if (active) {
            playerAnswers.push(section);
            const rightAnswer = sequence[playerAnswers.length - 1] === section;
            if (rightAnswer) {
                this.isSequenceDone();
            } else {
                this.defeat();
            }
        }
    }

    startGame() {
        let {active, interval, passedRounds} = this;

        if (active) {
            this.props.resetRounds();
            clearInterval(interval);
        }

        if (passedRounds > 0) this.passedRounds = 0;
        this.setState({defeat: false});

        this.active = true;
        this.sequence = [];
        this.newRound();
    }

    newRound() {
        this.playerAnswers = [];

        this.props.nextRound();
        this.passedRounds++;

        this.sequence.push(this.randomNumber());

        this.runSequence();
    }

    delay(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 1500;
            case 'normal':
                return 1000;
            case 'hard': // на этой сложности звук идущий подряд не успевает воспроизвестись
                return 400;
            default:
                return difficulty;
        }
    }

    runSequence() {
        const {sequence} = this;
        let {difficulty} = this.props;
        let i = 0;
        
        this.isSequenceRunning = true;
        
        this.interval = setInterval(() => {
            this.sounds[sequence[i]].play();
            this.setState({sectionToLightUp: sequence[i]}, () => this.lightOff());

            i++;

            if (i === sequence.length) {
                clearInterval(this.interval);
                this.isSequenceRunning = false;
            }
        }, this.delay(difficulty));
    }

    lightOff() {
        setTimeout(() => {
            this.setState({sectionToLightUp: 0});
        }, 350);
    }

    isSequenceDone() {
        if (this.sequence.length === this.playerAnswers.length) this.newRound();
    }

    defeat() {
        this.active = false;
        this.props.resetRounds();
        this.setState({defeat: true});
    }

    randomNumber() {
        return Math.floor(Math.random() * 4 + 1);
    }

    renderMessage() {
        return <div className='defeat'>You passed {this.passedRounds} rounds</div>;
    }

    render() {
        const {sectionToLightUp, defeat} = this.state;
        const {isSequenceRunning} = this;

        return (
            <div className='simon'>
                {defeat ? this.renderMessage() : null}
                <div className="circle">
                    <div className="upper-halfcircle">
                        <div
                            className={`green ${sectionToLightUp === 1 ? 'light' : ''} ${!isSequenceRunning ? 'active' : ''}`}
                            onClick={isSequenceRunning ? null : () => this.onClick(1)}>
                        </div>
                        <div
                            className={`red ${sectionToLightUp === 2 ? 'light' : ''} ${!isSequenceRunning ? 'active' : ''}`}
                            onClick={isSequenceRunning ? null : () => this.onClick(2)}>
                        </div>
                    </div>
                    <div className="lower-halfcircle">
                        <div
                            className={`yellow ${sectionToLightUp === 3 ? 'light' : ''} ${!isSequenceRunning ? 'active' : ''}`}
                            onClick={isSequenceRunning ? null : () => this.onClick(3)}>
                        </div>
                        <div
                            className={`blue ${sectionToLightUp === 4 ? 'light' : ''} ${!isSequenceRunning ? 'active' : ''}`}
                            onClick={isSequenceRunning ? null : () => this.onClick(4)}>
                        </div>
                    </div>
                </div>
                <div>
                    <input 
                        type="button" 
                        onClick={this.startGame}
                        className='play-button' 
                        value='play'/>
                </div>
            </div>
        );
    }
}

Simon.propTypes = {
    difficulty: PropTypes.string.isRequired,
    nextRound: PropTypes.func.isRequired,
    resetRounds: PropTypes.func.isRequired
};