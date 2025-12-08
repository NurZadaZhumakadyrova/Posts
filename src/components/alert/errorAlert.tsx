import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { AlertCircleIcon } from 'lucide-react';

interface Props {
  message: string;
  type?: 'addPost' | 'deletePost' | 'editPost' | 'deleteComment' | 'addPhoto' | 'editPhoto';
}

const ErrorAlert:React.FC<Props> = ({ message, type }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 duration-700 fade-in-0">
      <Alert variant="destructive" className="border-red-500/50 bg-red-950/90">
        <AlertCircleIcon className="text-red-400" />
        <AlertTitle className="text-white font-bold">
          {type === 'addPost' && 'Problems arose when creating the post!'}
          {type === 'editPost' && 'Problems arose when updating the post!'}
          {type === 'deleteComment' && 'Problems arose when deleting the comment!'}
          {type === 'addPhoto' && 'Problems arose when adding the photo!'}
          {type === 'editPhoto' && 'Problems arose when updating the photo!'}
          {!type && 'An error occurred!'}
        </AlertTitle>
        <AlertDescription className="text-white/90">
          {message || 'Please try again later.'}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorAlert;