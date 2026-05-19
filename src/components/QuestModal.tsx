import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Feather } from 'lucide-react';
import { Quest, QuestStatus, QuestPriority, QuestCategory } from '../types';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quest: Partial<Quest> & { id?: string }) => void;
  quest?: Quest | null;
}

export const QuestModal: React.FC<QuestModalProps> = ({ isOpen, onClose, onSave, quest }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<QuestStatus>('Planned');
  const [priority, setPriority] = useState<QuestPriority>('Medium');
  const [category, setCategory] = useState<QuestCategory>('Main Quest');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (quest) {
      setTitle(quest.title);
      setDescription(quest.description);
      setStatus(quest.status);
      setPriority(quest.priority);
      setCategory(quest.category);
      setDueDate(quest.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Planned');
      setPriority('Medium');
      setCategory('Main Quest');
      setDueDate('');
    }
  }, [quest, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: quest?.id,
      title,
      description,
      status,
      priority,
      category,
      dueDate,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="parchment-texture w-full max-w-lg rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] border-4 border-amber-950 p-6 relative overflow-hidden"
          >
            {/* Inner frame structure */}
            <div className="absolute inset-2 border border-amber-900/20 rounded pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-amber-900/20 pb-3 mb-4">
              <h2 className="text-xl font-serif font-bold text-medieval-leather flex items-center gap-2">
                <Feather className="w-5 h-5 text-amber-800" />
                {quest ? 'EDIT SCROLL PROTOCOL' : 'SCRIBE NEW QUEST'}
              </h2>
              <button onClick={onClose} className="p-1 text-amber-900 hover:bg-amber-950/10 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10 font-serif">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Quest Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Cryptographic Asset Deployment Pipeline"
                  className="w-full p-2 border border-amber-900/40 bg-amber-50/50 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-sm text-medieval-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Description / Lore</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Establish background mechanics and expectations here..."
                  rows={3}
                  className="w-full p-2 border border-amber-900/40 bg-amber-50/50 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-sm text-medieval-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Category Bracket</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as QuestCategory)}
                    className="w-full p-2 border border-amber-900/40 bg-amber-50/50 rounded text-sm text-medieval-ink"
                  >
                    <option value="Main Quest">Main Quest</option>
                    <option value="Side Quest">Side Quest</option>
                    <option value="Guild Contract">Guild Contract</option>
                    <option value="Alchemy">Alchemy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Current Stance</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as QuestStatus)}
                    className="w-full p-2 border border-amber-900/40 bg-amber-50/50 rounded text-sm text-medieval-ink"
                  >
                    <option value="Planned">Planned (Prophecy)</option>
                    <option value="In Progress">In Progress (Active)</option>
                    <option value="Completed">Completed (Legendary)</option>
                    <option value="Delayed">Delayed (Stalled)</option>
                    <option value="Cancelled">Cancelled (Forsaken)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Severity / Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as QuestPriority)}
                    className="w-full p-2 border border-amber-900/40 bg-amber-50/50 rounded text-sm text-medieval-ink"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Target Epoch Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border border-amber-900/40 bg-amber-50/50 rounded text-sm text-medieval-ink"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-amber-900/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-amber-900 hover:bg-amber-950/10 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-gradient-to-r from-amber-950 to-amber-900 text-parchment font-bold rounded border border-medieval-gold/40 shadow hover:brightness-110"
                >
                  Seal Chronicle Entry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};