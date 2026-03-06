import { AlertCircle, ListTodo, UserCheck } from "lucide-react";

type TabId = "queue" | "dispute" | "profile";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: Tab[] = [
  {
    id: "queue",
    label: "Queue",
    icon: ListTodo,
  },
  {
    id: "dispute",
    label: "Dispute",
    icon: AlertCircle,
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserCheck,
  },
];

export type { TabId };

interface TaskQueueTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TaskQueueTabs({
  activeTab,
  onTabChange,
}: TaskQueueTabsProps) {
  return (
    <div className="bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-stretch h-14">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-all duration-150 ${
                isActive
                  ? "text-forest-base"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {/* Active indicator pill at top */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-forest-base rounded-b-full" />
              )}
              <Icon
                className={`w-5 h-5 transition-transform duration-150 ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide ${
                  isActive ? "text-forest-base" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
