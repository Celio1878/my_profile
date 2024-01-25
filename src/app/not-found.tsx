import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "404-Error",
          priority: true,
        }}
      />

      <div className="w-3/4 flex flex-col gap-4 items-center justify-center">
        <p className="text-4xl text-white underline"> Page Not Found </p>
        <p className="text-zinc-500">
          Sorry! The page that you are looking for doesn&apos;t exist.
        </p>
        <Link
          className="w-1/2 bg-sky-800 py-2 rounded hover:opacity-80 duration-300"
          href="/"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
