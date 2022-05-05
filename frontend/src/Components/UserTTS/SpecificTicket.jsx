import React, { useRef, useState } from 'react'
import style from "./MyTicket.module.css";
import FileUploadComponent from './Helper/Upload/FileUploadComponent';
import axios from 'axios';

export default function SpecificTicket(props) {
  const [allowReply, setAllowReply] = useState(false);
  const { ticketData } = props;
  const { _id, description, title, priorty, status, department, attachment, solve, audioRecord,
    reply } = ticketData;
  const replyRef = useRef();

  console.log(audioRecord)

  const sendResponce = async (e) => {
    e.preventDefault();
    const userReply = replyRef.current.value;
    const { data } = await axios.post(`http://localhost:5000/replyTicket/${_id}`, userReply);
  }
  return (
    <div
      className="position-sticky"
    >
      <div
        className="container d-flex flex-column align-items-center"
      >
        <p className="h2 py-3"> Ticket Information </p>
        <table className="table table-dark table-hover">
          <tbody>

            <tr>
              <th className={style["specific-row"]} scope="row">
                id
              </th>
              <td>{_id}</td>
            </tr>
            <tr>
              <th className={style["specific-row"]} scope="row">
                Title
              </th>
              <td>{title}</td>
            </tr>
            <tr>
              <th className={style["specific-row"]} scope="row">
                Department
              </th>
              <td>{department}</td>
            </tr>
            <tr>
              <th className={style["specific-row"]} scope="row">
                Priority
              </th>
              <td>{priorty}</td>
            </tr>
            <tr>
              <th className={style["specific-row"]} scope="row">
                Status
              </th>
              <td>{status}</td>
            </tr>
            <tr>
              <th className={style["specific-row"]} scope="row">
                Description
              </th>
              <td className={style['tdbreak']} style={{ textAlign: 'justify' }}>
                {description}
              </td>
            </tr>
            {
              audioRecord ? (
                <tr>
                  <th className={style["specific-row"]} scope="row">
                    Audio Description
                  </th>
                  <td>
                  <audio controls>
                  <source  src={URL.createObjectURL(audioRecord)} type="audio/webm" />
                </audio>
                  </td>
                </tr>

              ) : ''
            }
            {/* audioRecord: "blob:http://localhost:3000/42e5aff2-9980-483c-8708-bb4df9344ff0"
 */}
            <tr>
              <th className={style["specific-row"]} scope="row">
                attacchment files
              </th>
              <td>
                {/* <img src={e.} alt="" srcset="" /> */}
                {
                  attachment.map(e => {
                    console.log(e)
                    return (
                      <img className='w-100' src={e.filePath} alt="" />
                    )
                  })
                }
              </td>
            </tr>
            {
              solve && (
                <tr>
                  <th className={style["specific-row"]} scope="row">
                    Agent responce
                  </th>
                  <td>
                    {solve}
                  </td>
                </tr>
              )
            }
            {
              reply && (
                <tr>
                  <th className={style["specific-row"]} scope="row">
                    My responce
                  </th>
                  <td>
                    {reply}
                  </td>
                </tr>
              )
            }
            
         
          </tbody>
        </table>
        {allowReply ?
          (<div className="my-2 w-100">
            <form action="">
              <label htmlFor="responce" className="form-label">Write your Responce</label>
              <textarea className="form-control" id="responce" rows="3" ref={replyRef}></textarea>
              <button className="btn btn-dark my-3" onClick={sendResponce}>Send</button>
            </form>
          </div>) : (
            <p style={{ fontSize: '24px', color: 'red' }}>You aren't allowed to reply to the ticket yet</p>)}

      </div>
    </div>
  )
}
