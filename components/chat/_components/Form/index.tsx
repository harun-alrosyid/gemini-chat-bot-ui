import { Button } from 'components/components/ui/button';
import { Input } from 'components/components/ui/input';
import { Send } from 'lucide-react';
import { FunctionComponent, HTMLAttributes } from 'react';

interface FormProps extends HTMLAttributes<HTMLDivElement> {
  input: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
  isLoading: boolean;
}

const Form: FunctionComponent<FormProps> = ({
  input,
  handleChange,
  handleSubmit,
  isLoading,
  className,
  ...attrs
}) => {
  return (
    <div
      className={`p-6 border-t border-slate-200 dark:border-slate-700${
        className ? className : ""
      }`}
      {...attrs}
    >
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={input}
          onChange={handleChange}
          placeholder="Type your message..."
          className="flex-1 rounded-full border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 px-4 py-3"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default Form;
