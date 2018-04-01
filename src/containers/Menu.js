import { connect } from 'react-redux';
import { changeDifficulty } from '../actions';
import Menu from '../components/Menu/menu.js';

function mapStateToProps(state) {
    return {
        difficulty: state.difficulty,
        round: state.round
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeDifficulty: difficulty => dispatch(changeDifficulty(difficulty))
    };
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;