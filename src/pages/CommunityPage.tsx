import { useState, useEffect } from 'react';
import { ChannelList } from '@/components/community/ChannelList';
import { ChatArea } from '@/components/community/ChatArea';
import { useCommunityChat } from '@/hooks/useCommunityChat';

const CommunityPage = () => {
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const { channels, messages, loading, sending, sendMessage } = useCommunityChat(activeChannelId);

  // Auto-select first channel when channels load
  useEffect(() => {
    if (channels.length > 0 && !activeChannelId) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]);

  const activeChannel = channels.find((ch) => ch.id === activeChannelId) || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <ChannelList
        channels={channels}
        activeChannelId={activeChannelId}
        onChannelSelect={setActiveChannelId}
      />
      <ChatArea
        channel={activeChannel}
        messages={messages}
        onSendMessage={sendMessage}
        sending={sending}
      />
    </div>
  );
};

export default CommunityPage;