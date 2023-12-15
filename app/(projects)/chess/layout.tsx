import React from "react";

export const metadata = {
  title: "Chess",
  description: 'A chess UI made with love',
  openGraph: {
    title: 'Froggy Project - Chess',
    description: 'Collection of fun projects made with love',
    type: 'website',
  },
};

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
