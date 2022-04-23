import React , {useEffect, useState} from "react";

export const authContext = React.createContext({
    token : '',
  isLoggend: false,
  login: (token) => {},
  logout: () => {},
});
const isLogged = localStorage.getItem("userToken");
const AuthContextProvider = (props) => {
  const [token, setToken] = useState(isLogged); 
  const isUserLogged = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("userToken", token);
  };
  
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("userToken");
  };

  const contextValue = {
    token: token,
    isLoggend: isUserLogged,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
