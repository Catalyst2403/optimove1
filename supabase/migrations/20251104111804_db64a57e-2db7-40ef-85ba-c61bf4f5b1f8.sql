-- Create channels table
CREATE TABLE public.channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Channels policies (everyone can read)
CREATE POLICY "Anyone can view channels"
  ON public.channels
  FOR SELECT
  USING (true);

-- Messages policies
CREATE POLICY "Authenticated users can view messages"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert messages"
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Insert predefined channels
INSERT INTO public.channels (name, slug, description) VALUES
  ('Pay Updates', 'pay-updates', 'Discuss order payouts and app rate changes'),
  ('Job Problems', 'job-problems', 'Report issues or downtime'),
  ('Help Requests', 'help-requests', 'Ask questions or request assistance'),
  ('General', 'general', 'Open discussions and community chat');

-- Create index for faster queries
CREATE INDEX idx_messages_channel_created ON public.messages(channel_id, created_at DESC);
CREATE INDEX idx_messages_user ON public.messages(user_id);