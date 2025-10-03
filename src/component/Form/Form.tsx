import React from 'react';
import styles from './Form.module.css';
import Button from '../Button/Button';

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
        <form onSubmit={handlerAddTodo} className={styles.form}>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいタスクを入力"
                className={styles.input}
            />
            <Button type="submit" variant="primary">
                追加
            </Button>
        </form>
    );
};

export default Form;
