import { FC } from "react";
import Link from "next/link";

export const CurrentJob: FC = () => (
  <div>
    <h1 className="text-2xl font-semibold underline mb-4">Current Job</h1>
    <p>
      Currently, I&apos;m working as a{" "}
      <span className="font-semibold">Software Engineer</span> at
      <Link
        href="https://www.itau.com.br"
        className="underline mx-2 hover:text-orange-500 trasition delay-75"
      >
        Itaú Unibanco
      </Link>
      in Payment systems, managing and building new features
    </p>
    <div>Using mainly the AWS services like</div>
  </div>
);
