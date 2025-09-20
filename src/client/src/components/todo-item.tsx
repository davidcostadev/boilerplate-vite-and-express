import { useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

type Props = {
  todo: Todo;
  onToggle: (id: number, next: boolean) => Promise<void>;
  onRename: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  busy: boolean;
};

export function TodoItem({ todo, onToggle, onRename, onDelete, busy }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  async function commitRename() {
    const next = title.trim();
    if (next && next !== todo.title) {
      await onRename(todo.id, next);
    }
    setEditing(false);
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(todo.id, e.target.checked);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setTitle(todo.title);
    setEditing(true);
  };

  const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitRename();
    }
  };

  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={busy}
      />
      {editing ? (
        <input
          value={title}
          onChange={handleRename}
          onBlur={commitRename}
          onKeyDown={handleKeyDown}
          disabled={busy}
          autoFocus
          style={{ flex: 1, padding: 4 }}
        />
      ) : (
        <>
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: busy ? 0.6 : 1,
            }}
          >
            {todo.title}
          </span>
          <button
            onClick={handleEdit}
            disabled={busy}
          >
            Edit
          </button>
        </>
      )}
      <button onClick={handleDelete}>Remove</button>
    </li>
  );
}
