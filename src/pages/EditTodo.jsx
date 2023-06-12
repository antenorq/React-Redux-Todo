import TodoForm from "../components/TodoForm";
import { useParams } from "react-router-dom";

const EditTodo = () => {
  const { id } = useParams();

  return (
    <>
      <TodoForm type="EDIT" id={id} />
    </>
  );
};

export default EditTodo;
