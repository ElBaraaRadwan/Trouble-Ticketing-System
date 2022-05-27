import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Dash from './Dash';
import style from "./Dashbord.module.css";
import image4 from "./../../images/process.gif";
export default function Dashbord() {
 var userNumber;
         const [showTicket , setShowTicket] = useState(false);
         const [oneTicket , setOneTicket] = useState([]);
         const [getFeedBack , setFeedBack] = useState([]);
         const [tickets, setTickets] = useState([]);
         const [getReport , setReport] = useState([]);
         var num =0;
    const getTickets = async () => {
         const { data } = await axios.get(`http://localhost:5000/getAllTicket`)
        console.log(data.tickets);
         setTickets(data.tickets); 
     
       };
  

       const getTicketsfaq = async () => {
        const { data } = await axios.get(`http://localhost:5000/users`)
        console.log(data.data.length);
    
        userNumber=data.data.length;
        setOneTicket(data.data);
    };

    const getAllFeedback = async () => {
        const { data } = await axios.get(`http://localhost:5000/getAllFeedBack`)
        console.log(data.feedBack[2].status);

    
        setFeedBack(data.feedBack);
    };

    const getAllReport = async () => {
        const { data } = await axios.get(`http://localhost:5000/getAllReports`)
        console.log(data.report);

    
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
     

  


 
      <div className="wrapper fs-5  test ">
       
        <nav id="sidebar"  >
            <div className="sidebar-header text-center ">
            
            <i className="fa-solid fa-gauge-high fs-1 px-2  py-4"></i>
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
{/* 
    <NavLink
            
            to="/Dash"
>
            Dash
          </NavLink> */}

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
  <div className="sidebar-header  m-auto"><h3>User FeedBack</h3>

            
  </div>
  <button className="nav-link w-100 bg-transparent" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-feedback" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
    <i onClick={getAllFeedback}  class="fa-solid feedbackIcon fa-face-smile text-white fs-1 px-2  py-4"></i>
        

        </button>

  </li>
  {/* <li className="nav-item w-100" role="presentation">
    
  <div className="sidebar-header  m-auto"><h3>User FeedBack</h3>
  
            
             

              
            </div>
    
  </li> */}

</ul>





         
        </nav>

      
        <div id="content">

            <nav className="navbar text-white  d-flex align-items-center justify-content-center navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">

         
                  
                    <div className=" d-flex align-items-center justify-content-between  collapse navbar-collapse" id="navbarSupportedContent">


                    <nav >
  <ol className="breadcrumb">
    <li className="breadcrumb-item "><a href="#">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">Dashbord</li>
  </ol>
</nav>
<div  className=" pe-5 text-center ">

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

            <div className="container">
     <div className="row mainColor2 text-white text-center fs-1 ">
   
     <div className="col-md-3   borderitem  mainColorGold">
       <div className="data   ">
       <h5 className="card-title fs-2 py-2">Users</h5>
       <i className="fa-solid fa-users feedbackIcon1"></i>
      <h2 className=' py-3'>{oneTicket.length}</h2>
         
       </div>
       </div>
       <div className="col-md-3 mainColorGold">
       <div className="data " >
       <h5 className="card-title fs-2 py-2">Report</h5>
       
       <i class="fa-solid fa-microphone-lines fs-1 py-4 feedbackIcon1"></i>
         <h3>{getReport.length}</h3>
       </div>
       </div>
       <div className="col-md-3 mainColorGold">
       <div className="data ">
       <h5 className="card-title fs-2 py-2">Ticket</h5>
       <i className="fa-solid fa-ticket py-4 feedbackIcon1"></i>
         <h3>{tickets.length}</h3>
       </div>
       </div>
       <div className="col-md-3 mainColorGold">
       <div className="data">
       <h5 className="card-title fs-2 py-2">Admin</h5>
       <i className="fa-solid fa-user-gear py-4 feedbackIcon1"></i>
         <h3>1</h3>
       </div>
       </div>
       </div>
     
       {/* <div className="line bg-danger"></div> */}
       
      
       </div>
       
       <div className="tab-content" id="pills-tabContent"> 

{/* // home tap  */}
<div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-profile-tab">
{/* 
<img src={image4} className="w-100" alt="" /> */}




</div>
  <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

  <div className="row">
     {
     
                    
     tickets.map((ticket, index) => 
     
     <div className="col-md-2 mainColor mainColorGold  text-center m-3 rounded "  scope="row">
         
         
        <p className='borderindex m-auto'> {index + 1}</p>
   
     {/* <h2> {ticket._id} </h2> */}
    <h5>department:{ticket.department}</h5> 
   
    <h4 className=''>priorty : {ticket.priorty} </h4>
    <h4>status : {ticket.status} </h4>
  

     </div>
     
       
     
     )
     
     }


    
     
     </div>

    </div>

  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">






  <Dash/>
  </div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

  <div className="row ">
     {
     
                    
     tickets.map((ticket, index) => 
     
     <div className="col-md-2  mainColor mainColorGold text-center m-3 rounded  text-center"  scope="row">{index + 1}

 
   
    <h4 className=''>priorty : {ticket.priorty} </h4>
   
 

     </div>
     
       
     
     )
     
     }


    
     
     </div>


  </div>


  <div className="tab-pane fade" id="pills-feedback" role="tabpanel" aria-labelledby="pills-contact-tab">



<div className="row">
     {
     
                    
     getFeedBack.map((feedBack, index) => 
     
     <div className="col-md-2 mainColor mainColorGold text-center m-3 rounded "  scope="row">{index + 1}
   
<h5>Feedback status</h5>
<i className=" text-danger fs-3 fa-solid fa-face-smile-beam"></i>

    <h5>{feedBack.status}</h5> 
   
 

     </div>
     
       
     
     )
     
     }


    
     
     </div>







</div>
</div>

    
            {/* <div className="line"></div>

       
          
            <div className="line"></div> */}

   

        </div>
    </div>
     ,
   
    
 
     
     
        </>
       )
      }




