import { TodoItem, type Todo } from './todo-item';

type Props = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: number, next: boolean) => Promise<void>;
  onRename: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  busyIds: Set<number>;
};

export function TodoList({ todos, loading, error, onToggle, onRename, onDelete, busyIds }: Props) {
  if (loading) return <p>Loading…</p>;
  if (error)
    return (
      <div>
        <p style={{ color: 'crimson' }}>{error}</p>
      </div>
    );

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((t, index) => (
        <TodoItem
          key={index}
          todo={t}
          onToggle={onToggle}
          onRename={onRename}
          onDelete={onDelete}
          busy={busyIds.has(t.id)}
        />
      ))}
    </ul>
  );
}
