import { FunctionComponent, HTMLAttributes, useEffect, useRef } from 'react';

import { Card } from '@/components/ui/card';
import { useChat } from '@ai-sdk/react';

import Box from './_components/Box';
import Form from './_components/Form';
import Header from './_components/Header';

const Chat: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...attrs
}) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4${
        className ? className : ""
      }`}
      {...attrs}
    >
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <Header />
        <Box ref={scrollAreaRef} messages={messages} isLoading={isLoading} />
        <Form
          input={input}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Chat;
