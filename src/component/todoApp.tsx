
import Form from './Form/Form';
import Item from './Item/Item'; 
import { useTodoContext } from './Context/todoContext';

const TodoApp = () => {
  const { todos, dispatch } = useTodoContext();

  // 新しいTodoを追加する関数
  const handleAddTodo = (text: string) => {
    dispatch({
      type: "ADD_TODO",
      payload: { id: Date.now(), text: text }
    });
  };

  // Todoの完了状態を切り替える関数
  const toggleTodo = (id: number) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: { id: id, text: "" }
    });
  };

  // Todoを編集する関数
  const handleEditTodo = (id: number, newText: string) => {
    dispatch({
      type: "EDIT_TODO",
      payload: { id: id, text: newText }
    });
  };

  // Todoを削除する関数
  const handleDeleteTodo = (id: number) => {
    const confirmDelete = window.confirm("本当に削除しますか？");
    if (!confirmDelete) return;
    dispatch({
      type: "DELETE_TODO",
      payload: { id: id, text: "" }
    });
  };

  // 未完了タスクのカウンタ
  const incompleteTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h1>TodoApp</h1>
      <Form onAddTodo={handleAddTodo} />
      <p>Uncompleted Tasks: {incompleteTodoCount}</p>
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
