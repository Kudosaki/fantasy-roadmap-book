import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, Search, Filter, Shield } from 'lucide-react';
import { BookFrame } from './components/BookFrame';
import { BookCover } from './components/BookCover';
import { QuestLog } from './components/QuestLog';
import { QuestModal } from './components/QuestModal';
import { ParticleEffect } from './components/ParticleEffect';
import { Quest, QuestFilters, QuestStatus, QuestPriority, QuestCategory } from './types';

const SEED_QUESTS: Quest[] = [
  {
    id: 'seed-1',
    title: 'Establish Enchanted Frontend Engine',
    description: 'Configure layout layers with structural responsive wrappers to guarantee absolute cross-device viewport translation.',
    status: 'Completed',
    priority: 'Legendary',
    category: 'Main Quest',
    dueDate: '2026-05-15',
    createdAt: new Date().toISOString()
  },
  {
    id: 'seed-2',
    title: 'Deploy Automated Workflow Runes',
    description: 'Construct native GitHub Actions workflow blueprints to trigger automated deployment logic towards static endpoints.',
    status: 'In Progress',
    priority: 'High',
    category: 'Guild Contract',
    dueDate: '2026-06-01',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [quests, setQuests] = useState<Quest[]>(() => {
    const historical = localStorage.getItem('ARCHIVED_QUESTS');
    return historical ? JSON.parse(historical) : SEED_QUESTS;
  });

  const [filters, setFilters] = useState<QuestFilters>({
    status: 'All',
    priority: 'All',
    category: 'All',
    search: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuestForEdit, setActiveQuestForEdit] = useState<Quest | null>(null);

  useEffect(() => {
    localStorage.setItem('ARCHIVED_QUESTS', JSON.stringify(quests));
  }, [quests]);

  const handleSaveQuest = (data: Partial<Quest> & { id?: string }) => {
    if (data.id) {
      setQuests(prev => prev.map(q => q.id === data.id ? { ...q, ...data } as Quest : q));
    } else {
      const newEntry: Quest = {
        id: `quest-${Date.now()}`,
        title: data.title || 'Untitled Scroll',
        description: data.description || '',
        status: data.status || 'Planned',
        priority: data.priority || 'Medium',
        category: data.category || 'Main Quest',
        dueDate: data.dueDate || '',
        createdAt: new Date().toISOString()
      };
      setQuests(prev => [newEntry, ...prev]);
    }
  };

  const handleDeleteQuest = (id: string) => {
    if (confirm("Are you certain you want to strike this entry from historical records?")) {
      setQuests(prev => prev.filter(q => q.id !== id));
    }
  };

  const filteredQuests = quests.filter(q => {
    const matchStatus = filters.status === 'All' || q.status === filters.status;
    const matchPriority = filters.priority === 'All' || q.priority === filters.priority;
    const matchCategory = filters.category === 'All' || q.category === filters.category;
    const matchSearch = q.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                        q.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchStatus && matchPriority && matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#110b07] text-medieval-ink p-4 md:p-8 flex items-center justify-center relative selection:bg-amber-900 selection:text-parchment-light">
      <ParticleEffect />
      
      <BookFrame>
        <AnimatePresence mode="wait">
          {!isBookOpen ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <BookCover quests={quests} onOpenBook={() => setIsBookOpen(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="pages"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 30 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full h-full bg-parchment rounded-xl overflow-hidden shadow-inner-tome"
            >
              {/* LEFT JOURNAL PAGE: Control Panel, Filters & Scribing Interface */}
              <div className="p-6 border-r border-amber-900/20 flex flex-col justify-between h-full">
                <div>
                  <button 
                    onClick={() => setIsBookOpen(false)}
                    className="flex items-center gap-1 text-xs font-serif text-amber-900 hover:text-amber-700 mb-4 transition-colors font-bold uppercase tracking-wider"
                  >
                    <ChevronLeft className="w-4 h-4" /> Close Tome
                  </button>
                  
                  <div className="space-y-4">
                    <div className="border-b border-amber-900/20 pb-2 flex justify-between items-center">
                      <h2 className="text-xl font-serif font-bold text-medieval-leather tracking-wide flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-800" /> TOME PARAMETERS
                      </h2>
                    </div>

                    {/* Live Search Field */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-amber-900/50" />
                      <input 
                        type="text"
                        placeholder="Search specific scrolls..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="w-full bg-amber-950/5 border border-amber-900/30 rounded pl-9 pr-3 py-2 font-serif text-xs text-medieval-ink placeholder-amber-950/40 focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    {/* Filter Breakdowns */}
                    <div className="space-y-3 pt-2 font-serif text-xs">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-900 mb-1">Campain Standpoint</label>
                        <select 
                          value={filters.status}
                          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as QuestStatus | 'All' }))}
                          className="w-full bg-amber-50/80 border border-amber-900/30 rounded p-1.5 text-medieval-ink"
                        >
                          <option value="All">All Projections</option>
                          <option value="Planned">Planned (Prophecy)</option>
                          <option value="In Progress">In Progress (Active)</option>
                          <option value="Completed">Completed (Legendary)</option>
                          <option value="Delayed">Delayed (Stalled)</option>
                          <option value="Cancelled">Cancelled (Forsaken)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-900 mb-1">Strategic Importance</label>
                        <select 
                          value={filters.priority}
                          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as QuestPriority | 'All' }))}
                          className="w-full bg-amber-50/80 border border-amber-900/30 rounded p-1.5 text-medieval-ink"
                        >
                          <option value="All">All Urgency Scales</option>
                          <option value="Low">Low Importance</option>
                          <option value="Medium">Medium Importance</option>
                          <option value="High">High Importance</option>
                          <option value="Legendary">Legendary Threat</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-900 mb-1">Guild Classification</label>
                        <select 
                          value={filters.category}
                          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as QuestCategory | 'All' }))}
                          className="w-full bg-amber-50/80 border border-amber-900/30 rounded p-1.5 text-medieval-ink"
                        >
                          <option value="All">All Operations</option>
                          <option value="Main Quest">Main Quest</option>
                          <option value="Side Quest">Side Quest</option>
                          <option value="Guild Contract">Guild Contract</option>
                          <option value="Alchemy">Alchemy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setActiveQuestForEdit(null); setIsModalOpen(true); }}
                  className="w-full mt-6 py-2.5 bg-gradient-to-r from-amber-900 to-amber-950 hover:brightness-110 text-parchment rounded font-serif font-bold text-xs tracking-widest border border-medieval-gold/40 flex items-center justify-center gap-1 transition-all shadow"
                >
                  <Plus className="w-4 h-4" /> SCRIBE OBJECTIVE ARCHIVE
                </button>
              </div>

              {/* RIGHT JOURNAL PAGE: Active Scroll List Display */}
              <div className="p-6 flex flex-col justify-between h-full bg-amber-50/20">
                <div className="space-y-4">
                  <div className="border-b border-amber-900/20 pb-2 flex justify-between items-center">
                    <h2 className="text-xl font-serif font-bold text-medieval-leather tracking-wide">
                      CAMPAIGN LOG ENTRIES
                    </h2>
                    <span className="text-xs font-serif font-bold text-amber-900 bg-amber-950/10 px-2.5 py-0.5 rounded-full border border-amber-900/10">
                      Matches: {filteredQuests.length}
                    </span>
                  </div>

                  <QuestLog 
                    quests={filteredQuests}
                    onEdit={(quest) => { setActiveQuestForEdit(quest); setIsModalOpen(true); }}
                    onDelete={handleDeleteQuest}
                  />
                </div>
                
                <div className="text-[10px] text-center font-serif italic text-amber-900/40 border-t border-amber-900/10 pt-4 mt-2">
                  "Let historical blueprints match factual accomplishments."
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BookFrame>

      <QuestModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setActiveQuestForEdit(null); }}
        onSave={handleSaveQuest}
        quest={activeQuestForEdit}
      />
    </main>
  );
}