import { referral } from "@/content/referral";
import { Button } from "@/components/primitives/Button";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Reveal } from "@/components/motion/Reveal";

export function ReferralPanel() {
  return (
    <section className="bg-pf-black">
      <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr]">
        <div className="flex items-center px-4 py-20 sm:px-8 lg:py-32 xl:px-14">
          <div className="max-w-xl">
            <Eyebrow>{referral.eyebrow}</Eyebrow>
            <Reveal className="mt-6">
              <DisplayTitle>{referral.title}</DisplayTitle>
            </Reveal>
            <p className="mt-10 font-sans text-base leading-relaxed text-pf-cream/70">
              {referral.lead}
            </p>
            <div className="mt-12">
              <Button href="/cadastro">Convidar um profissional</Button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[22rem] lg:min-h-[34rem]">
          <Placeholder
            tone="dark"
            label="Fotografia — encontro de parceiros"
            className="absolute inset-0 h-full w-full"
          />
          <p className="absolute inset-x-8 top-12 font-display text-display-sm font-medium tracking-[-0.025em] text-pf-cream lg:inset-x-14">
            {referral.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
