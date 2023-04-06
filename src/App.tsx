import { useState } from "react";
import "./styles/app.css";
import { NavBar } from "./components/NavBar";
import { ContactList } from "./components/ContactList";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

export const App = () => {
  const [query, setquery] = useState("");

  const contacts = useSelector((state: RootState) => state.contacts);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.number.toString().toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <NavBar query={query} setquery={setquery} />
      <ContactList setquery={setquery} contacts={filteredContacts} />
    </main>
  );
};
