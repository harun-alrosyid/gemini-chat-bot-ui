import useSWRMutation from 'swr/mutation';

export type Message = {
  role: string;
  content: string;
};

export type MessagePaylod = {
  message: Message[];
};

type ApiResponse = {
  statusCode: number;
  status: string;
  result: Message[];
};

const fetcher = async (
  url: string,
  { arg }: { arg: MessagePaylod }
): Promise<Message[]> => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  const data: ApiResponse = await res.json();
  if (data.statusCode !== 200 || data.status !== "success") {
    throw new Error("API error");
  }
  return data.result;
};

const useApiChat = () => {
  return useSWRMutation<Message[], Error, string, MessagePaylod>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
    fetcher
  );
};
export default useApiChat;
