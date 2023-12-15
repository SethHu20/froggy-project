"use client";

import Image from "next/image";
import { get_svg } from "./SVG";
import { Rnd } from "react-rnd";
import { PlayerPiece, Position } from "../Types";

export default function Piece({
  piece,
  size,
  position,
  onDragStop,
}: {
  piece: PlayerPiece;
  size: number;
  position: { x: number; y: number };
  onDragStop: (_: any, data: Position) => void;
}) {
  return (
    /**
     * React-rnd is a resizable (which I'm not using here, but the size is still
     * determined by ChessMainUI depending on the viewport size) and draggable
     * component utility library. The size, position, and onDragStop props are
     * used to determine the size, position, and callback for when the piece is
     * dragged, respectively. The bounds prop is set to "parent" so that the
     * piece cannot be dragged outside of the viewport.
     */
    <Rnd
      size={{ width: size, height: size }}
      position={position}
      onDragStop={onDragStop}
      bounds="parent"
      enableResizing={false}
      enableUserSelectHack={true}
    >
      <Image
        alt={`${piece.player} ${piece.piece}`}
        src={get_svg(piece)}
        fill
        sizes="100%"
        className="pointer-events-none"
      />
    </Rnd>
  );
}
