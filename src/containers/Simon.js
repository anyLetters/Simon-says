import { connect } from 'react-redux';
import { nextRound, resetRounds } from '../actions';
import Simon from '../components/Simon/simon.js';

function mapStateToProps(state) {
    return {
        difficulty: state.difficulty
    };
}

function mapDispatchToProps(dispatch) {
    return {
        nextRound: () => dispatch(nextRound()),
        resetRounds: () => dispatch(resetRounds())
    };
}

const SimonContainer = connect(mapStateToProps, mapDispatchToProps)(Simon);

export default SimonContainer;