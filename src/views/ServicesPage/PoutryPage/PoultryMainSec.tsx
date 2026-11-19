import Benefits from "./WhyPoultryPage";
import eggs from "../../../assets/poultry/eggs.webp";
import man from "../../../assets/poultry/Hands.png";
import hens from "../../../assets/poultry/hen.png";
import Image from "next/image";
import { PageCallout } from "@/src/Components/design/PageIntro";
const grains = [
  {
    name: "Fresh Eggs",
    image: eggs,
    description:
      "We produce premium-grade eggs with a focus on freshness, consistency, and food safety. Our hens are raised in a clean, controlled environment with a nutrition-focused diet, ensuring top-tier egg quality for every batch.",
  },
  {
    name: "Compost – Waste to Wealth",
    image: man,
    description:
      "As part of our sustainable farming system, EPI converts poultry waste into nutrient-rich organic fertilizer that enhances soil health and boosts crop yields. Our compost is carefully handled to meet the needs of farmers and gardeners.",
  },
  {
    name: "Live Birds for Chicken Meat",
    image: hens,
    description:
      "We supply healthy, well-raised live chickens ideal for meat. Our birds are raised and managed under strict hygiene, nutrition, and welfare standards, ensuring excellent body weight and meat yield, and taste.",
  },
];

export default function PoultryMainSec() {
  return (
    <>
      <section
        id="poultry-products"
        className="editorial-width py-[88px] max-[767px]:py-14"
      >
        <div className="section-heading">
          <h2>Our Poultry Products</h2>
          <p className="gold-text">
            We provide high-quality poultry products and strengthen nutrition in
            our communities.
          </p>
        </div>
        {grains.map((product) => (
          <article
            className="relative isolate mt-8 flex min-h-[440px] items-center overflow-hidden rounded-[22px] bg-[#163e2a] text-white max-[767px]:min-h-[480px] max-[767px]:items-end"
            key={product.name}
          >
            <div className="absolute inset-0 z-[-2]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 z-[-1] bg-[linear-gradient(90deg,#071c16e8,#071c1626)] max-[767px]:bg-[linear-gradient(0deg,#071c16f5,#071c1633)]" />
            <div className="max-w-[620px] p-16 max-[767px]:px-6 max-[767px]:py-8">
              <h3 className="mb-6 text-[clamp(32px,3.5vw,48px)] leading-[1.1] max-[767px]:text-[32px]">
                {product.name}
              </h3>
              <p className="text-[15px] !text-white">{product.description}</p>
            </div>
          </article>
        ))}
      </section>
      <Benefits />
      <PageCallout
        title={
          <>
            Looking for healthy, high-quality poultry products for food or
            farming?
            <br />
            Look no further — we’ve got you covered.
          </>
        }
        action="Shop Now"
        href="/shop"
      />
    </>
  );
}
