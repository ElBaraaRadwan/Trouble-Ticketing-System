import React from "react";
import { NavLink } from 'react-router-dom';
import style from './TtsHome.module.css';
import Mainbg from "../UI/Mainbg";
import img from '../../images/Images/ticketmain.png'

export default function TtsHome() {
  return (
    <Mainbg>
        <div className="container ">
          <div className="row" id="mainPart">
            <div className="col-md-6 pt-4">
              <div className={style["content-box"] + " text-center d-flex flex-column justify-content-center h-100"}>
                      <h1
                  className="h1 "
                  style={{
                    fontWeight: "bold",
                    letterSpacing: "6px",
                    marginBottom: "10px",
                  }}
                >
                  Uliang Trouble Ticket System
                </h1>
                <p className="h6 mt-4">
                  Do you have a problem that you can't solve? <br /> <br />
                  Don't worry, We are here to help you
                </p>
                {/* <div className="d-flex mt-3 justify-content-start">
                  <button className={style["btn-mine"]}>
                    Sign up
                  </button>
                </div> */}
              </div>

            </div>
            <div className="col-md-6 ">
              <div className={style["hero-img"]}>
                <img className="w-100" style={{ height: '410px' }} src={img} alt="" />
              </div>
            </div>

          </div>
        </div>
        <div className="container-fluid mt-5">
        <footer className="row bg-white ">
          <div className="bg-white col-md-6">
            <div className="p-4">
              <h4 style={{fontWeight : 'bold !important'}}>
                <i className="fa-solid fa-circle-question px-2"></i>
                How Does FAQs Help You?
              </h4>
              <p className="ms-5">
                The Frequently asked questions could help you as it is save your
                time if you found your problem on it so you would see how you
                can solve it.
              </p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-info" style={{backgroundColor : 'rgb(98, 198, 216) !important'}}>
              <NavLink   
                  className={(navData) =>
                    navData.isActive ? style.active : style.active
                  }
                  to="/Faqs"
                >
                  Faqs
                </NavLink>
                </button>
            </div>
            </div>
          </div>
          <div
            className=" text-dark col-md-6"
            style={{
              clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)",
            	backgroundColor: '#f4f2ff',

            }}
          >
            <div className="ms-4 p-4">
              <h4  style={{fontWeight : 'bold !important'}}>
                <i className="fa-solid fa-ticket px-2"></i>
                When Should you submit a Ticket?
              </h4>
              <p className="ms-5">
               You should Submit a ticket when you can not find a solution for your problem so our agents would work in it.
              </p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-info">
                  
                <NavLink   
                  className={(navData) =>
                    navData.isActive ? style.active : style.active
                  }
                  to="/submit_ticket"
                >
                  Ticket
                </NavLink>
                </button>
            </div>
            </div>
          </div>
        </footer>
        </div>
    </Mainbg>
    
  );
}

{
  /* <div className="d-flex justify-content-center">
<h4>Go to</h4>
<div>
  <h4>
    <a href="">FAQs</a>
  </h4>
  <h4>
    <a href=""> Submit a ticket</a>{" "}
  </h4>
</div>
</div> */
}

{/*<main
      style={{
        backgroundColor: "#eeeeedr",
        height: "calc(111vh - 10vh)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <section
        style={{
          height: "inherit",
          color: "white",
          background:
            "radial-gradient(circle, rgba(0,77,123,1) 0%, rgba(148,187,233,1) 100%)",
            paddingTop : '150px',
        }}
        className="text-center px-5"
      >
        <h1
          className="h1 "
          style={{
            fontWeight: "bold",
            letterSpacing: "6px",
            marginBottom: "10px",
          }}
        >
          Uliang Trouble Ticket System
        </h1>
        <p className="h6 mt-4">
          Do you have a problem that you can't solve? <br /> <br />
          Don't worry, We are here to help you
        </p>
      </section>
      <div className="container-fluid">
        <footer className="row bg-white">
          <div className="bg-white col-md-6">
            <div className="p-4">
              <h4 style={{fontWeight : 'bold !important'}}>
                <i class="fa-solid fa-circle-question px-2"></i>
                How Does FAQs Help You?
              </h4>
              <p className="ms-5">
                The Frequently asked questions could help you as it is save your
                time if you found your problem on it so you would see how you
                can solve it.
              </p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-info" style={{backgroundColor : 'rgb(98, 198, 216) !important'}}>
              <NavLink   
                  className={(navData) =>
                    navData.isActive ? style.active : style.active
                  }
                  to="/Faqs"
                >
                  Faqs
                </NavLink>
                </button>
            </div>
            </div>
          </div>
          <div
            className=" text-white col-md-6"
            style={{
              clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)",
            	backgroundColor: '#1f2833',

            }}
          >
            <div className="ms-4 p-4">
              <h4  style={{fontWeight : 'bold !important'}}>
                <i class="fa-solid fa-ticket px-2"></i>
                When Should you submit a Ticket?
              </h4>
              <p className="ms-5">
               You should Submit a ticket when you can not find a solution for your problem so our agents would work in it.
              </p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-info">
                  
                <NavLink   
                  className={(navData) =>
                    navData.isActive ? style.active : style.active
                  }
                  to="/submit_ticket"
                >
                  Ticket
                </NavLink>
                </button>
            </div>
            </div>
          </div>
        </footer>
      </div>
                </main>*/}