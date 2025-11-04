import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Message } from '@/hooks/useCommunityChat';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

// Generate a consistent color for each user based on their user_id
const getUsernameColor = (userId: string): string => {
  const colors = [
    '#06CF9C', // Teal/Cyan
    '#BB86FC', // Purple
    '#F06292', // Pink
    '#4FC3F7', // Light Blue
    '#FFB74D', // Orange
    '#AED581', // Light Green
    '#FF8A65', // Deep Orange
    '#9575CD', // Deep Purple
    '#4DB6AC', // Teal
    '#DCE775', // Lime
    '#FFD54F', // Amber
    '#A1887F', // Brown
  ];

  // Simple hash function to convert user_id to index
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const MessageBubble = ({ message, isOwnMessage }: MessageBubbleProps) => {
  const usernameColor = getUsernameColor(message.user_id);

  return (
    <div
      className={cn(
        "flex flex-col mb-4 max-w-[70%]",
        isOwnMessage ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      {!isOwnMessage && (
        <div
          className="text-xs font-semibold mb-1 px-2"
          style={{ color: usernameColor }}
        >
          {message.user_name}
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl px-4 py-2 break-words",
          isOwnMessage
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-accent text-accent-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      <div className="text-xs text-muted-foreground mt-1 px-2">
        {format(new Date(message.created_at), 'HH:mm')}
      </div>
    </div>
  );
};