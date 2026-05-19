export type QuestStatus = 'Planned' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled';
export type QuestPriority = 'Low' | 'Medium' | 'High' | 'Legendary';
export type QuestCategory = 'Main Quest' | 'Side Quest' | 'Guild Contract' | 'Alchemy';

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: QuestStatus;
  priority: QuestPriority;
  category: QuestCategory;
  dueDate: string;
  createdAt: string;
}

export interface QuestFilters {
  status: QuestStatus | 'All';
  priority: QuestPriority | 'All';
  category: QuestCategory | 'All';
  search: string;
}