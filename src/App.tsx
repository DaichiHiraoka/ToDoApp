import './App.css'
import TodoApp from './component/todoApp'
import { TodoProvider } from './component/Context/todoContext'

function App() {

  return (
    <TodoProvider>
      <TodoApp />
      {/* <UseReducerTest /> */}
    </TodoProvider>
  )
}

   
export default App
