import women from '../../assets/about/women.jpg';
import OurStory from './OurStory';
import MissionVision from './MissionVission';
import PageIntro from '@/src/Components/design/PageIntro';
// import Team from './AboutTeam';

export default function OurStoryHome() {
  return <div className="editorial-page about-page">
    <PageIntro eyebrow="About Eagle Park" title={<>Empowering Farmers Through Integrated Solutions</>} description={<p>Our convenient end-to-end solution connects farmers to quality inputs, extension services, and reliable markets, helping them increase yields, earn more, and grow sustainably.</p>} image={women} imageAlt="Two women holding maize grown in their farming community" action="Discover our story" href="#our-story" />
    <nav className="about-values editorial-width" aria-label="Explore our story"><a href="#our-story"><i className="ri-plant-line" aria-hidden="true" />Our story</a><a href="#our-purpose"><i className="ri-compass-3-line" aria-hidden="true" />Our purpose</a>{/* <a href="#our-team"><i className="ri-team-line" aria-hidden="true" />Our people</a> */}<a href="/contact"><i className="ri-shake-hands-line" aria-hidden="true" />Partner with us</a></nav>
    <OurStory /><MissionVision />
    {/* <Team /> */}
  </div>;
}
