import { printFormattedBoard } from '@utils';
import { isTerminal, getAvailableMoves } from './board';
import { BoardState } from './types';

export const getBestMove = (state: BoardState, maximizing: boolean, depth = 0, maxDepth = -1): number => {
    const childValues: { [key: string]: string } = {};

    const getBestMoveRecursive = (state: BoardState, maximizing: boolean, depth = 0, maxDepth = -1): number => {
        const terminalObject = (isTerminal(state));

        // dieu kien dung (thang/hoa)
        if (terminalObject || depth === maxDepth) {
            if (terminalObject && terminalObject.winner === 'x') {
                return 100 - depth;
            } else if (terminalObject && terminalObject.winner === 'o') {
                return -100 + depth;
            }
            return 0;
        }

        // X
        if (maximizing) {
            let best = -100;
            // lay ra cac o co the di
            getAvailableMoves(state).forEach(index => {
                let child: BoardState = [...state];
                child[index] = "x";
                const childValue = getBestMoveRecursive(child, false, depth + 1);
                best = Math.max(best, childValue);
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue] ? `${childValues[childValue]}, ${index}` : `${index}`;
                }
            });
            if (depth === 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }
            return best;
        }

        // O 
        else {
            let best = 100;
            // lay ra cac o co the di
            getAvailableMoves(state).forEach(index => {
                let child: BoardState = [...state];
                child[index] = "o";
                const childValue = getBestMoveRecursive(child, true, depth + 1);
                best = Math.min(best, childValue);
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue] ? `${childValues[childValue]}, ${index}` : `${index}`;
                }
            });
            if (depth === 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }
            return best;
        }
    }
    return getBestMoveRecursive(state, maximizing, depth, maxDepth);
}