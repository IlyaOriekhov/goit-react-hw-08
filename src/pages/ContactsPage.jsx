import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import Loader from "../components/Loader/Loader";
import SearchBox from "../components/SearchBox/SearchBox";

import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../redux/contacts/selectors";
import { selectVisibleContacts } from "../redux/filters/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";

const ContactsPage = () => {
  const contacts = useSelector(selectVisibleContacts);
  const { loading, error } = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h2 className="title">Phonebook</h2>
      <ContactForm />
      <SearchBox />
      {loading && <Loader />}
      {error && <p>Cant load contacts at the moment</p>}
      {!loading && !error && contacts.length !== 0 ? (
        <ContactList contacts={contacts} />
      ) : (
        <div className="phonebookEmpty">
          <p>The phonebook is empty</p>
        </div>
      )}
    </>
  );
};

export default ContactsPage;
