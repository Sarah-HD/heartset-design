import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', serif" };

function getSlideText(slide) {
  if (slide.speakerNotes) return slide.speakerNotes;
  const parts = [];
  if (slide.title) parts.push(slide.title);
  if (slide.subtitle) parts.push(slide.subtitle);
  if (slide.intro) parts.push(slide.intro);
  if (slide.bullets) parts.push(...slide.bullets);
  if (slide.questions) parts.push(...slide.questions);
  if (slide.items) parts.push(...slide.items);
  if (slide.equation) parts.push(...slide.equation);
  if (slide.equationNote) parts.push(slide.equationNote);
  if (slide.closing) parts.push(slide.closing);
  if (slide.bridge) parts.push(slide.bridge);
  if (slide.left?.bullets) parts.push(...slide.left.bullets);
  if (slide.right?.bullets) parts.push(...slide.right.bullets);
  return parts.join(". ");
}

function renderSlide(slide) {
  switch (slide.type) {
    case 'title':
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8">
          <div className="w-8 h-px bg-black mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight" style={serif}>{slide.title}</h1>
          {slide.subtitle && (
            <p className="text-xs sm:text-sm text-black/45 font-light mt-5 tracking-wide">{slide.subtitle}</p>
          )}
          <div className="w-8 h-px bg-black mt-6" />
        </div>
      );

    case 'bullets':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-4" style={serif}>{slide.title}</h2>
          {slide.intro && (
            <p className="text-xs text-black/50 font-light mb-3 whitespace-pre-line">{slide.intro}</p>
          )}
          <ul className="space-y-2">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-black/75 font-light">
                <span className="text-black/40 mt-0.5 flex-shrink-0">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {slide.closing && (
            <p className={`mt-4 text-xs sm:text-sm ${slide.boldClosing ? 'font-semibold' : 'font-light text-black/50 italic'}`}>
              {slide.closing}
            </p>
          )}
        </div>
      );

    case 'consequence':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-5" style={serif}>{slide.title}</h2>
          <p className="text-xs text-black/40 font-light mb-5 tracking-widest uppercase">{slide.intro}</p>
          <div className="space-y-2 mb-5">
            {slide.questions?.map((q, i) => (
              <p key={i} className="text-sm sm:text-base md:text-lg font-light">{q}</p>
            ))}
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="text-xs text-black/50 font-light">{slide.bridge}</p>
            <p className="text-xs sm:text-sm font-semibold mt-1">{slide.closing}</p>
          </div>
        </div>
      );

    case 'equation':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-6" style={serif}>{slide.title}</h2>
          <div className="space-y-1.5 mb-6">
            {slide.equation?.map((line, i) => (
              <p key={i} className="text-sm sm:text-base md:text-lg font-light tracking-wide text-center">{line}</p>
            ))}
          </div>
          {slide.equationNote && (
            <div className="border-t border-black/15 pt-4 text-center">
              <p className="text-xs sm:text-sm font-semibold">{slide.equationNote}</p>
            </div>
          )}
        </div>
      );

    case 'two-column':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-5" style={serif}>{slide.title}</h2>
          <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-4">
            {[slide.left, slide.right].map((col, i) => (
              <div key={i} className={i === 1 ? 'border-l border-black/10 pl-4' : ''}>
                <p className="text-xs tracking-[0.15em] uppercase text-black/35 mb-2">{col.heading}</p>
                <ul className="space-y-1.5">
                  {col.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-black/65 font-light flex items-start gap-1.5">
                      <span className="flex-shrink-0 text-black/30">•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {slide.closing && (
            <p className="mt-4 text-xs font-semibold text-center border-t border-black/10 pt-4 tracking-wide">{slide.closing}</p>
          )}
        </div>
      );

    case 'stacked':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-2" style={serif}>{slide.title}</h2>
          {slide.intro && <p className="text-xs tracking-[0.12em] uppercase text-black/35 mb-4">{slide.intro}</p>}
          <div className="space-y-2.5 overflow-y-auto">
            {slide.items?.map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-black/5 pb-2">
                <span className="text-xs text-black/25 mt-0.5 w-5 flex-shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-xs sm:text-sm text-black/75 font-light">{item}</p>
              </div>
            ))}
          </div>
          {slide.closing && <p className="mt-3 text-xs text-black/35 italic">{slide.closing}</p>}
        </div>
      );

    case 'deliverable':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-3" style={serif}>{slide.title}</h2>
          {slide.intro && <p className="text-xs text-black/45 font-light mb-4">{slide.intro}</p>}
          <ul className="space-y-2.5 mb-4">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-black/75 font-light">
                <span className="text-black/30 flex-shrink-0">—</span><span>{b}</span>
              </li>
            ))}
          </ul>
          {slide.closing && (
            <p className="text-xs font-medium text-black/40 border-t border-black/10 pt-3 italic">{slide.closing}</p>
          )}
        </div>
      );

    case 'before-after':
      return (
        <div className="flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 py-6">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-2" style={serif}>{slide.title}</h2>
          <p className="text-xs tracking-[0.15em] uppercase text-black/35 mb-4">Before → After</p>
          <p className="text-xs text-black/50 font-light mb-4">{slide.intro}</p>
          <ul className="space-y-2">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-black/75 font-light">
                <span className="text-black/30 flex-shrink-0">—</span><span>{b}</span>
              </li>
            ))}
          </ul>
          {slide.closing && (
            <p className="mt-4 text-xs sm:text-sm font-semibold">{slide.closing}</p>
          )}
        </div>
      );

    default:
      return <div className="flex items-center justify-center h-full"><p className="text-black/30">Slide</p></div>;
  }
}

