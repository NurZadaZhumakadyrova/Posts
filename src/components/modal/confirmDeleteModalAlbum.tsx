import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import React from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deleteTheAlbum: () => void;
  deleteLoading: boolean;
}

const DeleteAlbumConfirmModal: React.FC<Props> = ({
  open,
  onOpenChange,
  deleteTheAlbum,
  deleteLoading,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] text-white overflow-hidden border-0 p-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.05] via-orange-500/[0.03] to-red-500/[0.05] pointer-events-none" />
          <div className="relative">
            <DialogHeader className="p-6 pb-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-30 blur-xl" />
                  <div className="relative p-4 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-400/30">
                    <AlertTriangle
                      className="size-12 text-red-400"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-center text-white mb-2">
                  Delete Album?
                </DialogTitle>
              </div>
              <DialogDescription className="text-white/70 text-center text-base leading-relaxed">
                This action cannot be undone. This album will be permanently
                deleted from the system.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="p-6 pt-4 border-t border-white/10 flex gap-3 justify-center sm:justify-center">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="bg-white/5 border-white/30 text-white hover:bg-white/10 hover:text-white px-6"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={deleteTheAlbum}
                disabled={deleteLoading}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg px-6"
              >
                {deleteLoading ? (
                  <Spinner className="mr-2" />
                ) : (
                  <Trash2 className="mr-2 size-4" />
                )}
                Delete
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAlbumConfirmModal;
