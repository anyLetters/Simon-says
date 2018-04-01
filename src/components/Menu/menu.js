import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Menu extends Component {
    render() {
        const { round, difficulty, changeDifficulty } = this.props;

        return (
            <div className='menu'>
                <div className="round">
                    <h2>Round: {round}</h2>
                </div>
                <div className="settings">
                    <h2>Difficulty:</h2>
                    <p><input
                        type="radio"
                        disabled={round > 0}
                        onChange={event => changeDifficulty(event.target.value)}
                        checked={difficulty === 'easy'}
                        value='easy'/> easy
                    </p>
                    <p><input
                        type="radio"
                        disabled={round > 0}
                        onChange={event => changeDifficulty(event.target.value)}
                        checked={difficulty === 'normal'}
                        value='normal'/> normal
                    </p>
                    <p><input
                        type="radio"
                        disabled={round > 0}
                        onChange={event => changeDifficulty(event.target.value)}
                        checked={difficulty === 'hard'}
                        value='hard'/> hard
                    </p>
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    round: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    changeDifficulty: PropTypes.func.isRequired
};