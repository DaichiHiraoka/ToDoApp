import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Dispatch } from 'react';
import type { Todo, TodoAction } from "../Reducer/todoReducer";
import { todoReducer } from "../Reducer/todoReducer";
import { useLocalStorage } from '../hooks/useLocalStorage';

// コンテキストの型定義
type TodoContextType = {
    todos: Todo[];
    dispatch: Dispatch<TodoAction>;
};

// コンテキストの作成
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// プロバイダーコンポーネントのProps型
type TodoProviderProps = {
    children: ReactNode;
};

// プロバイダーコンポーネント
export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    // ローカルストレージから初期値とセッターを取得
    const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>("todos", []);
    
    // useReducerの初期値→ローカルストレージから取得した値に変更
    const [todos, dispatch] = useReducer(todoReducer, storedTodos);

    // todoの状態が変更されていればローカルストレージに変更を加える
    React.useEffect(() => {
        setStoredTodos(todos);
    }, [todos, setStoredTodos]);

    const value: TodoContextType = {
        todos,
        dispatch,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};

// カスタムフック
export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};