import React from 'react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx';
import { ArrowLeft, Images } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

interface Props {
  emptyFunction: () => void;
}

const EmptyAlbumImages: React.FC<Props> = ({ emptyFunction }) => {
  return (
    <Empty className="bg-white/10">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Images />
        </EmptyMedia>
        <EmptyTitle className="text-white/80">No Images Yet!</EmptyTitle>
        <EmptyDescription className="text-white/70">
          No images are available in this album. Please upload images.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="lg" onClick={emptyFunction}>
          <ArrowLeft />
          Back To Albums
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyAlbumImages;
