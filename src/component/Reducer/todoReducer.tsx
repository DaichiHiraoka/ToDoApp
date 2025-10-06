export type Todo = {
    id: number;
    text: string;
    completed: boolean;
}
export type TodoAction = {
    type: "ADD_TODO" | "DELETE_TODO" | "TOGGLE_TODO" | "EDIT_TODO";
    payload: {
        id: number;
        text: string;
    };
};

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
        case "ADD_TODO":
            if (!action.payload.text) return state;
            return [...state, { id: Date.now(), text: action.payload.text, completed: false }];
        
        case "TOGGLE_TODO":
            return state.map((todo) =>
                todo.id === action.payload.id ? 
            { ...todo, completed: !todo.completed } :
             todo
            );
        
        case "DELETE_TODO":
            return state.filter(todo => todo.id !== action.payload.id);

        case "EDIT_TODO":
            
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text! } : todo
            );

        default:
            return state;
        }
}