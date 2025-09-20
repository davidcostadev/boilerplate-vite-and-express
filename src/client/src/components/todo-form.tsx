import { useState } from 'react';

type Props = {
  creating: boolean;
  onCreate: (title: string) => Promise<void>;
};

export function TodoForm({ onCreate, creating }: Props) {
  const [title, setTitle] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate(title.trim());
    setTitle('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={title}
        onChange={handleChange}
        placeholder="New ToDo"
        style={{ flex: 1, padding: 8 }}
        disabled={creating}
      />
      <button type="submit" disabled={!title.trim() || creating}>
        Add
      </button>
    </form>
  );
}
