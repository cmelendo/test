import React, { useRef, useState } from "react";

const COVER_IMG = "https://ext.same-assets.com/1082485443/4152031124.jpeg";

const TRACKS = [
  {
    title: "WW3 (feat. Dave Blunts) 🅴",
    src: "https://drive.google.com/uc?export=download&id=1FIujX-7In47a7jqIC3Lgce8rR56B7oJ0",
    date: "May 12",
  },
  {
    title: "COSBY 🅴",
    src: "https://drive.google.com/uc?export=download&id=1EbySxwB2XhbmOx3W7V3CjQPWnxOrSgpW",
    date: "May 12",
  },
  {
    title: "COUSINS 🅴",
    src: "https://drive.google.com/uc?export=download&id=1z6jGwRCe6mnboJsJzqyDkL8iRm6rP1Lx",
    date: "May 12",
  },
  {
    title: "FREE DDY 🅴 (SNIPPET)",
    src: "https://drive.google.com/uc?export=download&id=1AF2sMcb-lvcTTo9AD_vR1gI1SKGnc3mh",
    date: "May 12",
  },
  {
    title: "DIRTY MAGAZINES 🅴",
    src: "https://drive.google.com/uc?export=download&id=1AjPtkj9qYj7Ic7oRPT46SLT1lAI5QQbJ",
    date: "May 12",
  },
  {
    title: "BIANCA 🅴",
    src: "https://drive.google.com/uc?export=download&id=1hYmBVAKl7416YOVXu6vebeBKBhIWo_Rv",
    date: "Apr 3",
  },
  {
    title: "NHH 🅴",
    src: "https://drive.google.com/uc?export=download&id=1Fkl-T9SGuBZIH4mjDawIJ4xwHQ8Zc9TS",
    date: "May 12",
  },
  {
    title: "HY&J 🅴",
    src: "https://drive.google.com/uc?export=download&id=15gU8CAGJGpppl-KgvlqvcQEE1WRmnsHD",
    date: "May 12",
  },
  {
    title: "ALL THE LOVE 🅴",
    src: "https://drive.google.com/uc?export=download&id=1Ta5_8lBIURXAu456TR7yg67SwK0KyEZJ",
    date: "May 12",
  },
  {
    title: "NITROUS 🅴 (SNIPPET)",
    src: "https://drive.google.com/uc?export=download&id=1FzXjvQp8bKUz5JcCOx2se9g3G7deJhkU",
    date: "May 12",
  },
];

