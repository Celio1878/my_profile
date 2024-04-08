import { FC } from "react";
import { MyPackages } from "@/components/myPackages";

interface Props {
  dict: { side_hustles: { description: string } };
}

export const SideHustles: FC<Props> = ({ dict }) => (
  <div className="flex flex-col items-center justify-center gap-y-6">
    <p>{dict.side_hustles.description}.</p>
    <MyPackages />
  </div>
);
