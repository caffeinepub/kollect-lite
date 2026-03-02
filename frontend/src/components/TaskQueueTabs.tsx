import { ListTodo, AlertCircle, UserCheck } from 'lucide-react';

type TabId = 'queue' | 'dispute' | 'profile';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  {
    id: 'queue',
    label: 'Queue',
    icon: <ListTodo className="w-3.5 h-3.5" />,
  },
  {
    id: 'dispute',
    label: 'Dispute',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <UserCheck className="w-3.5 h-3.5" />,
  },
];

export type { TabId };

interface TaskQueueTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TaskQueueTabs({ activeTab, onTabChange }: TaskQueueTabsProps) {
  return (
    <div className="bg-forest-medium border-b border-forest-light shadow-sm">
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 text-[11px] font-semibold transition-all relative ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200/70 hover:text-blue-100 hover:bg-white/5'
              }`}
            >
              <span className={`flex items-center gap-1.5 ${isActive ? 'text-white' : 'text-blue-200/70'}`}>
                {tab.icon}
                <span className={isActive ? 'font-bold' : 'font-medium'}>{tab.label}</span>
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-teal-ring rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
