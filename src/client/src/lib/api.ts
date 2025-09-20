import axios from 'axios';

export type TodoDTO = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchTodos(signal?: AbortSignal) {
  const res = await api.get<TodoDTO[]>('/todos', {
    signal,
    headers: { 'cache-control': 'no-cache' },
  });
  if (res.status >= 400) throw new Error(`Failed to list (${res.status})`);
  return res.data;
}

export async function createTodo(title: string) {
  const res = await api.post<TodoDTO>('/todos', { title });
  if (res.status >= 400) throw new Error(`Failed to create (${res.status})`);
  return res.data;
}

export async function patchTodo(id: number, patch: Partial<Pick<TodoDTO, 'title' | 'completed'>>) {
  const res = await api.patch<TodoDTO>(`/todos/${id}`, patch);
  if (res.status >= 400) throw new Error(`Failed to update (${res.status})`);
  return res.data;
}

export async function deleteTodo(id: number) {
  const res = await api.delete(`/todos/${id}`);
  if (res.status === 404) return { notFound: true as const };
  if (res.status >= 400) throw new Error(res.data?.message || `Failed to remove (${res.status})`);
  return { ok: true as const };
}
