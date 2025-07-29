import { UIMessage } from 'ai';
import { ScrollArea } from 'components/components/ui/scroll-area';
import { Bot, User } from 'lucide-react';
import { FunctionComponent, HTMLAttributes, RefAttributes } from 'react';

import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface BoxProps extends ScrollAreaProps, RefAttributes<HTMLDivElement> {
  messages: UIMessage[];
  isLoading: boolean;
}

const Box: FunctionComponent<BoxProps> = ({
  messages = [],
  isLoading,
  className,
  ...attrs
}) => {
  const isMessagesEmpty = messages.length === 0;
  return (
    <ScrollArea
      className={`flex-1 p-6${className ? className : ""} `}
      {...attrs}
    >
      <div className="space-y-4">
        {isMessagesEmpty && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
              Welcome to AI Assistant
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Start a conversation by typing a message below
            </p>
          </div>
        )}

        {messages.map((message) => {
          if (!message) {
            throw new Error("Message is null or undefined");
          }

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Box;
