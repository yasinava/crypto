import React, { useState, useContext } from "react";
import { CoinsContext } from "../contexts/CoinsContextProvider";
import LandingCoins from "./shared/LandingCoins";
import styles from "./styles/LandingCoins.module.css";
import logoMore from "./assets/icons/more-svgrepo-com.svg";
import logoSearch from "./assets/icons/loupe-search-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContextProvider";
const LandingPage = () => {
  const coins = useContext(CoinsContext);
  const [search, setSearch] = useState("");
  const searchCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const [click, setClick] = useState({
    login: false,
    more: false,
  });
  const {state,dispatch}=useContext(userContext);
  return (
    <div>
      <div className={styles.LandingNavbar}>
        <div className={styles.searchBox}>
          <img src={logoSearch} alt="search" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="search ..."
          />
        </div>
        <button
          onClick={
            !click.more
              ? () => {
                  setClick({ ...click, more: true });
                }
              : () => {
                  setClick({ ...click, more: false });
                }
          }
          className="btn shadow-none"
        >
          <img src={logoMore} alt="more" />
        </button>
        {click.more && <div className={styles.moreItem}>
            <Link to="/login"><button  className="btn w-100 mt-2 shadow-sm font-weight-bold">Login your Account</button></Link>
            <Link to="/signUp"><button className="btn w-100 font-weight-bold" >Create Account</button></Link>
            </div>}
      </div>
      <div>
        {click.login ? (
          <div className={styles.loginBox}>
            <div className="mt-3">
              <span>Create or Login Account</span>
            </div>
            <Link to="/login">
              <button className="btn btn-primary mt-3 w-75">Login</button>
            </Link>
            <Link to="/signUp">
              <button className="btn btn-primary mt-3 w-75">SignUp</button>
            </Link>
            <button
              className="btn btn-secondary m-3 w-75"
              onClick={() => {
                setClick({ ...click, login: false });
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className={styles.listCoins}>
            {coins.length ? (
              searchCoin.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setClick({ ...click, login: true })}
                >
                  <LandingCoins key={item.id} data={item} />
                </div>
              ))
            ) : (
              <div className="mt-5 text-secondary font-weight-bold ">
                Connecting .....
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
