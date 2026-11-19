"use client";
import { useState } from "react";
import { getVideoDetails } from "./video";

export default function ArticleVideo({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const video = getVideoDetails(url);
  if (!video) return null;
  if (playing || !video.thumbnailUrl)
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-[#17281d]">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`${video.embedUrl}${playing ? "&autoplay=1" : ""}`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#17281d]">
      <img
        className="h-full w-full object-cover"
        src={video.thumbnailUrl}
        alt=""
        loading="lazy"
      />
      <button
        className="absolute left-1/2 top-1/2 grid h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-red-600 text-[30px] text-white transition hover:scale-[1.06] hover:bg-red-700 max-[700px]:h-[42px] max-[700px]:w-[58px] max-[700px]:text-[26px]"
        type="button"
        aria-label={`Play video: ${title}`}
        onClick={() => setPlaying(true)}
      >
        <i className="ri-play-fill" aria-hidden="true" />
      </button>
    </div>
  );
}
