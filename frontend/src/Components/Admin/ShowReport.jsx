import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image4 from "./../../images/process.gif";
export default function ShowReport() {
    const [getReport , setReport] = useState([]);

    const getAllReport = async () => {
        const { data } = await axios.get(`http://localhost:5000/getAllReports`)
        console.log(data.report);

    
        setReport(data.report);
    };




    useEffect(() => {
     
        getAllReport()
      }, []);







  return (
    


    <>




<div className="test4">
<div className="container">
<div className="news  text-center">
{/* 
<i class="fa-solid fa-newspaper fs-1 "></i> */}
</div>






<div className="row">
     {
     




                    
     getReport.map((Report, index) => 
     


     
     <div className="col-md-12  my-5 text-center  rounded "  scope="row">
   
   <div className="card" >
  <img src={image4} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h1 className="card-title "> {Report.header}</h1>
    <p className="card-text fs-2"> Report Content :   {Report.content}</p>
 
  </div>
  <div className="form-check form-switch">
  <input className="form-check-input fs-3 p-0 m-0" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <label className="form-check-label fs-3" for="flexSwitchCheckDefault">Check Report</label>
</div>
</div>






















     </div>
     
       
     
     )
     
     }


    
     
     </div>




</div>
</div>












     
    
    </>






  )
}
