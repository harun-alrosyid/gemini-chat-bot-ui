import { useState } from 'react';
import useSWR from 'swr';

export type Message = {
  role: string;
  content: string;
};

type ApiResponse = {
  statusCode: number;
  status: string;
  result: Message[];
};

const fetcher = async (url: string): Promise<Message[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  const data: ApiResponse = await res.json();
  if (data.statusCode !== 200 || data.status !== 'success') {
    throw new Error('API error');
  }
  return data.result;
};


const useMessageChat = () => {
  const { data, error, isLoading, mutate } = useSWR<Message[]>('/api/chat', fetcher);
  const [messages, setMessages] = useState<
    Array<Message>
  >([]);

  const [input, setInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
  };

  return {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
  };
};

export default useMessageChat;
