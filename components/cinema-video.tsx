"use client";

import { useEffect, useRef, type ReactNode, type VideoHTMLAttributes } from "react";
import { useCinemaPolicy } from "@/lib/cinema";

type CinemaVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay"> & {
  sources?: Array<{ src: string; type: string; media?: string }>;
  posterStill?: string;
  children?: ReactNode;
};

export function CinemaVideo({ sources = [], posterStill, children, className, ...props }: CinemaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, saveData } = useCinemaPolicy();
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || saveData) {
      video?.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, saveData]);

  if (reducedMotion) {
    return <div className={`cinema-still ${className ?? ""}`} style={{ backgroundImage: `url(${posterStill || props.poster || ""})` }} role="img" aria-label={props["aria-label"] ?? "HUBB still"} />;
  }

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      autoPlay={!saveData}
      preload={saveData ? "none" : "metadata"}
      poster={props.poster}
      {...props}
      onPause={(event) => {
        if (!event.currentTarget.ended) userPaused.current = true;
        props.onPause?.(event);
      }}
      onPlay={(event) => {
        userPaused.current = false;
        props.onPlay?.(event);
      }}
    >
      {sources.map((source) => (
        <source key={`${source.type}-${source.src}`} src={source.src} type={source.type} media={source.media} />
      ))}
      {children}
    </video>
  );
}
