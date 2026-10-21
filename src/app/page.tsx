import { VideoHero } from "@/components/sections/VideoHero";
import { WhoBelongs } from "@/components/sections/WhoBelongs";
import { PointsLogic } from "@/components/sections/PointsLogic";
import { RewardsTimeline } from "@/components/sections/RewardsTimeline";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ReferralPanel } from "@/components/sections/ReferralPanel";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <VideoHero />
      <WhoBelongs />
      <PointsLogic />
      <RewardsTimeline />
      <ProjectsPreview />
      <ReferralPanel />
      <ClosingCTA />
    </>
  );
}
