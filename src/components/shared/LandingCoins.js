import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingCoins.module.css"
const LandingCoins = ({ data }) => {
  return (
      <div className={styles.CoinContainer}>
        <div className="ml-3">
        <img src={data.image} alt="pic" />
        <span  className="font-weight-bold text-secondary ml-3">{data.name}</span>
        </div>
        <span
          className={
            data.price_change_24h > 0
              ? " font-weight-bold text-success mr-4"
              : " font-weight-bold text-danger mr-4"
          }
        >
          {data.price_change_24h.toFixed(2)}
        </span>
      </div>
  );
};

export default LandingCoins;
