import React from "react";
import { editTodo, Todo, todoListState } from "atoms/todo";
import styles from "./todo-list-item.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";

interface Props {
  todo: Todo;
}
function TodoListItem({ todo }: Props) {
  const { id, isComplete, text } = todo;
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

  const handleClickEdit = () => {
    setEditTodo(todo);
  };

  return (
    <li
      className={`${styles.item} ${isComplete && styles.done}`}
      onDoubleClick={handleDoneTodo}
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
