import React from "react";
import { useRecoilValue } from "recoil";
import styles from "./todo-list.module.css";

import { todoListState } from "atoms/todo";
import TodoForm from "components/todo/todo-form/todo-form.component";
import TodoListItem from "components/todo/todo-list-item/todo-list-item.component";

function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Recoil Todo List</h1>
        <span className={styles.subtitle}>
          리코일로 만들어 보는 할 일 목록 입니다. <em>(완료 더블 클릭)</em>
        </span>
      </header>
      <TodoForm />
      <ul className={styles.list}>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
