"use client";

import Image from "next/image";
import { PieceType, get_svg } from "./PieceType";
import { Rnd } from "react-rnd";

export default function Piece({
  piece,
  size,
  origin,
  updatePieceLocation
}: {
  piece: PieceType;
  size: number;
  origin: { x: number; y: number };
  updatePieceLocation: (x: number, y: number) => void;
}) {
  return (
    <Rnd
      size={{ width: size, height: size }}
      position={origin}
      onDragStop={(e, d) => {
        updatePieceLocation(d.x, d.y);
      }}
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
