-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can insert messages" ON public.messages;

-- Recreate messages table without auth requirement
DROP TABLE IF EXISTS public.messages CASCADE;

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read and insert messages (for anonymous chat)
CREATE POLICY "Anyone can view messages"
  ON public.messages
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON public.messages
  FOR INSERT
  WITH CHECK (true);

-- Re-enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Recreate index for faster queries
CREATE INDEX idx_messages_channel_created ON public.messages(channel_id, created_at DESC);
CREATE INDEX idx_messages_user ON public.messages(user_id);
