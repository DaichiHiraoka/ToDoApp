import React from 'react';
import styles from './Form.module.css';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {Plus} from 'lucide-react';


type FormProps = {
    onAddTodo: (text: string) => void;
};

const Form: React.FC<FormProps> = ({ onAddTodo }) => {
    const [newTodo, setNewTodo] = React.useState<string>("");

    const handlerAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() === "") return;
        onAddTodo(newTodo);
        setNewTodo("");
    };

    return (
        <form onSubmit={handlerAddTodo} className="flex w-full items-center-space-x-2">
            <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいタスクを入力"
                className={styles.input}
            />
            <Button type="submit" className="!bg-black hover:!bg-gray-800 !text-white">
                <Plus className="mr-2 h-2 w-2" />追加
            </Button>
        </form>
    );
};

export default Form;
