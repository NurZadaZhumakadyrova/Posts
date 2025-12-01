import React from 'react';
import {
  Empty, EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx';
import { Images, ListTodo, MessageCircleMore, RefreshCcwIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

interface Props {
  title: string;
  text: string;
  type: 'post' | 'todo' | 'album' | 'userPost' | 'user';
  getFunction?: () => void;
}

const EmptyBlock: React.FC<Props> = ({ title, text, type, getFunction }) => {
  return (
    <Empty className="from-muted/50 to-background  min-h-screen flex flex-col bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {type === 'post' && <MessageCircleMore />}
          {type === 'todo' && <ListTodo />}
          {type === 'album' && <Images />}
          {type === 'userPost' && <MessageCircleMore />}
          {type === 'user' && <Users />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{text}</EmptyDescription>
      </EmptyHeader>
      {getFunction && (
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={getFunction}>
            <RefreshCcwIcon />
            Refresh
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

export default EmptyBlock;
