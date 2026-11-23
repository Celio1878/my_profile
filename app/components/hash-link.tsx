import type { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router";

interface HashLinkProps {
  /** Target element id on the home page (without '#'). */
  hash: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * Navigates to a home-page section without a full page reload:
 * plain anchor when already on '/', client-side Link otherwise.
 */
export const HashLink: FC<HashLinkProps> = ({ hash, className, children, onClick }) => {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={`/#${hash}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};
