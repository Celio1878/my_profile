import type { FC } from "react";
import { LoaderCircle } from "lucide-react";

export const Loader: FC = () => (
  <main className="w-full h-screen flex items-center justify-center">
    <LoaderCircle className="animate-spin" size={100} color={"#400d7a"} />
  </main>
);
