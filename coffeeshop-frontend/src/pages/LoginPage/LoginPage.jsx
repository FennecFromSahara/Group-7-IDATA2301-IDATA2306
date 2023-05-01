import NavBar from "../../components/NavBar";
import LoginForm from "./LoginForm";

function LoginPage(props) {
  const user = props.user;
  const setUser = props.setUser;

  return (
    <div>
      <NavBar user={user} />

      <LoginForm setUser={setUser} />
    </div>
  );
}

export default LoginPage;
