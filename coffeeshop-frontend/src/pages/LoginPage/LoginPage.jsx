import NavBar from "../../components/NavBar";
import LoginForm from "./LoginForm";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const { setUser } = useAuth();

  return (
    <div>
      <NavBar />

      <LoginForm setUser={setUser} />
    </div>
  );
}

export default LoginPage;
