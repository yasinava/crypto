import axios from "axios";

export const getData = async ()=>{
  const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false")
  return res.data;
}
