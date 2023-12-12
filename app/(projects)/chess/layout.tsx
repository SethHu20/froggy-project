import React from "react";

export const metadata = {
  title: "Chess",
};

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
