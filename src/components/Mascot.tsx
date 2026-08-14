import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface MascotProps {
  message?: string;
  mood?: 'happy' | 'cheering' | 'thinking' | 'waving';
  onTap?: () => void;
  voiceText?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  message = "Hello little explorer! Let's play!",
  mood = 'happy',
  onTap,
  voiceText,
}) => {
  const handleClick = () => {
    sound.playPop(520);
    if (voiceText || message) {
      sound.speak(voiceText || message);
    }
    if (onTap) onTap();
  };

  return (
    <div className="flex items-center gap-3 md:gap-4 max-w-xl mx-auto my-2 px-2">
      {/* Interactive Mascot Character */}
      <motion.button
        id="mascot-button"
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative shrink-0 cursor-pointer focus:outline-none"
        title="Tap me to hear me talk!"
        aria-label="Pip the Magic Bunny Mascot"
      >
        <motion.div
          animate={
            mood === 'cheering'
              ? { y: [0, -14, 0, -10, 0], rotate: [0, -6, 6, -4, 0] }
              : mood === 'waving'
              ? { rotate: [-4, 4, -4, 4, 0] }
              : { y: [0, -4, 0] }
          }
          transition={{
            repeat: Infinity,
            repeatDelay: mood === 'cheering' ? 0.3 : 2,
            duration: mood === 'cheering' ? 0.7 : 2,
          }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-200 via-amber-100 to-amber-300 p-1.5 shadow-lg border-3 border-amber-400 flex items-center justify-center relative overflow-visible"
        >
          {/* Bunny Ears */}
          <div className="absolute -top-5 left-2 w-4 h-8 bg-amber-100 rounded-full border-2 border-amber-400 transform -rotate-12 flex items-center justify-center">
            <div className="w-2 h-5 bg-pink-300 rounded-full" />
          </div>
          <div className="absolute -top-5 right-2 w-4 h-8 bg-amber-100 rounded-full border-2 border-amber-400 transform rotate-12 flex items-center justify-center">
            <div className="w-2 h-5 bg-pink-300 rounded-full" />
          </div>

          {/* Cute Bunny Face */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Cheeks */}
            <circle cx="28" cy="62" r="8" fill="#F472B6" opacity="0.6" />
            <circle cx="72" cy="62" r="8" fill="#F472B6" opacity="0.6" />

            {/* Sparkly Eyes */}
            <circle cx="36" cy="48" r="6" fill="#1F2937" />
            <circle cx="34" cy="46" r="2.2" fill="#FFFFFF" />
            <circle cx="64" cy="48" r="6" fill="#1F2937" />
            <circle cx="62" cy="46" r="2.2" fill="#FFFFFF" />

            {/* Cute Nose */}
            <polygon points="50,56 45,51 55,51" fill="#F43F5E" />

            {/* Smiling Mouth */}
            <path
              d="M44 60 Q50 67 56 60"
              fill="none"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Whiskers */}
            <line x1="20" y1="52" x2="10" y2="49" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="57" x2="10" y2="59" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="52" x2="90" y2="49" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="57" x2="90" y2="59" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Cheerful Magic Star Hat badge */}
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white shadow text-[10px]">
            ⭐
          </div>
        </motion.div>
      </motion.button>

      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -6 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        key={message}
        onClick={handleClick}
        className="relative flex-1 bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-md border-3 border-amber-300 text-left cursor-pointer hover:border-amber-400 transition-colors group"
      >
        {/* Speech Bubble Arrow */}
        <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-white border-b-8 border-b-transparent drop-shadow-xs" />

        <div className="flex items-center justify-between gap-2">
          <p className="text-base sm:text-lg md:text-xl font-bold text-amber-950 font-display leading-snug tracking-tight">
            {message}
          </p>

          <button
            id="speak-prompt-button"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.speak(voiceText || message);
            }}
            className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center transition-transform active:scale-95 border-2 border-amber-300 shadow-xs"
            title="Read aloud"
            aria-label="Listen to Pip speaking"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
