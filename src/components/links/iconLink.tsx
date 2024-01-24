import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  href: string;
  className?: string;
  width?: number;
  height?: number;
}

export const IconLink: FC<Props> = ({
  src,
  alt,
  href,
  width = 50,
  height = 50,
  className = "",
}) => {
  return (
    <Link {...{ className, href, target: "_blank" }}>
      <Image {...{ src, alt, width, height }} />
    </Link>
  );
};
