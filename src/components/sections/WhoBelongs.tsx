import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { whoBelongs } from "@/content/program";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import ReactBitsBlurText from "@/components/primitives/ReactBitsBlurText";
import { PartnerWall } from "@/components/sections/PartnerWall";

const editorial = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export function WhoBelongs() {
  return (
    <>
      <section className="relative isolate flex min-h-[45rem] overflow-hidden bg-pf-black sm:min-h-[48rem] lg:min-h-[min(55rem,100svh)]">
        <picture className="absolute inset-0 z-0 opacity-50">
          <source media="(max-width: 639px)" srcSet="/reuniao-arquitetura-mobile.png" />
          <Image
            src="/reuniao-arquitetura.png"
            alt="Profissionais de arquitetura e interiores reunidos em torno de um projeto ao pôr do sol"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-black/25 to-black/20 sm:from-black/55 sm:via-black/20" />

        <Container className="relative z-20 flex flex-col pt-20 pb-28 sm:pt-24 lg:pt-28">
          <div className="max-w-[78rem] [text-shadow:0_2px_24px_rgba(0,0,0,0.42)]">
            <Eyebrow>{whoBelongs.eyebrow}</Eyebrow>
            <h2 className={`${editorial.className} mt-6 max-w-[19ch] text-[clamp(2.65rem,4.8vw,5rem)] leading-[1.12] tracking-[-0.035em] text-[#f1dfbf] sm:mt-8`}>
              <ReactBitsBlurText
                as="span"
                text={whoBelongs.title}
                effect="blur"
                animateBy="words"
                direction="bottom"
                staggerFrom="start"
                trigger="view"
                delay={370}
                stepDuration={0.35}
                blur={15}
                distance={120}
              />
            </h2>
            <div aria-hidden="true" className="mt-8 h-px w-20 bg-pf-gold" />
            <p className="mt-6 max-w-[35ch] font-display text-[clamp(1.125rem,2vw,1.625rem)] leading-snug font-medium tracking-[-0.02em] text-pf-cream sm:max-w-none">
              {whoBelongs.tagline}
            </p>
          </div>
        </Container>
      </section>

      <PartnerWall />
    </>
  );
}
