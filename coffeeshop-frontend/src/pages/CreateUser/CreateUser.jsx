import CreateUserForm from "./CreateUserForm";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import React from "react";

function CreateUser() {
  return (
    <div>
      <NavBar />

      <CreateUserForm />

      <Footer />
    </div>
  );
}

export default CreateUser;
