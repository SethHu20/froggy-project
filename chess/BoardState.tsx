import { BoardState } from "./Types";

export const initialBoardState: BoardState = ({
    board: [
        [
            { player: "black", piece: "rook" },
            { player: "black", piece: "knight" },
            { player: "black", piece: "bishop" },
            { player: "black", piece: "queen" },
            { player: "black", piece: "king" },
            { player: "black", piece: "bishop" },
            { player: "black", piece: "knight" },
            { player: "black", piece: "rook" }
        ],
        [
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
            { player: "black", piece: "pawn" },
        ],
        [],
        [],
        [],
        [],
        
        [
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
            { player: "white", piece: "pawn" },
        ],
        [
            { player: "white", piece: "rook" },
            { player: "white", piece: "knight" },
            { player: "white", piece: "bishop" },
            { player: "white", piece: "queen" },
            { player: "white", piece: "king" },
            { player: "white", piece: "bishop" },
            { player: "white", piece: "knight" },
            { player: "white", piece: "rook" }
        ],
    ]
})