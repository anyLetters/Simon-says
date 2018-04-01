export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

export function changeDifficulty(difficulty) {
    return {
        type: CHANGE_DIFFICULTY,
        difficulty
    }
}