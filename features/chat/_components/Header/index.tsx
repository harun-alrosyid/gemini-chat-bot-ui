import { Bot } from 'lucide-react';
import { FunctionComponent, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const Header: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...attrs
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-6 border-b border-slate-200 dark:border-slate-700",
        className
      )}
      {...attrs}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Chat Bot Assistant
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Always here to help
        </p>
      </div>
    </div>
  );
};

export default Header;
