import React from 'react';
import styles from './Item.module.css';
import type { Todo } from '../../types/Todo';
import Button from '../Button/Button';

type ItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
};

const Item: React.FC<ItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [editedText, setEditedText] = React.useState<string>(todo.text);

    // 編集を保存する関数
    const handleSaveEditing = () => {
        if (editedText.trim() === "") return;
        onEdit(todo.id, editedText);
        setIsEditing(false);
    };

    // 編集をキャンセルする関数
    const handleCancelEditing = () => {
        setIsEditing(false);
        setEditedText(todo.text);
    };

    // タスクを削除する関数
    const handleDeleteTodo = () => {
        onDelete(todo.id);
    };

    return (
        <li className={styles.item}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className={styles.checkbox}
            />
            
            {isEditing ? (
                <div className={styles.editMode}>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className={styles.editInput}
                    />
                    <Button onClick={handleSaveEditing} variant="primary">
                        Save
                    </Button>
                    <Button onClick={handleCancelEditing} variant="secondary">
                        Cancel
                    </Button>
                </div>
            ) : (
                <div className={styles.viewMode}>
                    <span 
                        className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
                    >
                        {todo.text}
                    </span>
                    <div className={styles.actions}>
                        <Button onClick={() => setIsEditing(true)} variant="secondary">
                            Edit
                        </Button>
                        <Button onClick={handleDeleteTodo} variant="danger">
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default Item;
