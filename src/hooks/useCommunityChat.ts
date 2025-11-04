import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { mockMessages } from '@/data/mockCommunityMessages';

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

  // Load mock messages for active channel
  useEffect(() => {
    if (!activeChannelId) {
      setMessages([]);
      return;
    }

    // Find the active channel to get its slug
    const activeChannel = channels.find(ch => ch.id === activeChannelId);
    if (!activeChannel) {
      setMessages([]);
      return;
    }

    // Filter mock messages by channel slug
    const channelMessages = mockMessages
      .filter(msg => msg.channel_slug === activeChannel.slug)
      .map(msg => ({
        id: msg.id,
        channel_id: activeChannelId,
        user_id: msg.user_id,
        user_name: msg.user_name,
        content: msg.content,
        created_at: msg.created_at,
      }))
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    setMessages(channelMessages);
  }, [activeChannelId, channels]);

  // Real-time subscription disabled for mock messages
  // Using static mock data instead

  // Send message - Session-only (UI only, not saved to backend)
  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeChannelId || !content.trim()) return;

      setSending(true);

      // Simulate sending delay
      setTimeout(() => {
        // Get or create a user ID for the session
        let userId = localStorage.getItem('driver_user_id');
        let userName = localStorage.getItem('driver_user_name');

        if (!userId) {
          // Generate a simple user ID
          userId = 'current_user_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('driver_user_id', userId);
        }

        if (!userName) {
          // Use a default name
          userName = 'You';
          localStorage.setItem('driver_user_name', userName);
        }

        // Create new message object
        const newMessage: Message = {
          id: 'temp_' + Date.now(),
          channel_id: activeChannelId,
          user_id: userId,
          user_name: userName,
          content: content.trim(),
          created_at: new Date().toISOString(),
        };

        // Add message to state (session only)
        setMessages((prev) => [...prev, newMessage]);

        setSending(false);
      }, 300);
    },
    [activeChannelId]
  );

  return {
    channels,
    messages,
    loading,
    sending,
    sendMessage,
  };
};