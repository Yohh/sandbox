"use client";

import { useRouter } from "next/navigation";
import React from "react";

type LinkButtonProps = {
  text: string;
  path: string;
  id?: string;
  active?: boolean;
};

const LinkButton = ({ text, path, id, active = true }: LinkButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={`text-xl font-bold rounded-xl border-t-2 border-b-2 ${
        active
          ? "bg-orange-300 border-t-orange-600 border-b-orange-600 hover:border-t-white hover:bg-orange-700 hover:border-b-white hover:text-white cursor-pointer"
          : "text-gray-600 bg-gray-300 border-t-gray-500 border-b-gray-500 cursor-not-allowed"
      }`}
      disabled={!active}
      onClick={() => router.push(path)}
      id={id}
    >
      <span className="px-2">{text}</span>
    </button>
  );
};

export default LinkButton;
