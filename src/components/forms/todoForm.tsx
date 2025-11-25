import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { FileText, Send } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import React, { useState } from 'react';
import type { ApiTodo } from '@/types.ts';
import { Spinner } from '@/components/ui/spinner.tsx';

interface Props {
  openModal: boolean;
  onOpenChange: () => void;
  todoFunction: (task: ApiTodo) => void;
  loading: boolean;
}

const initialState = {
  title: '',
  completed: false,
  userId: 0,
};

const TodoForm:React.FC<Props> = ({ openModal, onOpenChange, todoFunction, loading }) => {
  const [formData, setFormData] = useState<ApiTodo>(initialState);

  const handelChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoFunction(formData);
    setFormData(initialState);
  };

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] text-white overflow-hidden border-0 p-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  Create New Task
                </DialogTitle>
              </div>
              <DialogDescription className="text-white/60 text-sm">
                Fill in the details to create a new task.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6 space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="body"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <FileText className="size-4 text-pink-300" />
                  Title
                </Label>
                <Textarea
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handelChange}
                  placeholder="Enter your task..."
                  required
                  rows={8}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t border-white/10 flex gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="bg-white/5 border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
              >
                {loading ? (
                  <Spinner className="mr-2" />
                ) : (
                  <Send className="mr-2 size-4" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;