import { Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Channel } from '@/hooks/useCommunityChat';

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string | null;
  onChannelSelect: (channelId: string) => void;
}

export const ChannelList = ({ channels, activeChannelId, onChannelSelect }: ChannelListProps) => {
  return (
    <div className="w-64 border-r bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Community Channels</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors",
                activeChannelId === channel.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              <Hash className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{channel.name}</div>
                <div className="text-xs truncate opacity-80">{channel.description}</div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};