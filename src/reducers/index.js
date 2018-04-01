import { combineReducers } from 'redux';
import difficulty from './difficulty';
import round from './round';

const reducer = combineReducers({
    difficulty,
    round
});

export default reducer;