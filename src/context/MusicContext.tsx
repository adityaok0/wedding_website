"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type MusicContextType = {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  muted: boolean;
  started: boolean; // has user triggered music yet?
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/bg.ogg");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = () => {
    audioRef.current?.play();
    setStarted(true);
    setMuted(false);
  };

  const pause = () => {
    audioRef.current?.pause();
    setMuted(true);
  };

  const toggle = () => (muted ? play() : pause());

  return (
    <MusicContext.Provider value={{ play, pause, toggle, muted, started }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}