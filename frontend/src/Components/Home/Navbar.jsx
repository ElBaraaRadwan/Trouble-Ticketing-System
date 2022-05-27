import React , {useContext } from "react";
import style from "./Navbar.module.css";
import logo from "./../../images/logo.png";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { authContext } from "../store/Context/AuthContext";
import Dashbord from "../Admin/Dashbord";



export default function Navbar() {
  const isAuthen = useContext(authContext);
  const Logged = isAuthen.isLoggend && isAuthen.role === 'user';
  return (
    <nav 
    // className="bg-black" 
    style={{
      backgroundColor: "#110f10"
    }}
    >
      <div
        className={
          "d-flex justify-content-between  align-items-center container-fluid "  +
          style["nav-height"]
        }
      >
        <ul className="d-flex align-items-center p-0 m-0">
          <img
            src={logo}
            className={style["logo"] + " mx-3"}
            alt="Logo of company"
          />
              {/* <NavLink
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
                to="/Faqs"
              >
                Faqs
              </NavLink>
              <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes.NormalLi
              }
              to="/Home"
            >
              Home
            </NavLink>
            <NavLink
                onClick={()=>isAuthen.logout()}
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/Home"
              >
                Logout
              </NavLink> */}
            <React.Fragment>
            
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/Dashbord"
              >
                Dashbord
              </NavLink> 
                 <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/DeleteAdmin"
              >
                DeleteAdmin
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/UpdataFaq"
              >
                UpdataFaq
              </NavLink>
              
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/ShowReport"
              >
                ShowReport
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/AssignTicket"
              >
                AssignTicket
              </NavLink>
              
              
            </React.Fragment>
          
        </ul>
        <ul className="d-flex justify-content-between p-0 m-0">
      
            <React.Fragment>
              <NavLink
                onClick={()=>isAuthen.logout()}
                className={(navData) =>
                  navData.isActive ? classes.active : classes.NormalLi
                }
                to="/Home"
              >
                Logout
              </NavLink>
            </React.Fragment>
        </ul>
      </div>
    </nav>
  );
}
