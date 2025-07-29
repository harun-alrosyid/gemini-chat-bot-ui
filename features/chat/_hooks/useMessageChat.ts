import { useState } from 'react';

import useApiChat, { Message } from './useApiChat';

const useMessageChat = () => {
  const { trigger, isMutating } = useApiChat();
  
  const [messages, setMessages] = useState<Array<Message>>([]);

  const [input, setInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    setTimeout(async () => {
      const result = await trigger({
        message: [{ role: "user", content: input }],
      });
      setMessages((prev) => [...prev, ...result]);
    }, 2000);

    setInput("");
  };

  return {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading: isMutating,
  };
};

export default useMessageChat;