export default function SlidePlayer({ slides, dayLabel, homeworkSlide }) {
  const allSlides = homeworkSlide ? [...slides, homeworkSlide] : slides;
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  const slide = allSlides[current];
  const isFirst = current === 0;
  const isLast = current === allSlides.length - 1;

  const isPlayingRef = useRef(false);
  const currentRef = useRef(current);
  currentRef.current = current;

  const stopSpeech = () => {
    synthRef.current.cancel();
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  const speakFrom = (index) => {
    if (isMuted || index >= allSlides.length) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }
    synthRef.current.cancel();
    const text = getSlideText(allSlides[index]);
    if (!text) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.02;
    // Pick a natural voice if available
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Google US English') || v.name.includes('en-US'));
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      const next = currentRef.current + 1;
      if (next < allSlides.length) {
        setCurrent(next);
        // small pause between slides
        setTimeout(() => speakFrom(next), 600);
      } else {
        isPlayingRef.current = false;
        setIsPlaying(false);
      }
    };
    utterance.onerror = () => {
      isPlayingRef.current = false;
      setIsPlaying(false);
    };
    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      speakFrom(current);
    }
  };

  const toggleMute = () => {
    stopSpeech();
    setIsMuted(m => !m);
  };

  const goTo = (index) => {
    stopSpeech();
    setCurrent(index);
  };

  const goNext = () => { if (!isLast) goTo(current + 1); };
  const goPrev = () => { if (!isFirst) goTo(current - 1); };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => { window.removeEventListener('keydown', handleKey); stopSpeech(); };
  }, [current, isPlaying, isMuted]);

  // Stop speech when unmounting
  useEffect(() => () => synthRef.current.cancel(), []);

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs tracking-[0.2em] uppercase text-black/30">{dayLabel}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause narration" : "Play narration"}
            className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors px-2.5 py-1 border border-black/10 hover:border-black/25"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? "Pause" : "▶ Listen"}</span>
          </button>
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            className="text-black/30 hover:text-black transition-colors p-1"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide canvas */}
      <div className="border border-black/15 bg-white w-full relative overflow-hidden" style={{ minHeight: '320px' }}>
        {/* Top rule */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-black z-10" />

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black text-white px-2 py-1 text-xs">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span>Narrating</span>
          </div>
        )}

        <div className="pt-2">
          {renderSlide(slide)}
        </div>

        {/* Slide number watermark */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="text-xs text-black/10 tabular-nums">{String(current + 1).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="flex items-center gap-1 text-sm text-black/35 hover:text-black disabled:opacity-15 disabled:cursor-not-allowed transition-colors px-3 py-2 min-w-[60px]"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[200px] sm:max-w-xs">
          {allSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current ? 'w-5 bg-black' : 'w-1.5 bg-black/15 hover:bg-black/35'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={isLast}
          className="flex items-center gap-1 text-sm text-black/35 hover:text-black disabled:opacity-15 disabled:cursor-not-allowed transition-colors px-3 py-2 min-w-[60px] justify-end"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Speaker Notes */}
      {slide.speakerNotes && (
        <div className="mt-5 border border-black/8 bg-neutral-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs tracking-[0.2em] uppercase text-black/25">Speaker Notes</p>
            <button
              onClick={togglePlay}
              className="flex items-center gap-1 text-xs text-black/35 hover:text-black transition-colors"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? "Pause" : "Read aloud"}</span>
            </button>
          </div>
          <p className="text-sm text-black/50 font-light leading-relaxed italic">"{slide.speakerNotes}"</p>
        </div>
      )}

      {/* Keyboard hint */}
      <p className="text-xs text-black/20 text-center mt-3">← → to navigate · Space to play/pause narration</p>
    </div>
  );
}