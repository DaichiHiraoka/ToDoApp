
import { useState } from "react";
import type { Todo } from '../types/Todo';
import Form from './Form/Form';
import Item from './Item/Item';

const TodoApp = () => {
  // 状態管理
  const [todos, setTodos] = useState<Todo[]>([]);

  // 新しいTodoを追加する関数
  const handleAddTodo = (text: string) => {
    const newTask: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTask]);
  };

  // Todoの完了状態を切り替える関数
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todoを編集する関数
  const handleEditTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Todoを削除する関数
  const handleDeleteTodo = (id: number) => {
    const confirmDelete = window.confirm("本当に削除しますか？");
    if (!confirmDelete) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 未完了タスクのカウンタ
  const incompleteTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h1>TodoApp</h1>
      <Form onAddTodo={handleAddTodo} />
      <p>未完了タスク数: {incompleteTodoCount}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <Item
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
