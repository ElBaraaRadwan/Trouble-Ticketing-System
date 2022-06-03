import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AssignTicket() {
    const [showTicket, setShowTicket] = useState(false);
    const [oneTicket, setOneTicket] = useState({});
    const [tickets, setTickets] = useState([]);
    const [ticketsAsaign, setTicketsAsaign] = useState([]);
var ticketId;
    const FaqFormData = new FormData();
    const [formdata, setNote] = useState({ priorty: "", status: ""})



    const getTickets = async () => {
        const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllTicket`)
        setTickets(data.tickets);
    };



function addNote2(id){
ticketId=id;
}

    function getNote({ target }) {
        setNote({ ...formdata, [target.name]: target.value })
    }
    async function addNote(e) {
        e.preventDefault();
       console.log(ticketId);

        var test = formdata.priorty;
        var test2 = formdata.status;

        FaqFormData.append("priorty", test);
        FaqFormData.append("status", test2);
  
        console.log(formdata);

        let { data } = await axios.patch(`https://trouble-ticketing-system.herokuapp.com/assignTicket/${ticketId}`,formdata

        )
       
console.log(data);


        // setTicketsAsaign(data)


        
    }











    useEffect(() => {
        getTickets();

    }, []);


    return (

     <div className='test'>
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

{/* <div className="row">
    {


ticketsAsaign.map((ticket1, index) =>

  

<div className="col-md-6 ">

<div className="item">

<p> <i class=" deleteIcons fa-solid fa-star"></i> priorty : {ticket1.priorty} </p>  
</div>

</div>




        )

    }




</div> */}


<div className="row">
    {


        tickets.map((ticket, index) =>

  

<div className="col-md-6 ">

<div className="item">
<form onSubmit={addNote}>
            <div className="modal-dialog">
                <div className="modal-content">
                <h3>  <i class="   deleteIcons shadow-lg my-3 fa-solid fa-id-card text-danger mx-4"></i> Ticket ID :   {(ticket._id).slice(4,9)}</h3> 
                    {/* <h2 className='text-center py-4'><span className='fs-3'>{index}</span> </h2> */}
                    <p><i class=" deleteIcons fa-solid fa-headset"></i>status : {ticket.status} </p>
<p> <i class=" deleteIcons fa-solid fa-star"></i> priorty : {ticket.priorty} </p>
                  
                    <div className="modal-body">

                        <select   name="status"  onChange={getNote} className="py-2 my-3  form-select" aria-label="Default select example">
                            <option  selected>status</option>
                            <option value="Pending">Pending</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="User-Reply">User-Reply</option>
                            <option value="Finished">Finished</option>
                            <option value="In-hold">In-hold</option>
                            <option value="Unsolved">Unsolved</option>
                            <option value="Canceled">Canceled</option>

         
                        </select>
                        <select   name="priorty"  onChange={getNote} className="py-2 my-3  form-select" aria-label="Default select example">
                            <option  selected>priorty</option>
                            <option value="Low">Low</option>
                            <option value="Mediem">Mediem</option>
                            <option value="High">High</option>
                          
                     
                        </select>


                    </div>
                    <div className="modal-footer">
                        <button  type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={() => { addNote2(ticket._id) }}   data-bs-dismiss="modal" type="submit" className="btn btn-info"> Save Change</button>
                    </div>
                </div>
            </div>
        </form>
</div>

</div>




        )

    }




</div>






</div>
     </div>

    )
}
