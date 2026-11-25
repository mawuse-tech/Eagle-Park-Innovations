import women from "../../assets/about/women.jpg";
import OurStory from "./OurStory";
import MissionVision from "./MissionVission";
import PageIntro from "@/src/Components/design/PageIntro";
// import Team from './AboutTeam';

export default function OurStoryHome() {
  return (
    <div className="editorial-page about-page">
      <PageIntro
        eyebrow="About EPI"
        title={
          <>
            Empowering <br className="max-[767px]:hidden" />
            Farmers Through <br className="max-[767px]:hidden" />
            Integrated Solutions
          </>
        }
        description={
          <p>
            Our convenient end-to-end solution connects farmers to quality
            inputs, extension services, and reliable markets, helping them
            increase yields, earn more, and grow sustainably.
          </p>
        }
        image={women}
        imageAlt="Two women holding maize grown in their farming community"
        action="Discover our story"
        actionPlacement="copy"
        href="#our-story"
      />
      <nav
        className="editorial-width flex justify-center gap-[90px] py-14 max-[767px]:justify-between max-[767px]:gap-0 max-[767px]:py-9"
        aria-label="Explore our story"
      >
        <a
          className="flex flex-col items-center gap-[14px] text-[13px] text-[#386347] max-[767px]:gap-2 max-[767px]:text-[10px]"
          href="#our-story"
        >
          <i
            className="ri-plant-line text-4xl max-[767px]:text-[28px]"
            aria-hidden="true"
          />
          Our story
        </a>
        <a
          className="flex flex-col items-center gap-[14px] text-[13px] text-[#386347] max-[767px]:gap-2 max-[767px]:text-[10px]"
          href="#our-purpose"
        >
          <i
            className="ri-compass-3-line text-4xl max-[767px]:text-[28px]"
            aria-hidden="true"
          />
          Our purpose
        </a>
        {/* <a href="#our-team"><i className="ri-team-line" aria-hidden="true" />Our people</a> */}
        <a
          className="flex flex-col items-center gap-[14px] text-[13px] text-[#386347] max-[767px]:gap-2 max-[767px]:text-[10px]"
          href="/contact"
        >
          <i
            className="ri-shake-hands-line text-4xl max-[767px]:text-[28px]"
            aria-hidden="true"
          />
          Partner with us
        </a>
      </nav>
      <OurStory />
      <MissionVision />
      {/* <Team /> */}
    </div>
  );
}
