import Link from 'next/link';

const phases = [
  ['Before planting', 'Prepare', 'Access quality seed and appropriate production inputs.'],
  ['Planting to growth', 'Grow', 'Apply practical agronomic guidance and field support.'],
  ['Mid-season', 'Strengthen', 'Use climate-smart practices to support resilient production.'],
  ['Harvest & beyond', 'Connect', 'Link harvested produce to aggregation and market opportunities.'],
];

const reasons = [
  ['One point of support', 'Related services are coordinated through one farmer-focused approach.'],
  ['Tailored to need', 'The bundle can reflect the crop, farm, and production context.'],
  ['Continuity', 'Support follows the farmer across key stages of the season.'],
  ['Beyond production', 'The approach extends from farm support to post-harvest opportunities.'],
];

const steps = [
  ['Tell Us What You Need', 'Share your crop, location, farm size, and the support you are looking for.'],
  ['Build Your Bundle', 'EPI works with you to identify the combination of inputs, training, and production support suited to your needs.'],
  ['Grow and Connect', 'Put the support into practice and explore appropriate aggregation and market-linkage opportunities after harvest.'],
];

const questions = [
  ['What can be included in a bundle?', 'A bundle can combine quality inputs, practical training, climate-smart production support, and market-linkage services depending on your needs.'],
  ['Does every farmer receive the same bundle?', 'No. The bundled-services approach is flexible and can be adapted to the farmer’s crop and production needs.'],
  ['Can farmer groups and organisations request a bundle?', 'Yes. EPI can work with individual farmers, farmer groups, and organisations seeking integrated agricultural support.'],
  ['How do I get started?', 'Contact EPI and share information about your farm, group, or programme needs. We can then discuss an appropriate combination of services.'],
];

export default function SeedMainSec() {
  return <>
    <section id="bundle" className="scroll-mt-28 bg-[#f4f7f2] py-16 md:py-20">
      <div className="editorial-width grid gap-10 md:grid-cols-[.72fr_1.28fr] md:gap-16 lg:gap-[75px]">
        <div className="self-start md:sticky md:top-28">
          <span className="inline-block rounded-full bg-white px-3 py-2 text-xs font-black uppercase tracking-[.17em] text-[#17241c]">Your season, supported</span>
          <h2 className="mt-4 text-left">Support at Every Stage of the Season</h2>
          <p className="mt-3">From planting preparation to market linkage.</p>
        </div>
        <div className="ml-2 border-l-2 border-[#41634a] pl-7 md:pl-9">
          {phases.map(([when, title, detail], index) => <article key={title} className={`relative pb-8 ${index === phases.length - 1 ? 'pb-0' : ''}`}>
            <span aria-hidden="true" className="absolute -left-[37px] top-1 size-[18px] rounded-full border-[3px] border-[#183b29] bg-[#edc440] md:-left-[47px]" />
            <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-5">
              <strong className="text-sm text-[#17241c]">{when}</strong>
              <div><h3 className="text-xl font-bold text-[#17241c]">{title}</h3><p className="mt-1 text-sm">{detail}</p></div>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="editorial-width">
        <header className="mb-9 max-w-[900px]">
          <span className="inline-block rounded-full bg-[#f4f7f2] px-3 py-2 text-xs font-black uppercase tracking-[.17em] text-[#17241c]">Why bundled services?</span>
          <h2 className="mt-4">One coordinated approach. Less fragmentation. Better continuity.</h2>
        </header>
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <article className="rounded-[28px] border-l-[6px] border-[#C99724] bg-[#f4f7f2] p-7 md:p-10">
            <span className="mb-5 inline-block rounded-full bg-[#183b29] px-3 py-2 text-[11px] font-black uppercase tracking-[.12em] text-white">Farmer Result</span>
            <p className="text-xl leading-relaxed text-[#17241c] md:text-[22px]">“Having the support connected made it easier to plan and manage the season.”</p>
            <div className="my-5 h-0.5 w-[52px] bg-[#C99724]" />
            <p className="text-sm"><strong className="text-[#17241c]">Farmer testimonial</strong><br />EPI Bundled Services</p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {reasons.map(([title, detail]) => <article key={title} className="rounded-[18px] border border-[#dbe4d8] bg-white p-5">
              <h3 className="mb-1 text-base font-bold text-[#17241c]">{title}</h3><p className="text-[13px]">{detail}</p>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section id="how" className="scroll-mt-28 bg-[#f4f7f2] py-16 md:py-20">
      <div className="editorial-width">
        <header className="mx-auto mb-10 max-w-[720px] text-center">
          <span className="inline-block rounded-full bg-white px-3 py-2 text-xs font-black uppercase tracking-[.17em] text-[#17241c]">Simple process</span>
          <h2 className="mt-4">How It Works</h2><p className="mt-3">A straightforward pathway to build the right support package for your farm.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-3 md:gap-[18px]">
          {steps.map(([title, detail], index) => <article key={title} className="min-h-[220px] rounded-[22px] border border-[#dbe4d8] bg-white p-6 md:p-[30px]">
            <span className="grid size-10 place-items-center rounded-full bg-[#41634a] font-black text-white">{index + 1}</span>
            <h3 className="mt-6 text-xl font-bold text-[#17241c]">{title}</h3><p className="mt-2 text-sm">{detail}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="editorial-width py-8 md:py-10">
      <div className="grid gap-7 rounded-[28px] bg-[#183b29] p-7 text-white md:grid-cols-[1.25fr_.75fr] md:items-center md:gap-10 md:p-12">
        <div><span className="inline-block rounded-full bg-white px-3 py-2 text-xs font-black uppercase tracking-[.17em] text-[#17241c]">Let’s grow together</span><h2 className="mt-4 text-left text-white">Support Built Around Your Farm.</h2><p className="mt-3 !text-[#dce7de]">Whether you are an individual farmer, farmer group, development partner, or buyer, EPI can work with you to build a solution around your needs.</p></div>
        <div className="flex flex-col gap-5">
          <Link href="/contact" className="primary-link !bg-[#C99724] !text-white !border-[#C99724]">Get Your Custom Bundle Today <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
          <Link href="/contact" className="outline-link">Partner with Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="editorial-width max-w-[840px]">
        <header className="mb-7 text-center"><span className="inline-block rounded-full bg-[#f4f7f2] px-3 py-2 text-xs font-black uppercase tracking-[.17em] text-[#17241c]">Need to know more?</span><h2 className="mt-4">Common Questions</h2></header>
        <div>{questions.map(([question, answer]) => <details key={question} className="border-b border-[#dbe4d8] px-1 py-[18px] first:border-t">
          <summary className="cursor-pointer font-bold text-[#17241c]">{question}</summary><p className="mt-3 text-sm">{answer}</p>
        </details>)}</div>
      </div>
    </section>
  </>;
}
