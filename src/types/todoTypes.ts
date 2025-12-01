export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type ApiTodo = Omit<ITodo, 'id'>;
