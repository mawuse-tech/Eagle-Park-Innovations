"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import smilingFarmer from "../../../assets/Smiling Farmer.png";
import styles from "./TrainingRequestActions.module.css";

const benefits = [
  ["ri-calendar-2-line", "Flexible scheduling around your needs"],
  ["ri-group-line", "Tailored to your topic and audience"],
  ["ri-map-pin-line", "On-site or virtual delivery"],
];

const steps = [
  {
    icon: "ri-file-edit-line",
    title: "Send Your Request",
    description:
      "Share your topic, type of support (training or consultancy), target group and preferred timing.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Confirm the Plan",
    description:
      "We discuss your needs and agree on the scope, schedule, location (on-site or online) and cost.",
  },
  {
    icon: "ri-presentation-line",
    title: "Get the Service",
    description:
      "We deliver practical, results-focused training or consultancy and provide follow-up support.",
  },
];

export default function TrainingRequestActions() {
  const drawer = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className={styles.actions}>
        <Link href="/news#events" className={styles.heroAction}>
          <i className="ri-calendar-2-line" aria-hidden="true" />
          See Upcoming Events
        </Link>
        <button
          type="button"
          className={styles.heroAction}
          aria-haspopup="dialog"
          onClick={() => drawer.current?.showModal()}
        >
          <i className="ri-team-line" aria-hidden="true" />
          Request Training and Consultancy Services
        </button>
      </div>

      <dialog
        ref={drawer}
        className={styles.drawer}
        aria-labelledby="training-request-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div>
          <div className={styles.closeBar}>
            <button
              type="button"
              className={styles.close}
              aria-label="Close training request"
              onClick={() => drawer.current?.close()}
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>
          </div>

          <div className={styles.overview}>
            <div className={styles.intro}>
              <h2 id="training-request-title">
                Request Training and Consultancy Services
              </h2>
              <p>
                Need training, technical advice, or support in sustainable
                agriculture, crop production, poultry farming, or agribusiness
                for your team, farmer group, or organisation? We make it simple,
                flexible, and convenient.
              </p>
              <ul className={styles.benefits}>
                {benefits.map(([icon, label]) => (
                  <li key={label}>
                    <i className={icon} aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.photo}>
              <Image
                src={smilingFarmer}
                alt="Smiling farmer using a tablet in a crop field"
                fill
                sizes="(max-width: 700px) 100vw, 500px"
              />
            </div>
          </div>

          <div className={styles.instructions}>
            <h3>How to Request</h3>
            <ol className={styles.steps} role="list">
              {steps.map(({ icon, title, description }, index) => (
                <li key={title}>
                  <span className={styles.number} aria-hidden="true">
                    {index + 1}
                  </span>
                  <i className={icon} aria-hidden="true" />
                  <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/contact#contact-form" className={styles.request}>
              <i className="ri-send-plane-line" aria-hidden="true" />
              Request now
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
