import { Navbar, Nav } from 'react-bootstrap';
import style from './HomePage.module.css'
import { NavLink } from "react-router-dom";
import logo from '../../images/logo.png'
import { authContext } from "../store/Context/AuthContext";
import  React , { useContext, useEffect, useRef } from 'react';
import $ from "jquery";



const NavbarAll = () => {
const isAuthen = useContext(authContext);
const LoggedUser = isAuthen.isLoggend && isAuthen.role === 'user';
const officeLogen = isAuthen.isLoggend && isAuthen.role === 'H_O';
const myref = useRef();

const navWhite = ()=>{ 
    let wScroll = $(window).scrollTop();
    let offsetTop =  myref.current.offsetTop; 
    if (wScroll >= offsetTop + 10) {
      myref.current.classList.add('bg-light');
      myref.current.classList.add('top-0');
    } else {
      myref.current.classList.remove('bg-light');
      myref.current.classList.remove('top-0');
    }
 
}
useEffect(()=>{ 
  window.addEventListener("scroll", ()=>navWhite()); 
},[myref.current])
    return (
      <div >
             <header ref={myref} id="#Navb" className={style["header-positioned"]}>
             <Navbar  >
        <div className="container-fluid"   style={{
              width : '90%'  
            }} >
          <Navbar.Brand href="#home">
            <img
              src={logo}
              className={style["logo"] + " mx-3"}
              alt="Logo of company"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="d-flex justify-content-between w-100">
             
                {
              LoggedUser ? (
               <Nav>
                  <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : style.NormalLi
                        }
                        to="/HomeUser"
                      >
                        Home
                      </NavLink>
                      <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : style.NormalLi
                      }
                      to="/submit_ticket"
                    >
                      Ticket
                    </NavLink>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : style.NormalLi
                      }
                      to="/myTickets"
                    >
                      My Tickets
                    </NavLink>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : style.NormalLi
                      }
                      to="/Faqs"
                    >
                      Faqs
                    </NavLink>
               </Nav>
              ) : (
               ' '
              )
            }  
            {
              !LoggedUser && !officeLogen ? (
                <Nav>
                <NavLink
              className={(navData) =>
                navData.isActive ? style.active : style.NormalLi
              }
              to="/Home"
            >
              Home
            </NavLink>
              </Nav>
              ) : ' '
            }
              {
                LoggedUser ? (
                <Nav>
                  <NavLink
                    onClick={() => isAuthen.logout()}
                    className={(navData) =>
                      navData.isActive ? style.active : style.NormalLi
                    }
                    to="/Home"
                  >
                    Logout
                  </NavLink>
                </Nav>
                ) : (
                  ' '
                )
              }
{
  !LoggedUser && !officeLogen ? 
  (
    <Nav>
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : style.NormalLi
                    }
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : style.NormalLi
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
            </Nav>
  ) : ' '
}
              {
                officeLogen ? (
                  <Nav className='ms-auto'>
                  <NavLink
                    onClick={() => isAuthen.logout()}
                    className={(navData) =>
                      navData.isActive ? style.active : style.NormalLi
                    }
                    to="/Home"
                  >
                    Logout
                  </NavLink>
                </Nav>
                ): ''
              }
             </Nav>
          </Navbar.Collapse>
          
          </div>
        </Navbar>
      </header>
        </div>
    
  
    );
}

export default NavbarAll;
 