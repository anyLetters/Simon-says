export const NEXT_ROUND = 'NEXT_ROUND';
export const RESET_ROUNDS = 'RESET_ROUNDS';

export function nextRound() {
    return {
        type: NEXT_ROUND
    }
}

export function resetRounds() {
    return {
        type: RESET_ROUNDS
    }
}