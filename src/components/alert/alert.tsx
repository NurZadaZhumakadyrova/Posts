import { CheckCircle2, Sparkles } from 'lucide-react';
import React from 'react';

interface Props {
  type:
    | 'isNewPost'
    | 'editPost'
    | 'deletePost'
    | 'addComment'
    | 'editComment'
    | 'deleteComment'
    | 'addTask'
    | 'deleteTask'
    | 'editTask';
}

const AlertGlobal: React.FC<Props> = ({ type }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 duration-700 fade-in-0">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/90 via-black/95 to-black/90 border border-white/20 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.15] via-teal-500/[0.10] to-emerald-500/[0.15]" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/20 rounded-full blur-3xl" />
        <div className="relative p-4 flex gap-4 items-start">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-green-400 to-teal-400 opacity-30 blur-lg" />
            <CheckCircle2
              className="relative size-8 text-green-400"
              strokeWidth={2.5}
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-white font-bold text-lg flex items-center gap-2">
              Success!
              <Sparkles className="size-5 text-green-300" />
            </div>
            <div className="text-white/90 font-medium text-sm">
              {type === 'isNewPost' && 'The post was successfully created!'}
              {type === 'editPost' && 'The post was successfully updated!'}
              {type === 'deletePost' && 'The post was successfully deleted!'}
              {type === 'deleteComment' &&
                'The comment was successfully deleted!'}
              {type === 'addComment' && 'The comment was successfully added!'}
              {type === 'editComment' && 'The comment was successfully edited!'}
              {type === 'addTask' && 'The task was successfully added!'}
              {type === 'deleteTask' && 'The task was successfully deleted!'}
              {type === 'editTask' && 'The task was successfully updated!'}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400" />
      </div>
    </div>
  );
};

export default AlertGlobal;
