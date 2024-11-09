import css from "./LoginForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginForm = () => {
  const emailField = "email-field";
  const passwordField = "password-field";
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .min(8, "Password should contain at least 8 symbols")
      .max(50, "Too Long!"),
    password: Yup.string()
      .required("Password is required")
      .email("Password is incorrect"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
    actions.resetForm();
    navigate("/");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={css.form}>
        <label className={css.name} htmlFor={emailField}>
          Email
        </label>
        <Field
          className={css.field}
          type="text"
          name="email"
          id={emailField}
          placeholder="example@gmail.com"
        />
        <ErrorMessage className={css.error} name="email" component="span" />

        <label className={css.name} htmlFor={passwordField}>
          Password
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          id={passwordField}
          placeholder="Please enter the password"
        />
        <ErrorMessage className={css.error} name="password" component="span" />
        <button className={css.btn} type="submit">
          Log in
        </button>

        {error && <p className={css.error}>Something went wrong {error}</p>}
      </Form>
    </Formik>
  );
};

export default LoginForm;
