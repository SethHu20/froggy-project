"use client";

import clsx from "clsx";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";

export default function SettingsMenu({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <a
        className="text-2xl text-gray-100 hover:bg-blue-100 hover:text-slate-900 p-2 lg:p-3 rounded-full transition-all font-semibold flex flex-row items-center"
        onClick={() => setOpen(!open)}
      >
        <IoMdSettings className="text-3xl" />
        <p className="hidden lg:block ml-4">Settings</p>
      </a>
      <div
        className={clsx(
          open || "hidden",
          "absolute bg-slate-700 top-12 lg:top-14 right-0 rounded-md overflow-clip z-10"
        )}
      >
        {children}
      </div>
    </div>
  );
}
