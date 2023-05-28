import CreateUserForm from "./CreateUserForm";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import React from "react";

/**
 * Displays the create user page.
 *
 * @returns {JSX.Element} The rendered React component.
 */
function CreateUser() {
  return (
    <>
      <NavBar />

      <CreateUserForm />

      <Footer />
    </>
  );
}

export default CreateUser;