function secondsToMMSS(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = TRACKS[currentTrackIdx];

  // Play/pause
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // When user clicks a track
  const handleTrackClick = (idx: number) => {
    setCurrentTrackIdx(idx);
    setCurrentTime(0);
    setPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100); // ensures src is updated
  };

  // Track time/progress events
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  // Seek bar interaction
  const handleProgressBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = Number.parseFloat(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  // Play/pause sync
  React.useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  // Next/prev handling
  const playNext = () => {
    let next = currentTrackIdx + 1;
    if (next >= TRACKS.length) next = 0;
    setCurrentTrackIdx(next);
    setCurrentTime(0);
    setPlaying(true);
  };
  const playPrev = () => {
    let prev = currentTrackIdx - 1;
    if (prev < 0) prev = TRACKS.length - 1;
    setCurrentTrackIdx(prev);
    setCurrentTime(0);
    setPlaying(true);
  };

  const handleEnded = () => {
    playNext();
  };

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col justify-between">
      {/* Hidden audio tag */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleEnded}
        style={{ display: "none" }}
      >
        <track kind="captions" />
      </audio>

      {/* Main Player Area */}
      <main className="flex flex-1 w-full max-w-5xl mx-auto pt-20 pb-32">
        {/* Album Art */}
        <section className="flex-0 w-[340px] flex flex-col items-center justify-center">
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={COVER_IMG}
              alt="Album Art"
              className="w-[340px] h-[340px] object-cover"
            />
          </div>
        </section>

        {/* Song List and Info */}
        <section className="flex-1 flex flex-col justify-start ml-16 mt-8">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-4xl font-extrabold text-white">CUCK</h1>
            <span className="text-neutral-400 ml-2">Ye · 10 tracks · 17m 49s</span>
            <button className="ml-auto bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-3 flex items-center justify-center">
              <svg width="26" height="26" fill="none" stroke="currentColor">
                <circle cx="13" cy="13" r="12" strokeWidth="2"/>
                <rect x="9" y="9" width="8" height="8" rx="2" fill="currentColor" />
              </svg>
            </button>
          </div>

          <button className="mb-6 w-max bg-neutral-900 text-zinc-200 rounded-md px-4 py-2 text-sm hover:bg-neutral-800 font-medium flex items-center gap-2 border border-neutral-700">
            <svg width="16" height="16" fill="none" stroke="currentColor">
              <path d="M8 1v14M1 8h14" strokeWidth="2" strokeLinecap="round"/>
            </svg> Save to library
          </button>

          {/* Track List */}
          <ol className="space-y-1">
            {TRACKS.map((track, idx) => (
              <li
                key={track.title}
                className={`flex items-center group rounded px-2 py-1 transition cursor-pointer ${
                  idx === currentTrackIdx ? "bg-neutral-800" : "hover:bg-neutral-800"
                }`}
                onClick={() => handleTrackClick(idx)}
              >
                <span className="w-6 text-right mr-2 text-neutral-400 font-mono">{idx + 1}</span>
                <span className="flex-1 text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {track.title}
                </span>
                <span className="text-xs text-neutral-400 ml-2">{track.date}</span>
                <button
                  tabIndex={-1}
                  className="ml-2 text-neutral-400 hover:text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="More"
                  onClick={e => e.stopPropagation()}
                >
                  <svg height="18" width="18" fill="currentColor">
                    <circle cx="4" cy="9" r="1.5"/>
                    <circle cx="9" cy="9" r="1.5"/>
                    <circle cx="14" cy="9" r="1.5"/>
                  </svg>
                </button>
              </li>
            ))}
          </ol>
        </section>
      </main>

      {/* Bottom Playback Bar */}
      <footer className="fixed bottom-6 left-0 right-0 flex items-end justify-center pointer-events-none">
        <div className="w-[540px] bg-neutral-900 rounded-2xl shadow-2xl px-8 py-3 flex items-center pointer-events-auto">
          {/* Song thumbnail */}
          <img src={COVER_IMG} alt="" className="w-12 h-12 rounded-md mr-3 object-cover" />
          <div className="flex flex-col flex-1 mr-3">
            <span className="text-sm text-white font-semibold leading-none">{currentTrack.title}</span>
            <span className="text-xs text-neutral-400 leading-none">CUCK</span>
          </div>
          {/* Waveform/progress */}
          <div className="flex-1 h-6 flex items-center mr-4">
            <input
              type="range"
              className="w-full h-2 rounded bg-neutral-700 appearance-none [&::-webkit-slider-thumb]:appearance-none"
              min={0}
              max={duration}
              step={0.01}
              value={currentTime}
              onChange={handleProgressBar}
              style={{ background: `linear-gradient(90deg,#fde047 ${(duration ? (currentTime / duration) * 100 : 0)}%,#404040 ${(duration ? (currentTime / duration) * 100 : 0)}%)` }}
            />
            <span className="text-xs text-white ml-2">
              {secondsToMMSS(currentTime)} / {secondsToMMSS(duration)}
            </span>
          </div>
          {/* Player controls */}
          <div className="flex items-center gap-3">
            <button className="p-1 text-zinc-300 hover:text-yellow-400" onClick={playPrev}>
              <svg width="18" height="18" fill="none" stroke="currentColor">
                <rect x="4" y="4" width="10" height="10" rx="2" />
              </svg>
            </button>
            <button className="p-1 text-zinc-300 hover:text-yellow-400" onClick={playPrev}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <polygon points="6,5 14,9 6,13"/>
              </svg>
            </button>
            <button
              className="p-1 text-zinc-300 hover:text-yellow-400"
              onClick={handlePlayPause}
            >
              {playing ? (
                <svg width="18" height="18" fill="currentColor">
                  <rect width="4" height="12" x="4" y="3" rx="1.5"/>
                  <rect width="4" height="12" x="10" y="3" rx="1.5"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <polygon points="6,5 14,9 6,13"/>
                </svg>
              )}
            </button>
            <button className="p-1 text-zinc-300 hover:text-yellow-400" onClick={playNext}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <polygon points="12,5 4,9 12,13"/>
              </svg>
            </button>
            <button className="p-1 text-zinc-300 hover:text-yellow-400">
              <svg width="18" height="18" fill="none" stroke="currentColor">
                <circle cx="9" cy="9" r="8" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
