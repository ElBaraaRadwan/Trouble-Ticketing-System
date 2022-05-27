import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function DeleteAdmin() {

    const [showTicket, setShowTicket] = useState(false);
    const [oneTicket, setOneTicket] = useState({});
    const [tickets, setTickets] = useState([]);


    const getTickets = async () => {
        const { data } = await axios.get(`http://localhost:5000/getAllTicket`)
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

        let { data } = await axios.delete(`http://localhost:5000/deleteticket/${id}`,


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

                <div className="item p-3 m-4  bg-white shadow-lg ">

            <h2  className='h1'> ticket Number    {      index + 1}</h2>


                    <h5><span className=' fw-bolder'>  department  </span>:{ ticket.department}</h5>
                    <h4 className=''><span className=' fw-bolder'>  priorty  </span>      : {ticket.priorty} </h4>
                    <h4><span className=' fw-bolder'>  status  </span>     : {ticket.status} </h4>


                    <div className="mb-3 form-check shadow d-flex justify-content-center align-items-center">
                        <input type="checkbox" className="form-check-input  fs-4 px-3 " id="exampleCheck1" />
                        <label className="form-check-label fs-4 mx-3" for="exampleCheck1">Delete from DataBase</label>
                    </div>

                    <div className="department d-flex justify-content-around align-items-center ">
                       
                        <a onClick={() => { deleteTicket(ticket._id) }} >    <i className="deleteTicketIcon    fa-solid fa-trash-can fs-2 py-2"></i></a>
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
