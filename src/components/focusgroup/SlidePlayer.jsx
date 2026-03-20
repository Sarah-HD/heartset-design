import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', serif" };

function renderSlide(slide) {
  switch (slide.type) {
    case 'title':
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-10">
          <div className="w-10 h-px bg-black mb-8" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight" style={serif}>{slide.title}</h1>
          {slide.subtitle && (
            <p className="text-sm md:text-base text-black/45 font-light mt-6 tracking-wide">{slide.subtitle}</p>
          )}
          <div className="w-10 h-px bg-black mt-8" />
        </div>
      );

    case 'bullets':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-5" style={serif}>{slide.title}</h2>
          {slide.intro && (
            <p className="text-xs md:text-sm text-black/50 font-light mb-4 whitespace-pre-line">{slide.intro}</p>
          )}
          <ul className="space-y-2.5">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-black/75 font-light">
                <span className="text-black/40 mt-0.5 flex-shrink-0 text-xs">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {slide.closing && (
            <p className={`mt-6 text-sm md:text-base ${slide.boldClosing ? 'font-semibold' : 'font-light text-black/50 italic'}`}>
              {slide.closing}
            </p>
          )}
        </div>
      );

    case 'consequence':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-8" style={serif}>{slide.title}</h2>
          <p className="text-xs md:text-sm text-black/40 font-light mb-8 tracking-widest uppercase">{slide.intro}</p>
          <div className="space-y-3 mb-8">
            {slide.questions?.map((q, i) => (
              <p key={i} className="text-base md:text-xl font-light">{q}</p>
            ))}
          </div>
          <div className="border-t border-black/10 pt-6">
            <p className="text-sm text-black/50 font-light">{slide.bridge}</p>
            <p className="text-sm md:text-base font-semibold mt-2">{slide.closing}</p>
          </div>
        </div>
      );

    case 'equation':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-8" style={serif}>{slide.title}</h2>
          <div className="space-y-1.5 mb-8">
            {slide.equation?.map((line, i) => (
              <p key={i} className="text-base md:text-lg lg:text-xl font-light tracking-wide text-center">{line}</p>
            ))}
          </div>
          {slide.equationNote && (
            <div className="border-t border-black/15 pt-6 text-center">
              <p className="text-sm md:text-base font-semibold">{slide.equationNote}</p>
            </div>
          )}
        </div>
      );

    case 'two-column':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-7" style={serif}>{slide.title}</h2>
          <div className="grid grid-cols-2 gap-6 md:gap-10 border-t border-black/10 pt-6">
            {[slide.left, slide.right].map((col, i) => (
              <div key={i} className={i === 1 ? 'border-l border-black/10 pl-6 md:pl-10' : ''}>
                <p className="text-xs tracking-[0.2em] uppercase text-black/35 mb-3">{col.heading}</p>
                <ul className="space-y-2">
                  {col.bullets.map((b, j) => (
                    <li key={j} className="text-xs md:text-sm text-black/65 font-light flex items-start gap-2">
                      <span className="flex-shrink-0 text-black/30">•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {slide.closing && (
            <p className="mt-6 text-xs md:text-sm font-semibold text-center border-t border-black/10 pt-5 tracking-wide">{slide.closing}</p>
          )}
        </div>
      );

    case 'stacked':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-3" style={serif}>{slide.title}</h2>
          {slide.intro && <p className="text-xs tracking-[0.15em] uppercase text-black/35 mb-6">{slide.intro}</p>}
          <div className="space-y-3">
            {slide.items?.map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-b border-black/5 pb-3">
                <span className="text-xs text-black/25 mt-0.5 w-5 flex-shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm md:text-base text-black/75 font-light">{item}</p>
              </div>
            ))}
          </div>
          {slide.closing && <p className="mt-5 text-xs text-black/35 italic">{slide.closing}</p>}
        </div>
      );

    case 'deliverable':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4" style={serif}>{slide.title}</h2>
          {slide.intro && <p className="text-xs md:text-sm text-black/45 font-light mb-5">{slide.intro}</p>}
          <ul className="space-y-3 mb-6">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-black/75 font-light">
                <span className="text-black/30 flex-shrink-0">—</span><span>{b}</span>
              </li>
            ))}
          </ul>
          {slide.closing && (
            <p className="text-sm font-medium text-black/40 border-t border-black/10 pt-4 italic">{slide.closing}</p>
          )}
        </div>
      );

    case 'before-after':
      return (
        <div className="flex flex-col justify-center h-full px-10 md:px-14 py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-2" style={serif}>{slide.title}</h2>
          <p className="text-xs tracking-[0.2em] uppercase text-black/35 mb-6">Before → After</p>
          <p className="text-sm text-black/50 font-light mb-5">{slide.intro}</p>
          <ul className="space-y-2.5">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-black/75 font-light">
                <span className="text-black/30 flex-shrink-0">—</span><span>{b}</span>
              </li>
            ))}
          </ul>
          {slide.closing && (
            <p className="mt-6 text-sm font-semibold">{slide.closing}</p>
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

  const slide = allSlides[current];
  const isFirst = current === 0;
  const isLast = current === allSlides.length - 1;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (!isLast) setCurrent(c => c + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (!isFirst) setCurrent(c => c - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFirst, isLast]);

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs tracking-[0.25em] uppercase text-black/30">{dayLabel}</p>
        <p className="text-xs text-black/25 tabular-nums">{current + 1} of {allSlides.length}</p>
      </div>

      {/* Slide canvas */}
      <div
        className="border border-black/15 bg-white w-full relative overflow-hidden min-h-[280px] md:aspect-video"
        style={{ position: 'relative' }}
      >
        {/* Top rule */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-black z-10" />
        
        <div className="absolute inset-0 flex flex-col">
          {renderSlide(slide)}
        </div>

        {/* Slide number watermark */}
        <div className="absolute bottom-4 right-5 z-10">
          <span className="text-xs text-black/10 tabular-nums">{String(current + 1).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => setCurrent(c => c - 1)}
          disabled={isFirst}
          className="flex items-center gap-1.5 text-sm text-black/35 hover:text-black disabled:opacity-15 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
          {allSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-200 ${
                i === current ? 'w-5 bg-black' : 'w-1.5 bg-black/15 hover:bg-black/35'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(c => c + 1)}
          disabled={isLast}
          className="flex items-center gap-1.5 text-sm text-black/35 hover:text-black disabled:opacity-15 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Speaker Notes */}
      {slide.speakerNotes && (
        <div className="mt-6 border border-black/8 bg-neutral-50 p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-black/25 mb-2">Speaker Notes</p>
          <p className="text-sm text-black/50 font-light leading-relaxed italic">"{slide.speakerNotes}"</p>
        </div>
      )}

      {/* Use keyboard hint */}
      <p className="text-xs text-black/20 text-center mt-4">Use ← → arrow keys to navigate</p>
    </div>
  );
}