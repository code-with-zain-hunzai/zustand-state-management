import Column from './Column';
import NewTodoDialog from './new-todo-dialog';

export default function Columns() {
  return (
    <>
      <NewTodoDialog />
    <div className="flex flex-col md:flex-row justify-center items-start gap-4 w-full max-w-7xl">
      <Column title="Todo" status="TODO"/>
      <Column title="In progress" status="IN_PROGRESS" />
      <Column title="Done" status="DONE" />
    </div>
    </>
  );
}
 