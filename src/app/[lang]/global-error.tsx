"use client";

import Image from "next/image";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error;
  reset: VoidFunction;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error(error, "ERROR");

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "500-Error",
          priority: true,
        }}
      />
      <div className="w-9/12 flex flex-col gap-4 items-center justify-center">
        <p className="text-4xl text-white underline"> Troubles Happens! </p>
        <div className="w-full flex flex-row gap-4 justify-center">
          <Link
            className="bg-red-500 py-2 px-3 rounded hover:opacity-80 duration-300"
            href="/public"
          >
            Go Back
          </Link>
          <button
            className="flex text-white border border-b-violet-600 border-t-violet-600 border-l-0 border-r-0 rounded-md py-2 px-8 hover:bg-violet-700 duration-300"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
