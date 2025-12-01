import type { IUser } from '@/types/userTypes.ts';
import type { IPost } from '@/types/postTypes.ts';

export const getUser = (
  users: IUser[],
  options: { post?: IPost; userId?: number },
) => {
  const { post, userId } = options;

  if (post?.userId) {
    return users.find((p) => p.id === post.userId);
  }

  if (userId) {
    return users.find((p) => p.id === userId);
  }
};
