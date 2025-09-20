import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { createTodo, deleteTodo, fetchTodos, patchTodo, type TodoDTO } from '../lib/api';

export function useTodos() {
  const [todos, setTodos] = useState<TodoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<number>>(new Set());
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const create = useCallback(async (title: string) => {
    setCreating(true);
    try {
      const data = await createTodo(title);
      setTodos((prev) => [...prev, data]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to create');
    } finally {
      setCreating(false);
    }
  }, []);

  const toggle = useCallback(async (id: number, next: boolean) => {
    setBusyIds((prev) => new Set(prev).add(id));
    try {
      const data = await patchTodo(id, { completed: next } as any);
      setTodos((prev) => prev.map((todo) => todo.id === id ? data : todo));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to toggle');
    } finally {
      setBusyIds((prev) => {
        const nextSet = new Set(prev);
        nextSet.delete(id);
        return nextSet;
      });
    }
  }, []);

  const rename = useCallback(async (id: number, title: string) => {
    setBusyIds((prev) => new Set(prev).add(id));
    try {
      const data = await patchTodo(id, { title });
      setTodos((prev) => prev.map((todo) => todo.id === id ? data : todo));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to rename');
    } finally {
      setBusyIds((prev) => {
        const nextSet = new Set(prev);
        nextSet.delete(id);
        return nextSet;
      });
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setBusyIds((prev) => new Set(prev).add(id));
    try {
      const res = await deleteTodo(id);
      if ('notFound' in res) {
        toast.error('Item no longer exists');
        return;
      }
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to remove');
    } finally {
      setBusyIds((prev) => {
        const nextSet = new Set(prev);
        nextSet.delete(id);
        return nextSet;
      });
    }
  }, []);

  return {
    todos,
    loading,
    error,
    busyIds,
    creating,
    create,
    toggle,
    rename,
    remove,
  };
}
