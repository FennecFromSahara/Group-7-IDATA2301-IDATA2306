import CreateUserForm from "./CreateUserForm";
import NavBar from "../../components/NavBar";

function CreateUser(props) {
  const user = props.user;

  return (
    <div>
      <NavBar user={user} />

      <CreateUserForm />
    </div>
  );
}

export default CreateUser;
