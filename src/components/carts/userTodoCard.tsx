import React from 'react';
import type { ITodo } from '@/types.ts';
import { CheckCircle2, Circle } from 'lucide-react';

interface Props {
  todo: ITodo;
}

const UserTodoCard: React.FC<Props> = ({ todo }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-green-400/30 p-3 transition-all duration-300">
      <div
        className={`absolute inset-0 transition-all duration-300 pointer-events-none ${
          todo.completed
            ? 'bg-gradient-to-br from-green-500/[0.05] via-teal-500/[0.05] to-green-500/[0.05]'
            : 'bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/[0.03] group-hover:via-purple-500/[0.03] group-hover:to-pink-500/[0.03]'
        }`}
      />

      <div className="relative flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {todo.completed ? (
            <CheckCircle2 className="size-5 text-green-400" strokeWidth={2.5} />
          ) : (
            <Circle
              className="size-5 text-white/30 group-hover:text-purple-400 transition-colors"
              strokeWidth={2}
            />
          )}
        </div>
        <p
          className={`flex-1 transition-all ${
            todo.completed
              ? 'line-through text-white/60'
              : 'text-white/90 group-hover:text-white'
          }`}
        >
          {todo.title}
        </p>
      </div>
    </div>
  );
};

export default UserTodoCard;
