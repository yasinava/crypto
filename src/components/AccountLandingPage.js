import React, { useState, useContext, useEffect } from "react";
import { CoinsContext } from "../contexts/CoinsContextProvider";
import LandingCoins from "./shared/LandingCoins";
import styles from "./styles/LandingCoins.module.css";
import logoMore from "./assets/icons/more-svgrepo-com.svg";
import logoSearch from "./assets/icons/loupe-search-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContextProvider";
const AccountLandingPage = () => {
  const coins = useContext(CoinsContext);
  const [search, setSearch] = useState("");
  const searchCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const [click, setClick] = useState({
    searchInp: false,
    more: false,
  });
  const { state, dispatch } = useContext(userContext);
  const [data, setData] = useState({});
  useEffect(() => {
    state.online.map((item) => setData(item));
  }, []);
  return (
    <div>
      {state.login ? (
        <div>
          <div className={styles.LandingNavbar}>
            <div className={styles.searchBox}>
              <img
                src={logoSearch}
                alt="search"
                onClick={
                  !click.searchInp
                    ? () => {
                        setClick({ ...click, searchInp: true });
                      }
                    : () => {
                        setClick({ ...click, searchInp: false });
                      }
                }
              />
              {click.searchInp && (
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="search ..."
                />
              )}
            </div>
            {!click.searchInp && (
              <div className="h5 font-weight-bold text-muted">{data.name}</div>
            )}
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
            {click.more && (
              <div className={styles.moreItem}>
                <Link to="/account">
                  <button className="btn w-100 mt-2 shadow-sm font-weight-bold">
                    {data.name}
                  </button>
                </Link>
                <button
                  onClick={() => dispatch({ type: "LOGOUT" })}
                  className="btn w-100 font-weight-bold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div>
            <div className={styles.listCoins}>
              {coins.length ? (
                searchCoin.map((item) => (
                  <Link to={`/details/${item.id}`} key={item.id}>
                    <LandingCoins key={item.id} data={item} />
                  </Link>
                ))
              ) : (
                <div className="mt-5 text-secondary font-weight-bold ">
                  Connecting .....
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.logout}>
          <h5 className="h3 text-muted m-4">logOut</h5>
          <div>
          <Link to="/login">
            <button type="button" className="btn  w-75">Login</button>
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

export default AccountLandingPage;
