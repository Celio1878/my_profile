import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import { Cloud, Code2, FolderOpen, SquareArrowOutUpRight } from "lucide-react";

const BysMobileImages = [
  { src: "/bys-home-mobile.png", cap: "Mobile — Home" },
  { src: "/book-bys-search-mobile.png", cap: "Mobile — Search results" },
];

const BysTableImages = [
  { src: "/bys-ipad-search.png", cap: "iPad — Search feed" },
  { src: "/bys-ipad-user.png", cap: "iPad — User profile" },
];

export function Showcase() {
  return (
    <>
      {/* ── BYS Showcase ─────────────────────────────────────────────── */}
      <Section
        id="bys-showcase"
        title="Be Your Stories — Screenshots"
        icon={<FolderOpen size={18} />}
      >
        <div className="space-y-6">
          <Reveal>
            <figure className="w-full">
              <img
                src="/bys-banner.png"
                alt="Be Your Stories banner with logo between two open books"
                className="w-full rounded-xl shadow-md border border-gray-200 dark:border-gray-800"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground">
                BYS banner
              </figcaption>
            </figure>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="grid grid-cols-2 gap-2">
              {BysMobileImages.map((img, i) => (
                <Reveal key={i} delay={i * 60}>
                  <figure className="w-full">
                    <img
                      src={img.src}
                      alt={`BYS screenshot — ${img.cap}`}
                      className="max-w-55 sm:max-w-65 w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                      loading="lazy"
                    />
                    <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                      {img.cap}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            {BysTableImages.map((img, i) => (
              <Reveal key={i} delay={i * 60}>
                <figure className="w-full">
                  <img
                    src={img.src}
                    alt={`BYS screenshot — ${img.cap}`}
                    className="max-w-130 w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                    loading="lazy"
                  />
                  <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                    {img.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="pt-2 space-x-2">
            <a
              href="https://beyourstories.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
            >
              BYS on Web <SquareArrowOutUpRight size={14} aria-hidden="true" />
            </a>
            <a
              href="https://apps.apple.com/app/be-your-stories/id6748356526"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
            >
              BYS on iOS <SquareArrowOutUpRight size={14} aria-hidden="true" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.celio1878.beyourstories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
            >
              BYS on Android{" "}
              <SquareArrowOutUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Section>

      {/* ── NodeJS App Builder ───────────────────────────────────────── */}
      <Section
        id="nodejs-appbuilder"
        title="NodeJS App Builder — Screenshots"
        icon={<Code2 size={18} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { src: "/express-app-builder-tests.png", cap: "Tests overview" },
            {
              src: "/express-app-builder-pkgs.png",
              cap: "Packages and scripts",
            },
          ].map((img, i) => (
            <Reveal key={i} delay={i * 60}>
              <figure className="w-full">
                <img
                  src={img.src}
                  alt={`NodeJS App Builder screenshot — ${img.cap}`}
                  className="w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                  loading="lazy"
                />
                <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                  {img.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CDK Factory ──────────────────────────────────────────────── */}
      <Section
        id="cdk-factory"
        title="CDK Factory — Screenshots"
        icon={<Cloud size={18} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{ src: "/cdk-factory-items.png", cap: "Library files" }].map(
            (img, i) => (
              <Reveal key={i} delay={i * 60}>
                <figure className="w-full">
                  <img
                    src={img.src}
                    alt={`CDK Factory screenshot — ${img.cap}`}
                    className="w-full mx-auto rounded-xl object-contain border border-gray-200 dark:border-gray-800 shadow-sm"
                    loading="lazy"
                  />
                  <figcaption className="mt-1 text-xs text-muted-foreground text-center">
                    {img.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ),
          )}
        </div>
      </Section>
    </>
  );
}
