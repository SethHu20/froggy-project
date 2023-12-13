"use client";

import Image from "next/image";
import { PieceType, get_svg } from "./PieceType";

export default function Piece({
  piece,
  coord,
}: {
  piece: PieceType;
  coord: { x: number; y: number };
}) {
  return (
    <Image
        alt={`${piece.player} ${piece.piece}`}
        src={get_svg(piece)}
        width={50}
        height={50}
      />
  );
}
