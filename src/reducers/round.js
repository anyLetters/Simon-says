import { NEXT_ROUND, RESET_ROUNDS } from '../actions';

export default function reducer(state = 0, action) {
    switch (action.type) {
        case NEXT_ROUND:
            return state + 1;

        case RESET_ROUNDS:
            return 0;

        default:
            return state;
    }
}