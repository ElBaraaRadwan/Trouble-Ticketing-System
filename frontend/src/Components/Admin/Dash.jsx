import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import style from "./Dash.module.css";

export default function Dash() {



  const [showTicket, setShowTicket] = useState(false);
  const [oneTicket, setOneTicket] = useState({});
  const [tickets, setTickets] = useState([]);

  var num = 0;
  const getTickets = async () => {
    const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllTicket`)
    console.log((data.tickets[1]._id).length);
    setTickets(data.tickets);

  };
  const viewTicket = (e) => {
    setShowTicket(true);
    setOneTicket(e)

  }



  useEffect(() => {
    getTickets();
  }, []);






  return (


    <>











      <div className="wrapper fs-5 ">

    
        <div id="content">




          <div className="tab-content" id="pills-tabContent">


            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

              <div className="row">
                {


                  tickets.map((ticket, index) =>

                    <div className="col-md-4   text-center" scope="row">
                      <div className="   shadow-lg p-3 mb-5 bg-body rounded m-3 ">
                      
                        
                      <ol class="list-group ">
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"><h3> Ticket ID :   {(ticket._id).slice(18, 24)}</h3></div>
      
    </div>
    <span class="badge bg-primary rounded-pill">  {index + 1}</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"></div>
      <h4> {ticket.status} </h4>
    </div>
    <span class="badge bg-primary rounded-pill"><i class="fa-solid fa-battery-half"></i></span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">  <h4>createdDate:  {ticket.createdDate} </h4></div>
      <h4> UpdatedTime {ticket.ticketUpdatedTime} </h4>
    </div>
    <span class="badge bg-primary rounded-pill"><i class="fa-solid fa-calendar-days"></i></span>
  </li>
</ol>

                        
                    
                      </div>



                    </div>



                  )

                }




              </div>

            </div>




          </div>





        </div>
      </div>










    </>












  )
}
