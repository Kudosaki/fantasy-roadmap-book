import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Sparkles, Hourglass, HelpCircle, Flame, Edit3, Trash2 } from 'lucide-react';
import { Quest, QuestStatus } from '../types';

interface QuestLogProps {
  quests: Quest[];
  onEdit: (quest: Quest) => void;
  onDelete: (id: string) => void;
}

const statusBadges: Record<QuestStatus, { label: string; style: string; icon: React.ReactNode }> = {
  'Planned': { 
    label: 'Prophecy', 
    style: 'bg-slate-200 text-slate-800 border-slate-400 shadow-sm', 
    icon: <HelpCircle className="w-3 h-3" /> 
  },
  'In Progress': { 
    label: 'Active Campaign', 
    style: 'bg-amber-600 text-white border-amber-400 shadow-[0_0_8px_rgba(217,119,6,0.5)]', 
    icon: <Flame className="w-3 h-3 animate-pulse" /> 
  },
  'Completed': { 
    label: 'Legendary Accomplished', 
    style: 'bg-emerald-700 text-emerald-50 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]', 
    icon: <Sparkles className="w-3 h-3" /> 
  },
  'Delayed': { 
    label: 'Stalled Expedition', 
    style: 'bg-rose-700 text-rose-50 border-rose-500', 
    icon: <Hourglass className="w-3 h-3" /> 
  },
  'Cancelled': { 
    label: 'Forsaken Covenant', 
    style: 'bg-stone-800 text-stone-400 border-stone-600 line-through', 
    icon: <ShieldAlert className="w-3 h-3" /> 
  },
};

const priorityGlow = {
  Low: 'border-amber-900/20',
  Medium: 'border-amber-700/40',
  High: 'border-amber-600 shadow-[inset_0_0_8px_rgba(180,83,9,0.15)]',
  Legendary: 'border-orange-500 shadow-[inset_0_0_12px_rgba(239,68,68,0.2)] animate-pulse border-dashed',
};

export const QuestLog: React.FC<QuestLogProps> = ({ quests, onEdit, onDelete }) => {
  if (quests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-amber-900/20 rounded-lg min-h-[300px]">
        <Shield className="w-12 h-12 text-amber-900/30 mb-2" />
        <p className="font-serif italic text-amber-900/60 text-sm">No scrolls matches these configurations inside the tome repository.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-2 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {quests.map((quest) => {
          const badge = statusBadges[quest.status];
          return (
            <motion.div
              key={quest.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -30 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`bg-amber-950/[0.03] hover:bg-amber-950/[0.06] border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors relative group ${priorityGlow[quest.priority]}`}
            >
              {/* Left Details block */}
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase font-serif tracking-wider text-amber-900/60 font-bold">
                    [{quest.category}]
                  </span>
                  <h3 className="font-serif font-bold text-medieval-leather text-base leading-tight">
                    {quest.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 uppercase tracking-tight font-serif ${badge.style}`}>
                    {badge.icon}
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs text-amber-950/80 font-serif leading-relaxed line-clamp-2">
                  {quest.description || 'No lore specifications provided for this objective mapping.'}
                </p>
                <div className="text-[11px] text-amber-900/60 font-serif flex items-center gap-2 pt-1">
                  <span>Priority: <strong className="text-amber-900">{quest.priority}</strong></span>
                  <span>•</span>
                  <span>Timeline Limit: <strong className="text-amber-950">{quest.dueDate || 'Infinite Horizon'}</strong></span>
                </div>
              </div>

              {/* Control Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(quest)}
                  className="p-1.5 rounded bg-amber-900/5 hover:bg-amber-900/20 text-amber-900 border border-amber-900/20 transition-colors"
                  title="Modify Task Parameters"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(quest.id)}
                  className="p-1.5 rounded bg-rose-950/5 hover:bg-rose-900/20 text-rose-800 border border-rose-900/20 transition-colors"
                  title="Exterminate Chronicle Track"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};