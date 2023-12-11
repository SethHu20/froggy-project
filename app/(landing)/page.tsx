import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-4 text-white">
      <h1 className="text-5xl text-center">Welcome To The Froggy project!</h1>

      <p className="text-xl">We host degenerate projects here</p>
    </main>
  );
}
