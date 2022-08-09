import React, { useEffect, useState,useContext } from "react";
import { userContext } from "../contexts/UserContextProvider";
import { Link } from "react-router-dom";
import { Validate } from "./shared/Validate";
import styles from "./styles/Signup.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {state,dispatch}=useContext(userContext)
  const [error, setError] = useState({});
  const [touch, setTouch] = useState({});

  useEffect(() => {
    setError(Validate(formData));
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

  const submitHandler =event=>{
    event.preventDefault();
    if(!Object.keys(error).length){
        dispatch({type:"LOGIN",payload:formData})
    }else{
        setTouch({
          email:true,
          password:true,
        })
    }

  }
  return (
    <div className={styles.SignUpContainer}>
      <h1 className=" m-5">Login</h1>
      {state.login ?
      <div className={styles.success}>
        <h5 className="h3">Welcome</h5>
        <Link to="/accountLanding">
        <button className="btn btn-info w-75 mt-2" onClick={()=>dispatch({type:"LOGIN",payload:formData})}>Accept</button>
        </Link>
      </div>:
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <div>
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
        </div>
        <div className={styles.buttons}>
        <button className="btn w-75" type="submit">Login</button>
        <div>
        <Link to="/signUp">
          <button className="btn" type="button">SignUp</button>
        </Link>
        <Link to="/*">
          <button className="btn" type="button">Cancel</button>
        </Link>
        </div>
        </div>
      </form>
}
    </div>
  );
};

export default Login;
