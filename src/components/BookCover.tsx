import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldAlert, Trophy, Compass, Sparkles } from 'lucide-react';
import { Quest } from '../types';

interface BookCoverProps {
  onOpenBook: () => void;
  quests: Quest[];
}

export const BookCover: React.FC<BookCoverProps> = ({ onOpenBook, quests }) => {
  const total = quests.length;
  const completed = quests.filter(q => q.status === 'Completed').length;
  const inProgress = quests.filter(q => q.status === 'In Progress').length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full min-h-[75vh]">
      {/* Left Cover Page */}
      <div className="parchment-texture shadow-inner-tome rounded-l-xl p-6 md:p-12 flex flex-col justify-between items-center text-center relative border-r border-amber-900/10">
        <div className="w-full border-2 border-amber-800/20 p-6 h-full flex flex-col justify-center items-center rounded-lg relative">
          <div className="absolute top-2 left-2 text-amber-800/40 text-xs font-serif">✧</div>
          <div className="absolute top-2 right-2 text-amber-800/40 text-xs font-serif">✧</div>
          <div className="absolute bottom-2 left-2 text-amber-800/40 text-xs font-serif">✧</div>
          <div className="absolute bottom-2 right-2 text-amber-800/40 text-xs font-serif">✧</div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-4 bg-amber-950/10 rounded-full mb-4 border border-amber-700/30 shadow-gold-glow"
          >
            <BookOpen className="w-16 h-16 text-amber-900" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-medieval-leather tracking-wide mb-2">
            CHRONICLES <span className="text-amber-800">of</span> PROGRESS
          </h1>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-800 to-transparent my-3" />
          <p className="text-sm font-serif italic text-amber-950/80 max-w-sm leading-relaxed">
            "A record of legendary milestones, active undertakings, and continuous paths forged across unknown technical territories."
          </p>
        </div>
      </div>

      {/* Right Cover Page */}
      <div className="parchment-texture shadow-inner-tome rounded-r-xl p-6 md:p-12 flex flex-col justify-between relative">
        <div className="w-full border-2 border-amber-800/20 p-6 h-full flex flex-col justify-between rounded-lg">
          <div>
            <h2 className="text-xl font-serif font-bold text-medieval-leather mb-4 tracking-wide border-b border-amber-900/20 pb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-800" /> REALM OVERVIEW
            </h2>
            
            {/* Statistics Matrix */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="bg-amber-950/5 p-3 rounded border border-amber-900/10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <div>
                  <div className="text-xs text-amber-900/60 uppercase font-bold">Total Tracks</div>
                  <div className="text-xl font-serif font-bold text-medieval-leather">{total}</div>
                </div>
              </div>
              <div className="bg-amber-950/5 p-3 rounded border border-amber-900/10 flex items-center gap-3">
                <Trophy className="w-5 h-5 text-emerald-800" />
                <div>
                  <div className="text-xs text-amber-900/60 uppercase font-bold">Completed</div>
                  <div className="text-xl font-serif font-bold text-medieval-leather">{completed}</div>
                </div>
              </div>
            </div>

            {/* Magical Energy Progress bar */}
            <div className="my-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-serif font-bold text-amber-900 uppercase tracking-wider">Chronicle Attainment</span>
                <span className="text-sm font-serif font-bold text-amber-900">{progressPercent}%</span>
              </div>
              <div className="w-full h-4 bg-amber-950/20 rounded-full p-0.5 border border-amber-900/30 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-700 via-medieval-gold to-yellow-300 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Quick Status Breakdown */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs font-serif text-amber-950/80">
                <span>Active Assignments</span>
                <span className="font-bold text-amber-900">{inProgress}</span>
              </div>
              <div className="flex justify-between text-xs font-serif text-amber-950/80">
                <span>Stalled Frameworks</span>
                <span className="font-bold text-amber-900">{quests.filter(q => q.status === 'Delayed').length}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(139,92,26,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenBook}
            className="w-full mt-6 py-3 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-parchment font-serif font-bold tracking-widest rounded shadow-md border border-medieval-gold/50 flex items-center justify-center gap-2 group transition-colors"
          >
            OPEN JOURNAL
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};