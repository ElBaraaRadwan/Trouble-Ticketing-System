import React, { useContext, useEffect, useState } from "react";
import Fixedimage from "../UI/FixedImage";
import axios from "axios";
import style from "./MyTicket.module.css";
import { authContext } from "../store/Context/AuthContext";
import SpecificTicket from './SpecificTicket';
import ServerError from './../UI/ServerError';
import Mainbg from "../UI/Mainbg";
import styleAnimate from '../NewHome/Animation.module.css'
import shape1 from '../../images/Images/shape1.png'
import shape2 from '../../images/Images/shape2.png'
import shape3 from '../../images/Images/shape3.png'
import simple from '../../images/Images/ticketHome.png'
import FooterAll from "../NewHome/FooterAll";
import { useNavigate } from 'react-router-dom';

export default function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [showTicket, setShowTicket] = useState(false);
  const [oneTicket, setOneTicket] = useState({});
  const [allowFeedback, setAllowFeedback] = useState(false);
  const [ticketIdToFeedback, setTicketIdToFeedback] = useState('');
  const [errorApiFeedback, setErrorApiFeedback] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(authContext);
  const id = authCtx.id;
  console.log(id)

  const getTickets = async () => {
    const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllTicket/myTicket/${id}`);
    console.log(data.userTickets);
    setTickets(data.userTickets);
  };
  const sendFeedback = async (feedbackValue) => {
    setAllowFeedback(false);
    const userID = authCtx.id;
    const status = feedbackValue;
    const ticketId = ticketIdToFeedback;
    const DataFeedback = {
      userID,
      status
    }
    const data  = await axios.post(`https://trouble-ticketing-system.herokuapp.com/createFeedBack/${ticketId}`, DataFeedback).catch(error => {
      setErrorApiFeedback(true);
    });
    console.log(data)
    if(data.statusText = "Created"){
      navigate('/HomeUser');
      setErrorApiFeedback(false);
    }
  }
  

  const showFeedback = async (id) => {
    setAllowFeedback(true);
    setTicketIdToFeedback(id);
  }
  const viewTicket = (e) => {
    setShowTicket(true);
    setOneTicket(e)
  }
  useEffect(() => {
    getTickets();
  }, []);

  return (
    <React.Fragment>
      <Mainbg>
      <div className="container mb-3">
          <div className="row" id="mainPart">
            <div className="col-md-6 ">
              <div style={{ height : 'inherit' }} 
               className={"  text-center d-flex flex-column justify-content-center h-100"}>
                <h2 className='' style={{letterSpacing : '16px'  ,fontWeight: 'bold', fontSize: '55px' }}>
                My Tickets
                </h2>
                <h4 className="text-center py-1"></h4>
                <div className="text-muted">
                 You can see All your ticket here.
                </div>
              </div>

            </div>
            <div className="col-md-6">
              <div className={style["hero-img"]}>
                <img className="w-100" style={{ height: '450px' }} src={simple} alt="" />
              </div>
            </div>

          </div>
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-10"] + " " + styleAnimate["t-60"]}>
          <img src={shape1} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-70"] + " " + styleAnimate["t-60"]}>
          <img src={shape2} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-50"] + " " + styleAnimate["t-100"]}>
          <img src={shape3} alt="" />
        </div>
      </Mainbg>
      <section style={{
        backgroundColor: '#f8f9fa'
        , color: "white "
      }}>
        <section className="container mt-4 py-2 text-dark bg-light">
          <p className=" h1 py-4 fw-bold text-center">My Tickets</p>
          <div className={style['text']}>
            <table className="table text-left  text-dark">
              <thead>
                <tr>
                  <th scope="col " style={{ width: "30px" }}>
                    Number
                  </th>
                  <th scope="col" className="text-center">
                    Title
                  </th>
                  <th scope="col" style={{ width: "100px" }}>
                    priority
                  </th>
                  <th scope="col" style={{ width: "150px" }}>
                    status
                  </th>
                  <th scope="col " style={{ width: "150px" }}>
                    view
                  </th>
                  <th scope="col " style={{ width: "" }}>
                    feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  tickets.map((e, i) => {
                    return (
                      <tr key={e._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{e.title}</td>
                        <td>{e.priorty}</td>
                        <td>{e.status}</td>
                        <td>
                          <button className="btn btn-dark" onClick={() => viewTicket(e)}>
                            view ticket
                          </button>
                        </td>
                        {
                          e.status === 'in-hold' ?
                            (<td>
                              <button className="btn btn-dark" onClick={() => showFeedback(e._id)}>
                                show feedback
                              </button>
                            </td>) : (
                              <td>
                                <p
                                  style={{ fontWeight: '400', color: 'red', fontSize: '16px' }}
                                >
                                  You are not allowed to send feedback yet
                                </p>
                              </td>
                            )
                        }
                      </tr>)

                  })

                }
              </tbody>
            </table>
          </div>

          {
            showTicket && <SpecificTicket  ticketData={oneTicket} />
          }
          {
            allowFeedback &&
            (
              <div
                style={{
                  position: 'fixed',
                  bottom: '0%',
                  right: '0'
                }}
                className="">
                <span onClick={() => sendFeedback("Vrey Sad")} vlaue="Vrey Sad" style={{ fontSize: '50px', cursor: 'pointer' }}>&#128529;</span>
                <span onClick={() => sendFeedback("Sad")} vlaue="Sad" style={{ fontSize: '50px', cursor: 'pointer' }}>&#128528;</span>
                <span onClick={() => sendFeedback("Good")} vlaue="Good" style={{ fontSize: '50px', cursor: 'pointer' }}>&#128578;</span>
                <span onClick={() => sendFeedback("Happy")} vlaue="Happy" style={{ fontSize: '50px', cursor: 'pointer' }}>&#128515;</span>
                <span onClick={() => sendFeedback("Very Happy")} vlaue="Very Happy" style={{ fontSize: '50px', cursor: 'pointer' }}>&#128519;</span>
              </div>
            )
          }
          {
            errorApiFeedback && (
              <ServerError />
            )
          }
        </section>
      </section>
      <FooterAll/>
    </React.Fragment>
  );
}