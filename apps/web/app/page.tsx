import LoginRedirectButton from "@/components/landingPage/loginRedirectButton";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Karol from "@/public/Karol_Krupiak-koncert.jpg";
import Kartky from "@/public/Kartky-koncert.jpg";
import breaking_bad from "@/public/breaking-bad-9.jpg";
import Kartky2 from "@/public/Koncert-124-2.jpg";
import kalelarga_martin from "@/public/kalelarga-martin.png";
import pospiechMartin from "@/public/pospiech.png";
import pospiech2 from "@/public/pospiech2.png";
import ye from "@/public/ye.png";
import ye2 from "@/public/ye2.png";
import ye3 from "@/public/ye3.png";
import halo from "@/public/halo.png";
import superwers from "@/public/superwers.png";
import o04 from "@/public/04.png";
import samoboj from "@/public/samoboj.png";
import krj from "@/public/krj.png";
import seppuku from "@/public/seppuku.png";
import seppuku2 from "@/public/seppuku2.png";
import aspoleczny from "@/public/aspoleczny.png";
import trzeciaNocNieSpie from "@/public/3nocNieSpie.png";
import trzeciaNocNieSpie2 from "@/public/3nocNieSpie2.png";
import zleDni from "@/public/zleDni.png";
import intro from "@/public/intro.png";
import podejdePotem from "@/public/podejdePotem.png";
import podejdePotem2 from "@/public/podejdePotem2.png";
import cali from "@/public/cali.png";

export default function Home() {
  const images = [
    Karol.src,
    Karol.src,
    Karol.src,
    Karol.src,
    Kartky.src,
    breaking_bad.src,
    intro.src,
    Kartky2.src,
    kalelarga_martin.src,
    pospiechMartin.src,
    trzeciaNocNieSpie2.src,
    zleDni.src,
    ye2.src,
    pospiech2.src,
    trzeciaNocNieSpie.src,
    podejdePotem.src,
    cali.src,
    superwers.src,
    ye.src,
    halo.src,
    podejdePotem2.src,
    o04.src,
    samoboj.src,
    aspoleczny.src,
    krj.src,
    seppuku.src,
    ye3.src,
    seppuku2.src,
  ];
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        Welcome to the official
        <span className="relative z-20 inline-block rounded-xl bg-brand-light px-4 py-1 text-white backdrop-blur-sm">
          MXR & pokój 126
        </span>{" "}
        storage
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        Click the button below to login and access your files.
      </p>

      <LoginRedirectButton />

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/70" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
