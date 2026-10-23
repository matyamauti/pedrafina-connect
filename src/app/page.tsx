import { VideoHero } from "@/components/sections/VideoHero";
import { WhoBelongs } from "@/components/sections/WhoBelongs";
import { PointsLogic } from "@/components/sections/PointsLogic";
import { JourneySteps } from "@/components/sections/JourneySteps";
import { RewardsTimeline } from "@/components/sections/RewardsTimeline";
import { EventsSection } from "@/components/sections/EventsSection";

export default function HomePage() {
  return (
    <>
      <VideoHero />
      <WhoBelongs />
      <PointsLogic />
      <JourneySteps />
      <RewardsTimeline />
      <EventsSection />
    </>
  );
}
