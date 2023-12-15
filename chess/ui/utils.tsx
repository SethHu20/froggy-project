import { MutableRefObject, RefObject } from "react";
import { BoardState, Position, ViewModelPieceArray } from "../Types";
import { initialBoardState } from "../BoardState";

export function boardStateToRelativeCoordinates(boardState: BoardState): ViewModelPieceArray {
    return boardState.board.flatMap((row, y) => {
        return row.map((piece, x) => {
            return {
                key: x + y * 8,
                piece,
                position: { x, y }
            }
        })
    });
}

export function relativeToAbsoluteCoordinates(relative: ViewModelPieceArray, origin: Position, size: number): ViewModelPieceArray {
    return relative.map((piece) => {
        return {
            ...piece,
            position: {
                x: origin.x + piece.position.x * size,
                y: origin.y + piece.position.y * size
            }
        }
    })
}

export function populateChessMainUI(pieces: MutableRefObject<ViewModelPieceArray>, rect: DOMRect, forceUpdate: () => void) {
    pieces.current = relativeToAbsoluteCoordinates(
        boardStateToRelativeCoordinates(initialBoardState),
        { x: rect.x, y: rect.y },
        rect.width / 8
    )
    forceUpdate();
}