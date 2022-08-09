import React from 'react';
import "./App.css";
import { Route,Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CoinsContextProvider from './contexts/CoinsContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import AccountLandingPage from './components/AccountLandingPage';
import Details from './components/shared/Details';
import UserAccount from './components/shared/UserAccount';
const App = () => {
  return (
    <UserContextProvider>
    <CoinsContextProvider>
    <div className='App'>
      <div className='AppPage'>
      <Routes>
        <Route path='*' element={<LandingPage/>}/>
        <Route path='accountLanding' element={<AccountLandingPage/>}/>
        <Route path='details/:id' element={<Details/>}/>
        <Route path='account' element={<UserAccount/>}/>
        <Route path='signUp' element={<SignUp/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
      </div>
    </div>
    </CoinsContextProvider>
    </UserContextProvider>
  );
};

export default App;

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false