import { useEffect, useRef, useState } from 'react';
import { Hash, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Button } from '@/components/ui/button';
import type { Channel, Message } from '@/hooks/useCommunityChat';
import { supabase } from '@/integrations/supabase/client';

interface ChatAreaProps {
  channel: Channel | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
  sending: boolean;
  onBack?: () => void;
}

export const ChatArea = ({ channel, messages, onSendMessage, sending, onBack }: ChatAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user ID
  useEffect(() => {
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id || null);
    };
    getUserId();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <Hash className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg">Select a channel to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Channel Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="md:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <Hash className="w-5 h-5 text-primary" />
          <div>
            <h2 className="font-semibold">{channel.name}</h2>
            <p className="text-xs text-muted-foreground">{channel.description}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.user_id === currentUserId}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} disabled={sending} />
    </div>
  );
};