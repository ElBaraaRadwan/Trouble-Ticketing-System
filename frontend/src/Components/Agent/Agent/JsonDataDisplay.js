// import "./JsonDataDisplay.css"
// import React from 'react'
// import {AiOutlineStar} from "react-icons/ai";
// import {GiEarthAfricaEurope} from "react-icons/gi";

// import JsonData from './data.json'//جسون داتا ده اسم من عندى عشان امباب بيه
// function JsonDataDisplay(){
//     const createdAt=new Date();
// 	const DisplayData=JsonData.map(
// 		(info)=>{
// 			return(
// 				<tr>
// 					<td>{info.id}</td>
// 					<td>{info.name}</td>
// 					<td>{info.Email}</td>
//                     <td>{info.OpenTickets}</td>
//                     <td>{<GiEarthAfricaEurope/>}</td>
//                     <td>{info.Status}</td>
//                     <td>{<AiOutlineStar/>}</td>
//                     <td>{createdAt.getDate() + '-' + (createdAt.getMonth() + 1) + '-' + createdAt.getFullYear()}</td>
//                     <td>{<button className='btn btn-info ms-2'>Edit</button>}{<button className=' ms-2 btn btn-danger'>view</button>}</td>
// 				</tr>
// 			)
// 		}
// 	)

// 	return(
// 		<div className='table-width col-xl-9 col-lg-9 col-md-9 col-sm-9 ' style={{backgroundColor:"white"}}>
// 			<table className="table  ">
// 				<thead>
// 					<tr>
// 					<th>id</th>
// 					<th>Name</th>
// 					<th>Email</th>
//                     <th>Open Tickets</th>
//                     <th>Source</th>
//                     <th>Status</th>
//                     <th>stared</th>
//                     <th>CreatedAt</th>
//                     <th>Action</th>
// 					</tr>
// 				</thead>
// 				<tbody>
				
					
// 					{DisplayData}
					
// 				</tbody>
// 			</table>
			
// 		</div>
// 	)
// }

// export default JsonDataDisplay;
