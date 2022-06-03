import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

export default function UpdataFaq() {

    const [showTicket, setShowTicket] = useState(false);
    const [allDatas, reassignTicket] = useState([])
    const [Show, ShowData2] = useState([]);
    const [allData, setTickets] = useState([]);



    const FaqFormData = new FormData();


    const getTicketsfaq = async () => {
        const data = await axios.get(`https://trouble-ticketing-system.herokuapp.com/getAllFAQs`)

        var allData = data.data.faq;
        var allDatas = data.data.faq;
        console.log(allData[1].content);
        setTickets(allData);
        reassignTicket(allData);

    };



    function ShowData(data) {


        var test = allDatas[data].content;

        ShowData2(test);

    }

    async function deleteFaq(id) {
        console.log(id);
        let { data } = await axios.delete(`https://trouble-ticketing-system.herokuapp.com/deletefaqs/${id}`,

        )

        console.log(data);
        getTicketsfaq()
    }


    const [formdata, setNote] = useState({ header: "", content: "", department: "" })

    function getNote({ target }) {
        setNote({ ...formdata, [target.name]: target.value })
    }

    async function addNote(e) {
        e.preventDefault();
        console.log(formdata);

        var test = formdata.header;
        var test2 = formdata.content;
        var test3 = formdata.department;

        console.log(test);
        FaqFormData.append("header", test);
        FaqFormData.append("content", test2);
        FaqFormData.append("department", test3);
        console.log(formdata);

        let { data } = await axios.post(`https://trouble-ticketing-system.herokuapp.com/createFAQs`, FaqFormData

        )
        getTicketsfaq();
    }


    useEffect(() => {
        getTicketsfaq();

    }, []);


    return (

        <div className="test3">


            <div className="container">

                <div className="addFaq   d-flex justify-content-between align-items-center">


                    <div className="  ">

                        <button type="button" className="m-auto px-5 fs-5 btn btn-primary position-relative">
                            F A Q
                            <span className="position-absolute m-auto top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {allData.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </div>

                    <div className=" pe-5 text-center py-5">





                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <button type="button" className="  d-flex justify-content-between align-items-center m-auto px-5 fs-5 btn btn-primary position-relative">

                                Add Faq
                                <i className="fa-solid fa-circle-plus fs-2 px-3 "></i>

                            </button>

                        </button>


                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <form onSubmit={addNote}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <input placeholder="content" onChange={getNote} name="header" className=" my-3 form-control" type="text" />
                                            <input placeholder="header" onChange={getNote} name="content" className=" my-3 form-control" type="text" />
                                            <select name="department" onChange={getNote} class=" my-3 form-select" aria-label="Default select example">
                                                <option selected>Open this select menu</option>
                                                <option value="Tech-Sup">Tech-Sup</option>
                                                <option value="Devices-Com">Devices-Com</option>
                                                <option value="Devices-TV">Devices-TV</option>
                                                <option value="Devices-Mob">Devices-Mob</option>
                                                <option value="Devices-Air3">Devices-Air</option>
                                                <option value="Sales">Sales</option>
                                            </select>




                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button data-bs-dismiss="modal" type="submit" className="btn btn-info">   <i class="fa-solid fa-plus"></i> Add FAQ</button>
                                        </div>
                                    </div>
                                </div>
                            </form>





                        </div>






                    </div>
                </div>



                <div className="row">
                    {


                        allData.map((faq, index) =>
                            <div key={index} className="col-md-12     rounded shadow-lg  "  >

                                <div className="modal  fade showBackGround " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog ">
                                        <div className="modal-content ">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">FAQ CONTENT </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">


                                                <p className='m-auto text-center'>  <i className="   deleteIcons   fa-solid fa-person-circle-question fs-1 text-danger mx-4"></i></p>
                                                <div className="  text-uppercase form-check form-switch my-2">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
  <label className="form-check-label" for="flexSwitchCheckChecked">Not Good </label>
</div>
                                                <input type="radio" className="btn-check me-3" name="options-outlined" id="success-outlined" autocomplete="off" />
                                                    <label className="  text-uppercase btn me-3 btn-outline-success" for="success-outlined">recommendation</label>

                                                    <input type="radio" className=" ms-3 btn-check" name="options-outlined" id="danger-outlined" autocomplete="off"/>
                                                        <label className="btn ms-5 btn-outline-danger text-uppercase" for="danger-outlined"> not recommendation</label>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                    </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="item p-3  bg m-4 shadow-lg ">
                                        <p>{index}</p>
                                        <h3 className='text-center shadow-lg w-25 m-auto '>  <i class="   deleteIcons shadow-lg  fa-solid fa-id-card text-danger mx-4"></i> FAQ ID :   {(allData[index]._id).slice(4, 9)}</h3>
                                        <p>  <i class="   deleteIcons shadow-lg  fa-solid fa-heading text-danger mx-4"></i> Header :   {(allData[index].header)}</p>
                                        <p>  <i class="   deleteIcons shadow-lg  fa-solid fa-file-lines text-danger mx-4"></i> Content :    {allData[index].content}</p>

                                        <h5> <i class=" deleteIcons fa-solid text-danger fa-magnifying-glass mx-4"></i>Department: {allData[index].department}</h5>
                                        <h4> <i class="deleteIcons  fa-solid text-danger fa-calendar-check mx-4 "></i> CreatedAt: {(allData[index].createdAt.slice(0, 10))} </h4>




                                        <div className="deletUpadat d-flex justify-content-between">


                                            <button className="   bg-danger btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                <a onClick={() => { ShowData(index) }} >
                                                    <i class="fa-solid fa-eye  fs-2 "></i></a>
                                            </button>
                                            <a onClick={() => { deleteFaq(allData[index]._id) }} >    <i className="deleteTicketIcon    fa-solid fa-trash-can fs-2 py-2"></i></a>

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