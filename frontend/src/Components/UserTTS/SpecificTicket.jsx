import React, { useRef, useState } from 'react'
import style from "./MyTicket.module.css";
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerError from './../UI/ServerError';


const imgUrl ='https://trouble-ticketing-system.herokuapp.com/';
const recordUrl ='https://trouble-ticketing-system.herokuapp.com/';

export default function SpecificTicket(props) {
  const [allowReply, setAllowReply] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [userRecordUrl , setUserRecordUrl] = useState(false);
  const [srcUrl , setSrcUrl] = useState('none');
  const { ticketData } = props;
  const navigate = useNavigate();
  // const [errorApiResponce , setErrorApiResponce] = useState([]);


  const { _id, description, title, priorty, status, department, attachment, solve, audioRecord,
    reply } = ticketData;
  const replyRef = useRef();
  const feedbackRef = useRef();
    const showRecord = ()=>{
      if(audioRecord.length == 0){
        setUserRecordUrl(false);
        setSrcUrl("none")
      }else{
        setUserRecordUrl(true)
        setSrcUrl(recordUrl + audioRecord[0].filePath)
      }
    }
    useEffect(()=>{
      showRecord()
    },[audioRecord])
  

  const sendResponce = async (e) => {
    e.preventDefault();
    const userReply = [];
    let userReplyFoArr = replyRef.current.value;
    userReply.push(userReplyFoArr);

    const {data} = await axios.patch(`https://trouble-ticketing-system.herokuapp.com/replyTicket/${_id}`, {  reply : userReply}).catch(err=>
    {
      setErrorServer(true);
      console.log(err)
    }
    )
    console.log(data)
    if(data){
    setErrorServer(false);
    navigate('/HomeUser');
    }else{
    setErrorServer(true);
    }
    setErrorServer(false);
  }

  const allowdToReply = (e)=>{
     if(status === 'In-progress'){
      setAllowReply(false);
     } if (status === "User-Reply" && solve.length > 0){
       setAllowReply(true);
     }
  }
  
  useEffect(()=>{
    allowdToReply();
  },[])
  return (
    <div
      
      className="position-sticky"
    >
      <div
        className="container d-flex flex-column align-items-center"
      >
        <p className="h2 py-4" style={{letterSpacing : '8px'  ,fontWeight: 'bold', fontSize: '50px' }}
        > Ticket Information </p>
        <table className="table table-light table-hover">
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
              userRecordUrl ? (
                <tr>
                  <th className={style["specific-row"]} scope="row">
                    Audio Description
                  </th>
                  <td>
                    <AudioPlayer
                      autoPlay={false}
                      loop={false}
                      src={srcUrl}
                    // other props here
                    />
                  </td>
                </tr>

              ) : ( 
       <></>
             )
            }
              <tr>
              <th className={style["specific-row"]} scope="row">
                attacchment files
              </th>
              <td>
                {
                  attachment.map(e => {
                    return (
                      <>
                        <img className='w-25' src={imgUrl + e.filePath} alt="" />
                      </>
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
                    {solve.map(e=> <p>{e} <hr/> </p>)}
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
                    {reply.map(e=> <p>{e} <hr/> </p>)}
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
          {
            errorServer?    (
              <ServerError/>
            )  : (
            ''
            )
          }
      </div>
    </div>
  )
}