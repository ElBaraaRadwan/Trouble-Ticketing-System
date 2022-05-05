import React, { useContext, useEffect, useState } from "react";
import Fixedimage from "../UI/FixedImage";
import axios from "axios";
import style from "./MyTicket.module.css";
import { authContext } from "../store/Context/AuthContext";
import SpecificTicket from './SpecificTicket';
export default function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [showTicket , setShowTicket] = useState(false);
  const [oneTicket , setOneTicket] = useState({});

  const authCtx = useContext(authContext);
  console.log(authCtx)


  const getTickets = async () => {
    const { data } = await axios.get(`http://localhost:5000/getAllTicket/myTicket/625de71acc63de34df4e7b0a`)
    console.log(data.userTickets);
    setTickets(data.userTickets);

  };
  const viewTicket = (e)=>{
    setShowTicket(true);
    setOneTicket(e)
  }
  useEffect(() => {
    getTickets();
  }, []);
  return (
    <React.Fragment>
      <Fixedimage
      // image={image}
      // head={}
      // pargraph={}
      />
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
                  <th scope="col" style={{ width: "100px" }}>
                    status
                  </th>
                  <th scope="col " style={{ width: "250px" }}>
                    view
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  tickets.map((e, i) => {
                    console.log(e)
                    return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{e.title}</td>
                      <td>{e.priorty}</td>
                      <td>{e.status}</td>
                      <td>
                        <button className="btn btn-dark" onClick={()=>viewTicket(e)}>
                          view ticket
                        </button>
                      </td>
                    </tr>)

                  })

                }
              </tbody>
            </table>
          </div>
         
          {
            showTicket &&  <SpecificTicket  ticketData={oneTicket}/>
          }
   
        </section>
      </section>
    </React.Fragment>
  );
}
