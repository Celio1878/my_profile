import { FC } from "react";

export const Likes: FC = () => (
  <div className="flex flex-col items-center justify-center gap-y-4">
    <h1 className="text-xl font-bold">
      &quot;Test Everything that&apos;s important !!!&quot;
    </h1>
    <p className="w-9/12">
      For me, TDD (Test-Driven Development) is the most important Design
      Pattern, after all, it confirm that what you did works. However, all
      software must deliver at least one thing{" "}
      <span className="font-semibold">Meet customer needs.</span>
    </p>
    <p className="w-9/12">
      I like to play with code, creating projects/features/resources, testing
      new technologies and finding out what we can do with that. Verify how
      design systems/patterns works is funny, and how the better way to
      implements it.
    </p>
    <p>Always updating my knowledge.</p>
  </div>
);
