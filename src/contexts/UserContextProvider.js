import React, { createContext, useReducer } from "react";

export const userContext = createContext();
const initialState = {
  users: [],
  online: [],
  login: false,
  sign: false,
};
const reducer = (state, action) => {
  switch (action.type) {

    case "SIGN":
      if (!state.users.find((user) => user.email === action.payload.email)) {
        state.users.push({
          ...action.payload,
        });
        state.sign=true;

      } else {
          state.sign=false;
        alert("you can not use this email");
      }
      return {
        ...state,
        users: [...state.users],
        sign: state.sign,
      };

    case "LOGIN":
      if (
        state.users.find((user) => user.password === action.payload.password)
      ) {
        state.login = true;
      } else {
        state.login = false;
        alert("you do not have account ");
      }
      const newUser = state.users.filter(
        (user) => user.password === action.payload.password
      );
      return {
        ...state,
        online: [...newUser],
        sign:false,
        login: state.login,
        
      };
      case "LOGOUT":
        return{
            ...state,
            online: [],
            login: false,
        }

    default:
      return state;
  }
};
const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
