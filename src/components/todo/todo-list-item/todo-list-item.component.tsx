import React, { useRef } from "react";
import { editTodo, Todo, todoListState } from "atoms/todo";
import styles from "./todo-list-item.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";

interface Props {
  todo: Todo;
}
function TodoListItem({ todo }: Props) {
  const { id, isComplete, text } = todo;
  const touchRef = useRef<number>(0);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const setEditTodo = useSetRecoilState(editTodo);

  const handleDeleteItem = () => {
    const deleteItemIndex = todoList.findIndex((todo) => todo.id === id);
    setTodoList([
      ...todoList.slice(0, deleteItemIndex),
      ...todoList.slice(deleteItemIndex + 1),
    ]);
  };

  const handleDoneTodo = () => {
    const toggleIndex = todoList.findIndex((todo) => todo.id === id);
    const toggleItem = {
      ...todoList[toggleIndex],
      isComplete: !todoList[toggleIndex].isComplete,
    };
    setTodoList([
      ...todoList.slice(0, toggleIndex),
      toggleItem,
      ...todoList.slice(toggleIndex + 1),
    ]);
  };

  const handleDoubleTouch = () => {
    const current = new Date().getTime();
    if (current - touchRef.current <= 1000) {
      handleDoneTodo();
    } else {
      touchRef.current = current;
    }
  };

  const handleClickEdit = () => {
    setEditTodo(todo);
  };

  return (
    <li
      className={`${styles.item} ${isComplete && styles.done}`}
      onDoubleClick={handleDoneTodo}
      onTouchStart={handleDoubleTouch}
    >
      <span className={styles.id}>{id}</span>
      <p className={styles.content}>{text}</p>
      <div className={styles.controls}>
        <button onClick={handleClickEdit}>✏️</button>
        <button onClick={handleDeleteItem}>❌</button>
      </div>
    </li>
  );
}

export default TodoListItem;
