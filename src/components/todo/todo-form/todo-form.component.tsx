import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "./todo-form.module.css";
import { item } from "utils";
import { editTodo, todoListState } from "atoms/todo";

function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [editFormValue, setEditFormValue] = useRecoilState(editTodo);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleSubmitTodo = (e: React.FormEvent) => {
    e.preventDefault();
    createNewItem();
  };

  const createNewItem = () => {
    if (editFormValue?.id) {
      const replaceIndex = todoList.findIndex(
        (todo) => todo.id === editFormValue.id
      );

      const editedTodo = {
        ...todoList[replaceIndex],
        text: inputRef.current?.value ?? "",
      };

      setTodoList((prev) => [
        ...prev.slice(0, replaceIndex),
        editedTodo,
        ...prev.slice(replaceIndex + 1),
      ]);
      setEditFormValue(null);
    } else {
      const newItem = item.create(inputRef.current!.value.trim());
      setTodoList((prev) => [...prev, newItem]);
    }

    resetForm();
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      if (!inputRef.current || !inputRef.current.value.trim()) {
        return;
      }
      createNewItem();
    }
  };

  const resetForm = () => {
    setImmediate(() => {
      formRef.current?.reset();
      inputRef.current?.focus();
    });
  };

  useEffect(() => {
    if (editFormValue?.id && inputRef.current) {
      inputRef.current.value = editFormValue.text;
      inputRef.current.focus();
    }
  }, [editFormValue]);

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmitTodo}
      onKeyPress={handlePressEnter}
    >
      <textarea
        ref={inputRef}
        className={styles.text}
        placeholder="할 일을 작성하세요."
        required
      />
      <button type="submit">
        <span>{buttonText(Boolean(editFormValue?.id))}</span>
      </button>
    </form>
  );
}

const buttonText = (isEdit: boolean) => (isEdit ? "수정하기" : "등록하기");

export default TodoForm;
