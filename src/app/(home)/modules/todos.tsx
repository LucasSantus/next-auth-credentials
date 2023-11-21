import { TodoItem } from "./todo-item";

interface TodosProps {}

export function Todos({}: TodosProps): JSX.Element {
  return (
    <div className="grid w-full gap-3">
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
}
