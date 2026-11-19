import Link from "next/link";

const services = [
  {
    title: "Bundled Services",
    icon: "ri-seedling-line",
    text: "Timely access to quality inputs, expert extension services, and reliable markets to increase yields and grow sustainably.",
    href: "/seed",
  },
  {
    title: "Grain Aggregation",
    icon: "ri-plant-line",
    text: "Quality grains, fair prices, and reliable markets. Connecting farmers to opportunity with every harvest.",
    href: "/grain",
  },
  {
    title: "Poultry Farming",
    icon: "ri-sun-line",
    text: "Farm-fresh eggs and responsible production. Turning poultry waste into organic fertilizer for healthier soils.",
    href: "/poultry",
  },
  {
    title: "Training & Consultancy",
    icon: "ri-graduation-cap-line",
    text: "Practical skills and personalized strategies to boost productivity, build resilience, and grow your income.",
    href: "/train",
  },
];

export default function Example() {
  return (
    <section
      className="editorial-width py-20 max-[767px]:py-14"
      aria-labelledby="solutions-heading"
    >
      <div className="center-heading">
        <p className="eyebrow gold-text">
          Connected Solutions. Lasting Growth.
        </p>
        <h2 id="solutions-heading">Grow your future with EPI</h2>
      </div>
      <div className="grid grid-cols-2 gap-10 min-[1200px]:grid-cols-4 max-[767px]:gap-[34px_20px]">
        {services.map((service) => (
          <Link
            className="group flex flex-col items-center text-center"
            key={service.href}
            href={service.href}
          >
            {service.title === "Poultry Farming" ? (
              <svg
                className="mb-6 size-12 fill-current text-[#386347] max-[767px]:mb-[18px]"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <use href="/icons/chick.svg#chick" />
              </svg>
            ) : (
              <i
                className={`${service.icon} mb-6 text-5xl leading-none text-[#386347] max-[767px]:mb-[18px] max-[767px]:text-[38px]`}
                aria-hidden="true"
              />
            )}
            <h3 className="mb-4 text-[21px] leading-[1.15] max-[767px]:text-[19px]">
              {service.title}
            </h3>
            <p className="text-sm text-[#626c65] max-[767px]:text-xs">
              {service.text}
            </p>
            <span
              className="mt-auto pt-5 text-[#386347] transition-transform duration-200 group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              <i className="ri-arrow-right-line" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
