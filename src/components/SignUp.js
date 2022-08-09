import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContextProvider";
import { Validate } from "./shared/Validate";
import styles from "./styles/Signup.module.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [touch, setTouch] = useState({});
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    setError(Validate(formData, "SignUp"));
  }, [formData, touch]);

  const focusHandler = (event) => {
    setTouch({ ...touch, [event.target.name]: true });
  };
  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(error).length) {
      dispatch({ type: "SIGN", payload: formData });
    } else {
      setTouch({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
    }
  };
  return (
    <div className={styles.SignUpContainer}>
      <h1 className="m-4">SignUp</h1>
      {state.sign ? (
        <div className={styles.success}>
          <h5 className="h3">Welcome</h5>
          <Link to="/accountLanding">
            <button
            className="btn btn-info w-75 mt-2"
              onClick={() => dispatch({ type: "LOGIN", payload: formData })}
            >
              Accept
            </button>
          </Link>
        </div>
      ) : (
        <form className={styles.formContainer} onSubmit={submitHandler}>
          <div>
            <div className={styles.formField}>
              <input
                className={
                  error.name && touch.name
                    ? styles.redBorder
                    : styles.border
                }
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                placeholder="Name"
                onFocus={focusHandler}
              />
              <div>{error.name && touch.name && <span>{error.name}</span>}</div>
            </div>
            <div className={styles.formField}>
              <input
                className={
                  error.email && touch.email
                    ? styles.redBorder
                    : styles.border
                }
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Email"
                onFocus={focusHandler}
              />
              <div>
                {error.email && touch.email && <span>{error.email}</span>}
              </div>
            </div>
            <div className={styles.formField}>
              <input
                className={
                  error.password && touch.password
                    ? styles.redBorder
                    : styles.border
                }
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Password"
                onFocus={focusHandler}
              />
              <div>
                {error.password && touch.password && (
                  <span>{error.password}</span>
                )}
              </div>
            </div>
            <div className={styles.formField}>
              <input
                className={
                  error.confirmPassword && touch.confirmPassword
                    ? styles.redBorder
                    : styles.border
                }
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                placeholder="ConfirmPassword"
                onFocus={focusHandler}
              />
              <div>
                {error.confirmPassword && touch.confirmPassword && (
                  <span>{error.confirmPassword}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
          <button type="submit" className="btn w-75">SignUp</button>
          <div>
          <Link to="/login">
            <button className="btn" type="button">Login</button>
          </Link>
          <Link to="/*">
            <button className="btn" type="button">Cancel</button>
          </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
