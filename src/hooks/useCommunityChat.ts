import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface Message {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name?: string;
}

export const useCommunityChat = (activeChannelId: string | null) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  // Fetch channels
  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching channels:', error);
        toast({
          title: 'Error',
          description: 'Failed to load channels',
          variant: 'destructive',
        });
      } else {
        setChannels(data || []);
      }
      setLoading(false);
    };

    fetchChannels();
  }, [toast]);

  // Fetch messages for active channel
  useEffect(() => {
    if (!activeChannelId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', activeChannelId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: 'Error',
          description: 'Failed to load messages',
          variant: 'destructive',
        });
      } else {
        // Fetch user names for messages
        const messagesWithUsers = await Promise.all(
          (data || []).map(async (message) => {
            const { data: userData } = await supabase.auth.getUser();
            if (message.user_id === userData.user?.id) {
              return {
                ...message,
                user_name: userData.user?.user_metadata?.name || 'You',
              };
            }
            return {
              ...message,
              user_name: message.user_id.substring(0, 8), // Fallback to user ID substring
            };
          })
        );
        setMessages(messagesWithUsers);
      }
    };

    fetchMessages();
  }, [activeChannelId, toast]);

  // Set up real-time subscription
  useEffect(() => {
    if (!activeChannelId) return;

    const channel = supabase
      .channel(`messages:${activeChannelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${activeChannelId}`,
        },
        async (payload) => {
          const newMessage = payload.new as Message;
          
          // Get user name
          const { data: userData } = await supabase.auth.getUser();
          const messageWithUser = {
            ...newMessage,
            user_name:
              newMessage.user_id === userData.user?.id
                ? userData.user?.user_metadata?.name || 'You'
                : newMessage.user_id.substring(0, 8),
          };

          setMessages((prev) => [...prev, messageWithUser]);

          // Show toast if message is not from current user and not in active channel
          if (newMessage.user_id !== userData.user?.id) {
            const currentChannel = channels.find((ch) => ch.id === activeChannelId);
            toast({
              title: `New message in #${currentChannel?.name}`,
              description: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? '...' : ''),
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChannelId, channels, toast]);

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeChannelId || !content.trim()) return;

      setSending(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast({
            title: 'Error',
            description: 'You must be logged in to send messages',
            variant: 'destructive',
          });
          return;
        }

        const { error } = await supabase.from('messages').insert({
          channel_id: activeChannelId,
          user_id: user.id,
          content: content.trim(),
        });

        if (error) {
          console.error('Error sending message:', error);
          toast({
            title: 'Error',
            description: 'Failed to send message',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: 'Error',
          description: 'Failed to send message',
          variant: 'destructive',
        });
      } finally {
        setSending(false);
      }
    },
    [activeChannelId, toast]
  );

  return {
    channels,
    messages,
    loading,
    sending,
    sendMessage,
  };
};