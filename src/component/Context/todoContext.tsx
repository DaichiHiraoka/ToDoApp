import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Dispatch } from 'react';
import type { Todo, TodoAction } from "../Reducer/todoReducer";
import { todoReducer } from "../Reducer/todoReducer";

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
    const [todos, dispatch] = useReducer(todoReducer, []);

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