import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { TRANSFORMATION_SERVICES, ServiceTransformation } from '../data/businessData';

interface Service3DTransformShowcaseProps {
  initialService?: 'bedroom' | 'kitchen' | 'living' | 'office';
  lockedService?: 'bedroom' | 'kitchen' | 'living' | 'office';
  onNavigateToView?: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
  titleOverride?: string;
  subtitleOverride?: string;
  isTopBanner?: boolean;
  asBackground?: boolean;
  children?: React.ReactNode;
}

const SERVICES_LIST: ('bedroom' | 'kitchen' | 'living' | 'office')[] = [
  'bedroom',
  'kitchen',
  'living',
  'office'
];

export const Service3DTransformShowcase: React.FC<Service3DTransformShowcaseProps> = ({
  initialService = 'bedroom',
  lockedService,
  onNavigateToView,
  titleOverride,
  subtitleOverride,
  isTopBanner = false,
  asBackground = false,
  children
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<'bedroom' | 'kitchen' | 'living' | 'office'>(
    lockedService || initialService
  );

  // Transformation progress: 0 = Empty Bare Room, 100 = Beautiful Luxury Room
  const [progress, setProgress] = useState<number>(100);
  const [direction, setDirection] = useState<'forward' | 'backward'>('backward');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeService: ServiceTransformation =
    TRANSFORMATION_SERVICES[lockedService || selectedServiceId];

  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-running continuous smooth 3D transition loop moving through all rooms without pause
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 1.6; // Brisk, fluid cinematic speed

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setProgress((prev) => {
        const step = delta * 46 * speed;
        if (direction === 'forward') {
          if (prev + step >= 100) {
            setDirection('backward');
            return 100;
          }
          return prev + step;
        } else {
          if (prev - step <= 0) {
            setDirection('forward');
            // When reaching the empty room state, cycle smoothly to the next room!
            if (!lockedService) {
              setSelectedServiceId((currentId) => {
                const currentIdx = SERVICES_LIST.indexOf(currentId);
                const nextIdx = (currentIdx + 1) % SERVICES_LIST.length;
                return SERVICES_LIST[nextIdx];
              });
            }
            return 0;
          }
          return prev - step;
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, lockedService]);

  // 3D Tilt perspective on pointer move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8; // deg
    setTilt({ x: y, y: x });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Background Video Mode: Used as the live backdrop of the AG ARCHITECTS DELHI words
  if (asBackground) {
    return (
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full overflow-hidden border-0 shadow-none select-none touch-none group"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Layer 1: Bare Empty Room (Underneath Background) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={activeService.beforeImg}
            alt="Room Transition Before"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Layer 2: Luxury Room (Clipped Smooth 3D Background) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{
            clipPath: `inset(0 0 0 ${100 - progress}%)`
          }}
        >
          <img
            src={activeService.afterImg}
            alt="Room Transition After"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* High-legibility architectural glass gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/80 pointer-events-none" />

        {/* Borderless stretched type bottom bleed */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#F8F9FA]/40 to-[#F8F9FA] pointer-events-none z-10" />

        {/* Foreground Content: Only room buttons on the box + AG ARCHITECTS DELHI words layered on top */}
        <div className="relative z-20 w-full pt-3 pb-5">
          {/* Box with ONLY Bedroom, Kitchen, Living, Office words */}
          {!lockedService && (
            <div className="px-3 flex justify-center">
              <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/20 shadow-md max-w-xs w-full">
                {SERVICES_LIST.map((s) => {
                  const isSelected = selectedServiceId === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(s);
                        setProgress(100);
                        setDirection('backward');
                      }}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all text-center ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Children: AG ARCHITECTS DELHI words and reputation bar */}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${isTopBanner ? '' : 'space-y-2.5'}`}>
      {/* Optional external Header */}
      {!isTopBanner && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-700 text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Architectural Spatial Transformation</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                {titleOverride || activeService.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {subtitleOverride || activeService.tagline}
              </p>
            </div>
          </div>

          {/* Service Switcher Tabs */}
          {!lockedService && (
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/90 shadow-2xs">
              {SERVICES_LIST.map((s) => {
                const isSelected = selectedServiceId === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSelectedServiceId(s);
                      setProgress(100);
                      setDirection('backward');
                    }}
                    className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* 3D Interactive Card Viewport */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative w-full ${
          isTopBanner
            ? 'h-64 sm:h-72 border-b-0 border-t-0 border-x-0 md:border-t md:border-x border-slate-200/80 rounded-t-none md:rounded-t-2xl rounded-b-none'
            : 'h-64 rounded-2xl border border-slate-200'
        } overflow-hidden shadow-sm select-none touch-none group`}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Layer 1: Bare Empty Room */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={activeService.beforeImg}
            alt="Bare Empty Room Before AG Architects"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Layer 2: Luxury Room */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            clipPath: `inset(0 0 0 ${100 - progress}%)`
          }}
        >
          <img
            src={activeService.afterImg}
            alt="Finished Luxury Room After AG Architects"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Top Floating Room Switching box */}
        {isTopBanner && !lockedService && (
          <div className="absolute top-2.5 inset-x-2.5 z-30 flex items-center justify-center pointer-events-auto">
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 shadow-md">
              {SERVICES_LIST.map((s) => {
                const isSelected = selectedServiceId === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSelectedServiceId(s);
                      setProgress(100);
                      setDirection('backward');
                    }}
                    className={`py-1 px-2.5 rounded-full text-[10px] font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
