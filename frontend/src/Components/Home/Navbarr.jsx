import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "./../../images/logo.png";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
// import { authContext } from "./../store/Context/AuthContet";
import { Navbar, Nav } from 'react-bootstrap';
import { authContext } from "../store/Context/AuthContext";




export default function Navbarr() {
  const isAuthen = useContext(authContext);
  const Logged = isAuthen.isLoggend && isAuthen.role === 'user';
  // return (
  //   <nav 
  //   // className="bg-black" 
  //   style={{
  //     backgroundColor: "#110f10"
  //   }}
  //   >
  //     <div
  //       className={
  //         "d-flex justify-content-between  align-items-center container-fluid  " +
  //         style["nav-height"]
  //       }
  //     >
  //       <ul className="d-flex align-items-center p-0 m-0 ">
  //         <img
  //           src={logo}
  //           className={style["logo"] + " mx-3"}
  //           alt="Logo of company"
  //         />
  // {Logged ? (
  //   <React.Fragment>
  //     <NavLink
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/HomeUser"
  //     >
  //       Home
  //     </NavLink>
  //     <NavLink
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/submit_ticket"
  //     >
  //       Ticket
  //     </NavLink>
  //     <NavLink
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/myTickets"
  //     >
  //       My Tickets
  //     </NavLink> 
  //     <NavLink
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/Faqs"
  //     >
  //       Faqs
  //     </NavLink>
  //   </React.Fragment>
  // ) : (
  //   <NavLink
  //     className={(navData) =>
  //       navData.isActive ? classes.active : classes.NormalLi
  //     }
  //     to="/Home"
  //   >
  //     Home
  //   </NavLink>
  // )}
  //       </ul>
  //       <ul className="d-flex justify-content-between p-0 m-0">
  // {Logged ? (
  //   <React.Fragment>
  //     <NavLink
  //       onClick={()=>isAuthen.logout()}
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/Home"
  //     >
  //       Logout
  //     </NavLink>
  //   </React.Fragment>
  // ) : (
  //   <React.Fragment>
  //     <NavLink
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/signup"
  //     >
  //       Signup
  //     </NavLink>
  //     <NavLink
  //       className={(navData) =>
  //         navData.isActive ? classes.active : classes.NormalLi
  //       }
  //       to="/login"
  //     >
  //       Login
  //     </NavLink>
  //   </React.Fragment>
  // )}
  //       </ul>

  //     </div>
  //   </nav>
  // );

  return (
    <Navbar className={style['nav-height']} bg="dark" expand="lg">
      <div className="container-fluid">

        <Navbar.Brand href="#home">
          <img
            src={logo}
            className={style["logo"] + " mx-3"}
            alt="Logo of company"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="bg-dark" id="basic-navbar-nav">
          <Nav className="d-flex justify-content-between w-100">
            <Nav >
              {Logged ?
                (
                  <React.Fragment>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? classes.active : classes.NormalLi
                      }
                      to="/HomeUser"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? classes.active : classes.NormalLi
                      }
                      to="/submit_ticket"
                    >
                      Ticket
                    </NavLink>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? classes.active : classes.NormalLi
                      }
                      to="/myTickets"
                    >
                      My Tickets
                    </NavLink>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? classes.active : classes.NormalLi
                      }
                      to="/Faqs"
                    >
                      Faqs
                    </NavLink>
                  </React.Fragment>
                ) : (
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? classes.active : classes.NormalLi
                    }
                    to="/Home"
                  >
                    Home
                  </NavLink>
                )}
            </Nav>
            <Nav>
              {Logged ? (
                <React.Fragment>
                  <NavLink
                    onClick={() => isAuthen.logout()}
                    className={(navData) =>
                      navData.isActive ? classes.active : classes.NormalLi
                    }
                    to="/Home"
                  >
                    Logout
                  </NavLink>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? classes.active : classes.NormalLi
                    }
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? classes.active : classes.NormalLi
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </React.Fragment>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
        </div>
    </Navbar>
  )
}
