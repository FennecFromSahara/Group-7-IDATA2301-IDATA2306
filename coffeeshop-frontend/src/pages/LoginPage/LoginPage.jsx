import React from "react";
import NavBar from "../../components/NavBar";
import LoginForm from "./LoginForm";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../../components/Footer";

/**
 * Represents the Login Page.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function LoginPage() {
  const { setUser } = useAuth();

  return (
    <>
      <NavBar />

      <LoginForm setUser={setUser} />

      <Footer />
    </>
  );
}

export default LoginPage;
