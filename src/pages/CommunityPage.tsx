import { useState, useEffect } from 'react';
import { ChannelList } from '@/components/community/ChannelList';
import { ChatArea } from '@/components/community/ChatArea';
import { useCommunityChat } from '@/hooks/useCommunityChat';
import { orderNotificationService } from '@/services/orderNotificationService';

const CommunityPage = () => {
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [showChannels, setShowChannels] = useState(true);
  const { channels, messages, loading, sending, sendMessage } = useCommunityChat(activeChannelId);

  // Pause notifications when in community chat
  useEffect(() => {
    orderNotificationService.pause();
    return () => {
      orderNotificationService.resume();
    };
  }, []);

  // Auto-select first channel when channels load
  useEffect(() => {
    if (channels.length > 0 && !activeChannelId) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]);

  const handleChannelSelect = (channelId: string) => {
    setActiveChannelId(channelId);
    setShowChannels(false); // Hide channels on mobile after selection
  };

  const handleBackToChannels = () => {
    setShowChannels(true);
  };

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
    <div className="flex h-screen overflow-hidden">
      {/* Mobile: Show channels or chat based on state */}
      <div className={`${showChannels ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0`}>
        <ChannelList
          channels={channels}
          activeChannelId={activeChannelId}
          onChannelSelect={handleChannelSelect}
        />
      </div>
      
      {/* Mobile: Show chat when channel is selected */}
      <div className={`${!showChannels ? 'flex' : 'hidden'} md:flex flex-1 w-full`}>
        <ChatArea
          channel={activeChannel}
          messages={messages}
          onSendMessage={sendMessage}
          sending={sending}
          onBack={handleBackToChannels}
        />
      </div>
    </div>
  );
};

export default CommunityPage;