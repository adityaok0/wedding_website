import { useEffect, useRef } from "react";

export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "audio/bg.ogg";
    };
  }, [src]);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const setVolume = (v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
  };

  return { play, pause, setVolume };
}