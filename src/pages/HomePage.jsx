import phonebookSvg from "../assets/phonebook.svg";
import reactSvg from "../assets/react.svg";

import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn, selectAuthUser } from "../redux/auth/selectors";

const HomePage = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const user = useSelector(selectAuthUser);

  return isLoggedIn ? (
    <div>
      <h1 className="greet">Welcome back, {user.name}!</h1>
      <img className="react" src={reactSvg} alt="React" />
    </div>
  ) : (
    <div>
      <h1 className="greet">Hello there!</h1>
      <img className="phonebook" src={phonebookSvg} alt="Phonebook" />
    </div>
  );
};

export default HomePage;
