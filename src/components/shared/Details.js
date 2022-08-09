import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CoinsContext } from "../../contexts/CoinsContextProvider";
import { userContext } from "../../contexts/UserContextProvider";
import logoBack from "../assets/icons/left-arrow-back-svgrepo-com.svg";
import styles from "../styles/Detail.module.css";
const Details = () => {
  const { state, dispatch } = useContext(userContext);
  const data = useContext(CoinsContext);
  const params = useParams();
  const navigate = useNavigate();

  const coin = data.filter((item) => item.id === params.id);
  const Bitcoin = data.filter((item) => item.name === "Bitcoin");
  const tether = data.filter((item) => item.name === "Tether");
  const ethereum = data.filter((item) => item.name === "Ethereum");

  if (coin.length) {
    var { name, image, current_price, market_cap, symbol, price_change_24h } =
      coin[0];
  }

  return (
    <div>
      {state.login ? (
        <div className={styles.detailsContainer}>
          <div className={styles.Navbar}>
            <button onClick={() => navigate("/accountLanding")} className="btn">
              <img src={logoBack} alt="back" style={{ width: "20px" }} />
            </button>
            <h5 className="font-weight-bold">
              {name}({symbol})
            </h5>
            <img className={styles.picCoin} src={image} alt="pic" />
          </div>
          <div className={styles.marketGlobal}>
            <span className="">
              Global Market Cap <span>$ {market_cap}</span>
            </span>
          </div>
          <div className={styles.price}>
            <div className="w-50 my-4 mx-3 font-weight-bold p-2 shadow btn">
              <span
                className={
                  price_change_24h > 0 ? "text-success" : "text-danger"
                }
              >
                {price_change_24h.toFixed(2)}
              </span>
              <span className="text-muted">priceChange</span>
            </div>
            <div className="w-50 my-4 mx-3 font-weight-bold p-2 shadow btn">
              <span>{current_price}</span>
              <span className="text-muted">price</span>
            </div>
          </div>
          <div className={styles.btn}>
            <button className="btn w-75 my-3 p-2">BUY</button>
          </div>

          <div className={styles.coins}>
            <Link to="/details/ethereum">
            <div className="btn shadow-sm">
              <h5>{ethereum[0].symbol}</h5>
              <span>{ethereum[0].current_price}</span>
            </div>
            </Link>
            <Link to="/details/bitcoin">
            <div  className="btn shadow-sm">   
            <h5>{Bitcoin[0].symbol}</h5>
              <span>{Bitcoin[0].current_price}</span>
            </div>
            </Link>
            <Link to="/details/tether">
            <div  className="btn shadow-sm">
            <h5>{tether[0].symbol}</h5>
              <span>{tether[0].current_price}</span>
            </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.logout}>
          <h5 className="h3 text-muted m-4">logOut</h5>
          <div>
          <Link to="/login">
            <button  type="button" className="btn  w-75">Login</button>
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

export default Details;
