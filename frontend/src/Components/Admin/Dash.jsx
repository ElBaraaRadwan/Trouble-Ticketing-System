import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import style from "./Dash.module.css";

export default function Dash() {

  

  const [showTicket , setShowTicket] = useState(false);
  const [oneTicket , setOneTicket] = useState({});
  const [tickets, setTickets] = useState([]);

  var num =0;
const getTickets = async () => {
  const { data } = await axios.get(`http://localhost:5000/getAllTicket`)
 console.log(data.tickets);
  setTickets(data.tickets); 

};
const viewTicket = (e)=>{
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
    
    <div className="col-md-2 mainColor mainColorGold  m-3 text-center"  scope="row">{index + 1}

     <h4> {ticket.status} </h4>
  
  



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
