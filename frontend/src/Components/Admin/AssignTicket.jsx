import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AssignTicket() {
    const [showTicket, setShowTicket] = useState(false);
    const [oneTicket, setOneTicket] = useState({});
    const [tickets, setTickets] = useState([]);
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

        let { data } = await axios.patch(`http://localhost:5000/assignTicket/${ticketId}`, FaqFormData

        )
        console.log(formdata.status);
        console.log(data);
    }











    useEffect(() => {
        getTickets();
       
    }, []);


    return (

     <div className='test5'>
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

  

<div className="col-md-6 ">

<div className="item">
<form onSubmit={addNote}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <h2 className='text-center py-4'>AssignTicket <span className='fs-3'>{index}</span> </h2>

                  
                    <div className="modal-body">

                        <select   name="status"  onChange={getNote} className="py-2 my-3  form-select" aria-label="Default select example">
                            <option  selected>status</option>
                            <option value="Pending">Pending</option>
                            <option value="Solved">Solved</option>
                            <option value="Unsolved">Unsolved</option>
                            <option value="Closed">Closed</option>
                     
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
