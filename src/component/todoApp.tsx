
import { useEffect, useState } from "react";


type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp = () => {
  //状態管理
  const [Todos, setTodos] = useState<Todo[]>([]);

    //新しいTodoを追加する関数
  const [newTodo, setNewTodo] = useState<string>("");
  
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return; //空のTodoは追加しない

    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...Todos, newTask]);
    //入力フィールドをクリア
    setNewTodo("");
  };
  //編集を始める関数
  const handleStartEditing = (id: number, currentText: string) => {
    setEditingTodoId(id);
    setEditedTodoText(currentText);
  }

  //編集を保存する関数
  const handleSaveEditing = () => {
    if (editingTodoId === null) return;

    //編集内容の更新
    setTodos(
      Todos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, text: editedTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setEditedTodoText("")
  }

  //編集をキャンセルする関数
  const handleCancelEditing = () => {
    setEditingTodoId(null);   
    setEditedTodoText("");
  }

  //未完了タスクのカウンタ
  const incompleteTodo:number = Todos.filter((todo) => !todo.completed).length;
  
  const toggleTodo = (id: number) => {
    setTodos(
      Todos.map((todo) => (todo.id === id ? {
         ...todo, completed: 
         !todo.completed 
        } : todo))
    )
  }
  return (
    <>
      <h1>TodoApp</h1>
      <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <p>未完了タスク数: {incompleteTodo}</p>
      {/*todosの表示*/} 
      <ul>
        {Todos.map((Todo) => (
          <li key={Todo.id}>
            <input
              type="checkbox"
              checked={Todo.completed}
              onChange={() => toggleTodo(Todo.id)}
            />
            {/*編集モード中か判定*/}
            {editingTodoId === Todo.id ? (
              <>
              <input 
              type="text"
              value={editedTodoText}
              onChange={(e) => setEditedTodoText(e.target.value)}
                />
              <button 
              onClick={handleSaveEditing}>
                Save
                </button>
              <button
              onClick={handleCancelEditing}>
                Cancel    
                </button>
                </>
              ):(
                <>
              <span 
              style={{ textDecoration: Todo.completed 
              ? "line-through" : "none" }}>
                {Todo.text}
                </span>
              <button 
              onClick={() => handleStartEditing(Todo.id, Todo.text)}>
                Edit 
              </button>
              </>
            )}
          </li>
          ))}
      </ul>
    </>
  );

}
export default TodoApp;
