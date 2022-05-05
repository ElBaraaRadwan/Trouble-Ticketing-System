import React , {useEffect, useState} from "react";

export const authContext = React.createContext({
  token : '',
  isLoggend: false,
  role: '',
  userId : null,
  login: (token) => {},
  logout: () => {},
  assignRole : (role)=>{},
  assignId : (id)=>{}
});
const isLogged = localStorage.getItem("userToken");
const roleLocal = localStorage.getItem('role');

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(isLogged); 
  const [role,setRole] = useState(roleLocal);
  const [id,setId] = useState(null);
  const isUserLogged = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("userToken", token);
  };
  const roleHandler = (role)=>{
    setRole(role);
    localStorage.setItem("role" , role );
  }
  const idHandler = (id)=>{
    setId(id)
  }
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("userToken");
  };


  const contextValue = {
    token: token,
    role : role,
    id : id,
    isLoggend: isUserLogged,
    login: loginHandler,
    logout: logoutHandler,
    assignRole : roleHandler,
    assignId : idHandler,
  };
  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
