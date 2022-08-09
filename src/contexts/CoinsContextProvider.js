import React,{createContext,useEffect,useState} from 'react';
import { getData } from '../services/api';



export const CoinsContext = createContext()

const CoinsContextProvider = ({children}) => {
    const [product , setProduct]=useState([])
    useEffect(()=>{
        const fetchApi = async()=>{
             setProduct(await getData())
        }
        fetchApi();
    },[])
    return (
        <CoinsContext.Provider value={product}>
            {children}
        </CoinsContext.Provider>
    );
};

export default CoinsContextProvider;