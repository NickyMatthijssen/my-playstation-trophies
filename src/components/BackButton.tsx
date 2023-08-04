"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const { back } = useRouter();

  return (
    <button
      type="button"
      onClick={back}
      className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-neutral-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}
