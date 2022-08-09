import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../contexts/UserContextProvider";
import { Link } from "react-router-dom";
import styles from "../styles/Detail.module.css";
import logoAvatar from "../assets/icons/user-profile-svgrepo-com.svg";
const UserAccount = () => {
  const { state, dispatch } = useContext(userContext);
  const [data, setData] = useState({});
  useEffect(() => {
    state.online.map((item) => setData(item));
  }, []);
  return (
    <div>
      {state.login ? (
        <div className={styles.accountUser}>
          <div>
            <img src={logoAvatar} alt="avatar" />
          </div>
          <div>
            <h5 className="my-3 text-muted">{data.name}</h5>
          </div>
          <div>
            <h5 className="text-muted">{data.email}</h5>
          </div>
          <Link to="/accountLanding">
            <button className="btn w-75 btn-info my-4">coins</button>
          </Link>
        </div>
      ) : (
        <div className={styles.logout}>
          <h5 className="h3 text-muted m-4">logOut</h5>
          <div>
            <Link to="/login">
              <button type="button" className="btn  w-75">
                Login
              </button>
            </Link>
            <Link to="/*">
              <button className="btn  w-75 my-3">First page</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
