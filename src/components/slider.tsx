import { FC, ReactElement } from "react";

interface Props {
  items: ReactElement[];
}

export const Slider: FC<Props> = ({ items }) => (
  <>
    {items.map((logo) => (
      <div
        className="flex flex-col items-center justify-center mx-10 hover:underline"
        key={logo.key}
      >
        {logo} {logo.props.alt}
      </div>
    ))}
  </>
);
