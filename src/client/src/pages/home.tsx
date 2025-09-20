import { TodoForm } from '../components/todo-form';
import { TodoList } from '../components/todo-list';
import { useTodos } from '../hooks/use-todos';

export function Home() {
  const todosState = useTodos();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans">
      <h1>ToDos</h1>
      <TodoForm onCreate={todosState.create} creating={todosState.loading} />
      <hr />
      <TodoList
        todos={todosState.todos}
        loading={todosState.loading}
        error={todosState.error}
        onToggle={todosState.toggle}
        onRename={todosState.rename}
        onDelete={todosState.remove}
        busyIds={todosState.busyIds}
      />
    </div>
  );
}
