import { FC } from "react";

interface Props {
  dict: {
    interests: {
      catchphrase: string;
      the_most_design_pattern: string;
      customer_needs: string;
      something_i_like: string;
      effect_text: string;
    };
  };
}

export const Interests: FC<Props> = ({ dict }) => (
  <div className="flex flex-col items-center justify-center gap-y-4">
    <h1 className="text-xl font-bold">{dict.interests.catchphrase} !!!</h1>
    <p className="w-9/12">
      {dict.interests.the_most_design_pattern}{" "}
      <span className="font-semibold">{dict.interests.customer_needs}.</span>
    </p>
    <p className="w-9/12">{dict.interests.something_i_like}.</p>
    <p>{dict.interests.effect_text}.</p>
  </div>
);
