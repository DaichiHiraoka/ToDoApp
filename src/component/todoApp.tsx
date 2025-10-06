import Form from './Form/Form';
import Item from './Item/Item'; 
import { useTodoContext } from './Context/todoContext';
import {Card, CardHeader, CardContent, CardTitle} from "@/component/ui/card";

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
    dispatch({
      type: "DELETE_TODO",
      payload: { id: id, text: "" }
    });
  };

  // 未完了タスクのカウンタ
  const incompleteTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <main className="container mx-auto flex flex-col items-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader >
          <CardTitle className="text-2xl font-bold tracking-tight">TodoApp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
          <Form onAddTodo={handleAddTodo} />
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">
              <p>未完了タスク: {incompleteTodoCount}</p>
              </h2>
              
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
        </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TodoApp;
