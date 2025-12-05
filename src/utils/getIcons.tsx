import { FileText, Images, ListTodo, Users } from 'lucide-react';

export const getIcon = (label: string) => {
  switch (label) {
    case 'Users':
      return <Users className="size-4" />;
    case 'Posts':
      return <FileText className="size-4" />;
    case 'Tasks':
      return <ListTodo className="size-4" />;
    case 'Albums':
      return <Images className="size-4" />;
    default:
      return null;
  }
};