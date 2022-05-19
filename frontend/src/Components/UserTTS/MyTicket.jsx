import React, { useContext, useEffect, useState } from "react";
import Fixedimage from "../UI/FixedImage";
import axios from "axios";
import style from "./MyTicket.module.css";
import { authContext } from "../store/Context/AuthContext";
import SpecificTicket from './SpecificTicket';
import ServerError from './../UI/ServerError';


export default function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [showTicket, setShowTicket] = useState(false);
  const [oneTicket, setOneTicket] = useState({});
  const [allowFeedback, setAllowFeedback] = useState(false);
  const [ticketIdToFeedback, setTicketIdToFeedback] = useState('');
  const [errorApiFeedback, setErrorApiFeedback] = useState(false);
  const authCtx = useContext(authContext);
  const id = authCtx.id;
  console.log(id)

  const getTickets = async () => {
    const { data } = await axios.get(`http://localhost:5000/getAllTicket/myTicket/${id}`);
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
    const { data } = await axios.post(`http:/localhost:5000/createFeedBack/${ticketId}`, DataFeedback).catch(error => {
      console.log(error);
      setErrorApiFeedback(true);
    });
    console.log(data);
  }

  const showFeedback = async (id) => {
    setAllowFeedback(true);
    console.log(id);
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
      <Fixedimage />
      <section style={{
        // backgroundColor: "#343a40",   
        // background:
        //   "radial-gradient(circle, rgba(0,77,123,1) 0%, rgba(148,187,233,1) 100%)"
        backgroundColor: '#1f2833'
        , color: "white "
      }}>
        <section className="container py-5 text-white">
          <p className="h1 py-4 fw-bold text-center">My Tickets</p>
          <div className={style['text']}>
            <table className="table text-left  text-white">
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
                      <tr>
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
                          e.status === 'Closed' ?
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
            showTicket && <SpecificTicket ticketData={oneTicket} />
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
    </React.Fragment>
  );
}
