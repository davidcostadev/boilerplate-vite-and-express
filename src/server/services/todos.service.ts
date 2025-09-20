import { proxy } from './proxy.service';

type TodoResult = any;

export const TodosService = {
  async list(): Promise<TodoResult> {
    return await proxy('/todos', { method: 'GET' });
  },

  async get(id: number): Promise<TodoResult> {
    return await proxy(`/todos/${id}`, { method: 'GET' });
  },

  async create(input: { title: string }): Promise<TodoResult> {
    const payload = { title: input.title, completed: false, createdAt: new Date().toISOString() };
    return await proxy('/todos', { method: 'POST', body: payload });
  },

  async patch(id: number, body: TodoResult): Promise<TodoResult> {
    return await proxy(`/todos/${id}`, { method: 'PATCH', body: body });
  },

  async put(id: number, body: TodoResult): Promise<TodoResult> {
    return await proxy(`/todos/${id}`, { method: 'PUT', body: body });
  },

  async remove(id: number): Promise<TodoResult> {
    return await proxy(`/todos/${id}`, { method: 'DELETE' });;
  },
};
