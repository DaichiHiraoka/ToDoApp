import React from 'react';
import styles from './Item.module.css';
import type { Todo } from '../../types/Todo';
import { Button } from '../ui/button';
import { Pencil, Trash2, Check, X } from 'lucide-react';

import { AlertDialog,AlertDialogCancel,AlertDialogAction,
    AlertDialogContent,
    AlertDialogTitle,AlertDialogDescription
    ,AlertDialogFooter,AlertDialogTrigger,
    AlertDialogHeader} from '../ui/alert-dialog';   

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
            <button
                onClick={() => onToggle(todo.id)}
                className={`${styles.checkbox} w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    todo.completed 
                        ? '!bg-blue-200 !border-blue-300' 
                        : '!bg-black !border-black'
                }`}
            >
                {todo.completed && <Check className="w-3 h-3 text-blue-800" />}
            </button>

            {isEditing ? (
                <div className={styles.editMode}>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className={styles.editInput}
                    />
                    <Button className="mr-2 !bg-black hover:!bg-gray-800 !text-white" onClick={handleSaveEditing} >
                        Save
                    </Button>
                    <Button className="h-2 w-2 !bg-black hover:!bg-gray-800 !text-white" onClick={handleCancelEditing} variant="secondary">
                        <X className="h-2 w-2" />
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
                        <Button className="mr-3 !bg-black hover:!bg-gray-800 !text-white" onClick={() => setIsEditing(true)} >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="!bg-red-600 hover:!bg-red-700 !text-white">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogDescription>
                                        この操作は取り消すことができません。タスク「{todo.text}」を完全に削除します。
                                    </AlertDialogDescription>
                                    <AlertDialogTitle>削除を行いますか？</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex flex-col space-y-2 sm:flex-col">
                                    <AlertDialogAction 
                                        onClick={handleDeleteTodo}
                                        className="!bg-red-600 hover:!bg-red-700 !text-white w-full"
                                    >
                                        削除
                                    </AlertDialogAction>
                                    <AlertDialogCancel className="!bg-gray-200 hover:!bg-gray-300 !text-gray-800 w-full">
                                        キャンセル
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            )}
        </li>
    );
};

export default Item;
