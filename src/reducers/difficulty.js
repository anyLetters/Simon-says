import { CHANGE_DIFFICULTY } from '../actions';

export default function reducer(state = 'normal', action) {
    switch (action.type) {
        case CHANGE_DIFFICULTY:
            return action.difficulty;

        default:
            return state;
    }
}