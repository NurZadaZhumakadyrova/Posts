import React from 'react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

interface Props {
  emptyFunction: () => void;
}

const EmptyComments: React.FC<Props> = ({ emptyFunction }) => {
  return (
    <Empty className="bg-white/10">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-black/30">
          <MessageSquare className="text-white/50" />
        </EmptyMedia>
        <EmptyTitle className="text-white/80">No Comments Yet!</EmptyTitle>
        <EmptyDescription className="text-white/70">
          You have no comments on this post yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="lg" className="bg-black/30" onClick={emptyFunction}>
          <ArrowLeft />
          All my posts
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyComments;
