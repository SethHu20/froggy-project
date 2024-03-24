import React from "react";

export const metadata = {
  title: "Game1 Web",
  description: "Web port of Game1",
  openGraph: {
    title: "Froggy Project - Game1",
    description: "Collection of fun projects made with love",
    type: "website",
  },
};

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
