'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import connectedServices from '../assets/hero section.jpg';
import happyfarmers from '../assets/happy-farm.jpg';
import maizefarm from '../assets/cornharvest.jpg';
import poultry from '../assets/poultry.jpg';

const images = [connectedServices, happyfarmers, maizefarm, poultry];

export default function HeroSlideshow() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval: ReturnType<typeof setInterval> | undefined;

    const updatePlayback = () => {
      clearInterval(interval);
      if (!isPaused && !motionPreference.matches) {
        interval = setInterval(() => {
          setCurrentImage((current) => (current + 1) % images.length);
        }, 5000);
      }
    };

    updatePlayback();
    motionPreference.addEventListener('change', updatePlayback);
    return () => {
      clearInterval(interval);
      motionPreference.removeEventListener('change', updatePlayback);
    };
  }, [isPaused]);

  return (
    <div className="home-hero-image" role="group" aria-label="Eagle Park farming images">
      <div className="hero-image-window">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={index !== currentImage}
        >
          <Image
            src={image}
            alt="Agriculture and farming at Eagle Park Innovations"
            fill
            priority={index === 0}
            placeholder="blur"
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
      </div>
      <button
        type="button"
        className="hero-slideshow-toggle"
        aria-label={isPaused ? 'Resume image slideshow' : 'Pause image slideshow'}
        onClick={() => setIsPaused((paused) => !paused)}
      >
        <i className={isPaused ? 'ri-play-fill' : 'ri-pause-fill'} aria-hidden="true" />
      </button>
    </div>
  );
}
