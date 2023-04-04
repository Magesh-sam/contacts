import React from "react";
import './styles/app.css'
import { NavBar } from "./components/NavBar";
import { ContactList } from "./components/ContactList";

export const App = () => {
  return (
    <main>
      <NavBar />
      <ContactList/>
    </main>
  );
};
