import { FC } from "react";
import { aws_services_logos } from "@/utils/iconsList";
import { Slider } from "@/components/slider";

export const AwsServiceSlider: FC = () => (
  <div className="relative h-full rounded-lg m-auto w-full md:w-9/12 my-10 overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_100%)] after:content-['']">
    <div className="flex animate-infinite-slider w-[calc(350px*20)]">
      <Slider {...{ items: aws_services_logos }} />
      <Slider {...{ items: aws_services_logos }} />
    </div>
  </div>
);
