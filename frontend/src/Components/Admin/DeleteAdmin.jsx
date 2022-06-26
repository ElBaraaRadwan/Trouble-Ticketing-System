import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function DeleteAdmin() {

    const [showTicket, setShowTicket] = useState(false);
    const [oneTicket, setOneTicket] = useState({});
    const [tickets, setTickets] = useState([]);


    const getTickets = async () => {
        const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllTicket`)
        console.log(data);
        setTickets(data.tickets);
        // const dataArr = data.faq;
        // console.log(data)

    };

    const viewTicket = (e) => {
        setShowTicket(true);
        setOneTicket(e)

    }
    async function deleteTicket(id) {

        let { data } = await axios.delete(`https://trouble-ticketing-system.herokuapp.com/deleteticket/${id}`,


        )
        getTickets()
        console.log(data);
        console.log(id);
    }



    useEffect(() => {
        getTickets();
    }, []);


    return (

     <div className='test2'>
        <div className="container ">


<div className="row py-5">


    <div  className=" pe-5 text-center">

<button type="button" className="m-auto px-5 fs-5 btn btn-primary position-relative">
update
<span className="position-absolute m-auto top-0 start-100 translate-middle badge rounded-pill bg-danger">
{tickets.length}
<span className="visually-hidden">unread messages</span>
</span>
</button>
</div>




</div>
















<div className="row">
    {


        tickets.map((ticket, index) =>

            <div className="col-md-6    rounded  py-5"  >

                <div className="item borderOfData2  p-3 p-3 m-4 text-white  shadow-lg  ">
                <h3>  <i class="   deleteIcons shadow-lg  fa-solid fa-id-card text-danger mx-4"></i> Ticket ID :   {(ticket._id).slice(4,9)}</h3> 
                   <p> <i class="  deleteIcons fa-solid fa-heading"></i> title : {ticket.title} </p>
<p><i class=" deleteIcons fa-solid fa-headset"></i>status : {ticket.status} </p>
<p> <i class=" deleteIcons fa-solid fa-star"></i> priorty : {ticket.priorty} </p>
<p> <i class=" deleteIcons fa-solid fa-user-check"></i> User ID : {ticket.user}</p>
<h5> <i class=" deleteIcons fa-solid fa-magnifying-glass"></i> department:{ticket.department}</h5>
<p> <i class=" deleteIcons fa-solid fa-audio-description"></i> description : {ticket.description} </p>
<h4> <i class="deleteIcons  fa-solid fa-calendar-check"></i> createdDate : {ticket.createdDate} </h4>

                    <div className="department m-auto d-flex justify-content-around align-items-center ">
                       
                        <a onClick={() => { deleteTicket(ticket._id) }} >    <i className="button123   deleteTicketIcon    fa-solid fa-trash-can fs-2 py-2"></i></a>
                    </div>
                </div>

            </div>



        )

    }




</div>
</div>
     </div>

    )
}
