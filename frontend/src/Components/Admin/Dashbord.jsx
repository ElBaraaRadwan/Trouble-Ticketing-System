import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Dash from './Dash';
import style from "./Dashbord.module.css";
import image4 from "./../../images/process.gif";
import Chart from './Chart/Chart';
import Chart2 from './Chart2/Chart2';



export default function Dashbord() {





 var userNumber;
         const [showTicket , setShowTicket] = useState(false);
         const [oneTicket , setOneTicket] = useState([]);
         const [getFeedBack , setFeedBack] = useState([]);
         const [tickets, setTickets] = useState([]);
         const [getReport , setReport] = useState([]);
         var num =0;
    const getTickets = async () => {
         const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllTicket`)
        // console.log(data.tickets);
        // console.log((data.tickets[4]._id).slice(4,9));


         setTickets(data.tickets); 
     
       };
  
       
       const getTicketsfaq = async () => {
        const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/users`)
    
    
        userNumber=data.data.length;
        setOneTicket(data.data);
    };

    const getAllFeedback = async () => {
        const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllFeedBack`)
 

    
        setFeedBack(data.feedBack);
        // console.log(data.feedBack);
    };

    const getAllReport = async () => {
        const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllReports`)
      

    
        setReport(data.report);
    };






       useEffect(() => {
         getTickets();
         getTicketsfaq();
         getAllFeedback()
         getAllReport()
       }, []);
    


       return(
  
        <>
     

  


 
      <div className="wrapper fs-5   ">
       
        <nav id="sidebar" className=' border border-danger'  >
            <div className=" text-center ">
            
            <i className="fa-solid  fa-gauge-high fs-1 px-2  py-4"></i>
                <h3>Admin Dashbord</h3>
 
              
            </div>
          
          
   <ul className=" text-center list-unstyled components m-auto nav nav-pills mb-3 d-flex " id="pills-tab" role="tablist">
  <li className="nav-item    w-100" role="presentation">
    <button className="nav-link m-auto w-100 active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
    all Data
    </button>
  </li>
  
  <li className="nav-item    w-100" role="presentation">
    <button className="nav-link m-auto w-100 " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">

Tickets

    </button>
  </li>
  <li className="nav-item w-100" role="presentation">
    <button className="nav-link w-100" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Status</button>
  </li>
  <li className="nav-item w-100" role="presentation">
    <button className="nav-link w-100" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Priorty</button>
  </li>

  <li className="nav-item w-100" role="presentation">
  <div className="sidebar-header bg-none m-auto"><h3>User FeedBack</h3>

            
  </div>
  <button className="nav-link w-100 bg-transparent" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-feedback" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
    <i onClick={getAllFeedback}  class="fa-solid feedbackIcon fa-face-smile text-white fs-1 px-2  py-4"></i>
        

        </button>

  </li>


</ul>





         
        </nav>

      
        <div id="content">

            <nav className=" text-white  d-flex align-items-center justify-content-center navbar-expand-lg ">
                <div className="container">

         
                  
                    <div className=" d-flex align-items-center justify-content-between  collapse navbar-collapse" id="navbarSupportedContent">


                    <nav className=''>
  <ol className="breadcrumb text-decoration-none  ">
    <li className="breadcrumb-item text-decoration-none "><a href="#">Admin</a></li>
    <li className="breadcrumb-item active" aria-current="page">Dashbord</li>
  </ol>
</nav>
<div  className=" m-auto m-3 ">

<button type="button" className="m-auto  btn btn-primary  position-relative">
update
<span className="position-absolute m-auto top-0 start-100 translate-middle badge rounded-pill bg-danger">
{tickets.length}
<span className="visually-hidden">unread messages</span>
</span>
</button>
</div>





                    </div>
                </div>
            </nav>

        
       
       <div className="tab-content m-3" id="pills-tabContent"> 

{/* // home tap  */}
<div className="tab-pane fade show   active" id="pills-all" role="tabpanel" aria-labelledby="pills-profile-tab">
<div className="container ">
     <div className="row test5 text-white text-center fs-1 ">
   
     <div className="col-md-3  borderOfData borderitem  mainColorGold">
       <div className="data borderOfDa  ">
       <h5 className="card-title fs-2 py-2">Users</h5>
       <i className="fa-solid fa-users feedbackIcon1"></i>
      <h2 className=' py-3'>{oneTicket.length}</h2>
         
       </div>
       </div>
       <div className="col-md-3 borderOfData mainColorGold">
       <div className="data " >
       <h5 className="card-title fs-2 py-2">Report</h5>
       
       <i class="fa-solid fa-microphone-lines fs-1 py-4 feedbackIcon1"></i>
         <h3>{getReport.length}</h3>
       </div>
       </div>
       <div className="col-md-3  borderOfData mainColorGold">
       <div className="data ">
       <h5 className="card-title fs-2 py-2">Ticket</h5>
       <i className="fa-solid fa-ticket py-4 feedbackIcon1"></i>
         <h3>{tickets.length}</h3>
       </div>
       </div>
       <div className="col-md-3 borderOfData mainColorGold">
       <div className="data">
       <h5 className="card-title fs-2 py-2">Admin</h5>
       <i className="fa-solid fa-user-gear py-4 feedbackIcon1"></i>
         <h3>1</h3>
       </div>
       </div>
       </div>
     
       {/* <div className="line bg-danger"></div> */}
       
      
       </div>
<Chart/>

</div>



  <div className="tab-pane fade " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

  <div className="row">
     {
     
                    
     tickets.map((ticket, index) => 
     <div className="col-md-12  rounded ">
<div className="col-md-12">

  
 <div className="item mainColorData my-2">

<div class="accordion" id="accordionExample">
 <div class="accordion-item">
   <h2 class="accordion-header" id="headingOne">
     <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
     <h3>  <i class="fa-solid fa-id-card text-danger mx-4"></i> Ticket ID :   {(ticket._id).slice(4,9)}</h3> 
     
     </button>
   </h2>
   <div id="collapseOne" class="accordion-collapse  collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
     <div class="accordion-body text-black p-3 test5 text-white">

 <div className="data123">
<p> <i class="fa-solid fa-heading deleteIcons"></i> title : {ticket.title} </p>
<p><i class="fa-solid fa-headset deleteIcons"></i>status : {ticket.status} </p>
<p> <i class="fa-solid fa-star deleteIcons"></i> priorty : {ticket.priorty} </p>
<p> <i class="fa-solid fa-user-check deleteIcons"></i> User ID : {ticket.user}</p>
<h5> <i class="fa-solid fa-magnifying-glass deleteIcons "></i> department:{ticket.department}</h5>
<p> <i class="fa-solid fa-audio-description deleteIcons"></i> description : {ticket.description} </p>
<h4> <i class="fa-solid fa-calendar-check deleteIcons"></i> createdDate : {ticket.createdDate} </h4>
{/* <h3>  <i class="fa-solid fa-id-card text-danger mx-4"></i> user ID :   {(ticket.user).slice(4,9)}</h3>  */}


</div>

     </div>
   </div>
 </div>

</div>



</div>
</div>
     </div>
     )
     
     }


    
     
     </div>

    </div>















  <div className="tab-pane fade test" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">






  <Dash/>
  </div>
  <div className="tab-pane fade test" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

  <div className="row ">
     {
     
                    
     tickets.map((ticket, index) => 
     <div className="col-md-4 borderOfData2 p-2 text-center" scope="row">
     <div className="   shadow-lg  mb-5 rounded m-3 ">
   
       
     <ol class="list-group p-3 ">
<li class="list-group-item d-flex justify-content-between align-items-start">
<div class="ms-2 me-auto">
<i class="fa-solid fa-fingerprint text-danger my-3 fs-2"></i>
<div class="fw-bold"><h3> Ticket ID :   {(ticket._id).slice(18, 24)}</h3></div>
<h4 className=''>priorty : {ticket.priorty}  </h4>

</div>
<span class="badge bg-primary rounded-pill">  {index + 1}</span>
</li>
{/* <li class="list-group-item d-flex justify-content-between align-items-start">
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
</li> */}
</ol>

       
   
     </div>



   </div>
//      <div className="col-md-2  mainColorData text-center m-3 rounded  text-center"  scope="row">{index + 1}

 
// <h3>ID :   {(ticket._id).slice(4,9)}</h3>
//     <h4 className=''>priorty : {ticket.priorty} </h4>
   
   

//      </div>
     
       
     
     )
     
     }


    
     
     </div>


  </div>


  <div className="tab-pane fade " id="pills-feedback" role="tabpanel" aria-labelledby="pills-contact-tab">



<div className="row">
     {
     
                    
     getFeedBack.map((feedBack, index) => 
     <div className="col-md-4   text-center" scope="row">
     <div className="   shadow-lg p-3 mb-5 rounded m-3 ">
   

     <ol class="list-group ">
     <li class="list-group-item d-flex justify-content-between align-items-start">
     <span class="badge bg-primary rounded-pill">  {index + 1}</span>
<span class=" text-center m-auto rounded-pill"><i class=" fs-1 text-danger m-auto fa-solid fa-chart-column"></i></span>
</li>


<li class="list-group-item d-flex justify-content-between align-items-start">
<div class="fw-bold"><h4 className=''>priorty : {feedBack.status}  </h4></div>
</li>
<li class="list-group-item d-flex justify-content-between align-items-start">
<div class="fw-bold"><h3> Ticket ID :   {(feedBack._id).slice(18, 24)}</h3></div>
</li>
</ol>

       
   
     </div>



   </div>
//      <div className="col-md-2 mainColorData text-center m-3 rounded  "  scope="row">
//   <i class="fa-solid fa-face-laugh-beam fs-2 text-danger m-3"></i>

// <h3>ID :   {(feedBack._id).slice(4,9)}</h3>


//     <h5>{feedBack.status}</h5> 
   
 

//      </div>
     
       
     
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




