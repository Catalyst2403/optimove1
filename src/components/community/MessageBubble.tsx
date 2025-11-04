import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Message } from '@/hooks/useCommunityChat';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageBubble = ({ message, isOwnMessage }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-4 max-w-[70%]",
        isOwnMessage ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      {!isOwnMessage && (
        <div className="text-xs font-medium text-muted-foreground mb-1 px-2">
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
        {format(new Date(message.created_at), 'h:mm a')}
      </div>
    </div>
  );
};