import css from "./Navigation.module.css";

import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";

const getLinkStyle = ({ isActive }) =>
  classNames(css.link, {
    [css.isActive]: isActive,
  });

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <div className={css.nav}>
      <NavLink to="/" className={getLinkStyle}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={getLinkStyle} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
