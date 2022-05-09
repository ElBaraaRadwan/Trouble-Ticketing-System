import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./TicketForm.module.css";
import Input from "../UI/Input";
import InputDropDown from "../UI/InputDropDown";
import Button from "./../UI/Button";
import FileUploadComponent from "./Helper/Upload/FileUploadComponent";
import RecordAudio from "./Helper/Audio/RecordAudio";
import Fixedimage from "../UI/FixedImage";
import $, { get } from "jquery";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FooterText from './../Home/FooterText';
import { authContext } from "../store/Context/AuthContext";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ServerError from './../UI/ServerError';


export default function TicketForm() {
  let [loading, setLoading] = useState(false);
  let [ticketToData, setTicket] = useState([]);
  let [status, setStatus] = useState([]);
  let [record, setRecorder] = useState('');
  let [recordDatabase , setRecordDatabase] = useState(new Blob)
  let [files, setFiles] = useState([]);
  let [errorValidation, setErrorValidation] = useState([]);
  let [errorApiResponce , setErrorApiResponce] = useState(false)
  const loginFormData = new FormData();
  const authCtx = useContext(authContext);
  const navigate = useNavigate();
  
  const subjectInputRef = useRef();
  const departmentInputRef = useRef();
  const descriptionInputRef = useRef();

  const validateTicket = (ticket) => {
    let scheme = Joi.object({
      title: Joi.string().min(8).max(30).required(),
      description: Joi.string().min(60).max(550).required(),
    });
    return scheme.validate(ticket, { abortEarly: false });
  };
  const funcStatus = (staus) => {
    setStatus(staus);
  };
  const getFiles = (data) => {
    setFiles((prevArray) => [...prevArray, data]);
  };

  const getRecorder = (recorderSrc) => {
    setRecorder(recorderSrc);
  };

  useEffect(()=>{
    getRecorder();
  },[])
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const ticket = {
      title: subjectInputRef.current.value,
      description: descriptionInputRef.current.value
    };
    const tickets = [];
    tickets.push(ticket);
    setTicket(tickets);
    const validation = validateTicket(ticket);
    // console.log(URL.createObjectURL(record))
    
    // const RecordDataBase = window.URL.createObjectURL(new Blob(binaryData, {type: 'audio/webm'}));
    // console.log(RecordDataBase)
    
    
    let chunks = [];
    chunks.push(record);
    const audioRecord = new Blob (chunks, { type: 'audio/webm' });
    setRecorder(audioRecord); 
    setRecordDatabase(audioRecord);
   
    console.log( await audioRecord.arrayBuffer())

    // if(validation.error && !status){
    if(validation.error){
      setErrorValidation(validation.error.details);
      setLoading(false);
      return ;
    }
    
      setErrorValidation([]);
      setLoading(false);

      let filess = [];
      files.map((e)=>{
      // let oneFile = new File (e, { type: 'media/img' });
      // filess.push(oneFile);
      })

      // const attachmentFiles = [files ];
      
      // attachment
      loginFormData.append("title", subjectInputRef.current.value);
      loginFormData.append("department", departmentInputRef.current.value);
      loginFormData.append("description", descriptionInputRef.current.value);
      // loginFormData.append("audioRecord", audioRecord);
      loginFormData.append("userID", authCtx.id);
      // loginFormData.set("attachment", files);
      
      
      // loginFormData.append("attachment", JSON.stringify(attachmentFiles));
      
      console.log(loginFormData.get('title'));
      console.log(loginFormData.get('department'));
      console.log(loginFormData.get('description'));
      console.log(loginFormData.get('audioRecord'));
      console.log(loginFormData.get('userID'));

      // files.map((e , i)=>{
      //   loginFormData.append("attachment", files[i]);
      // })

      if(record){
        files.push(audioRecord);
      }

      console.log(audioRecord)
      console.log(URL.createObjectURL(audioRecord))
      let index = 0;
      for (index = 0; index < files.length; index++) {
        loginFormData.append("attachment", files[index]);
      }
      if(record){
        loginFormData.append("attachment", files[index])
      }
      console.log(loginFormData.get('attachment'));
      // console.log(URL.createObjectURL(loginFormData.get('audioRecord')))
  
  
      // title, description, department, userID, agentID 
  
      const responce = await axios.post(
        'http://localhost:5000/createTicket' , loginFormData
      )
      console.log(responce);

      
    // await axios({
    //   method: "POST",
    //   url: "http://localhost:5000/createTicket", 
    //   data: loginFormData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // }).then(res=> console.log(res)).catch(err=>{
    //   console.log(err);
    //   setErrorApiResponce(true);
    // })
    // console.log(response);
    // if(response.statusText === 'Created'){
    //   setLoading(false);
    //   setErrorValidation(null);
    //   setErrorApiResponce(false);
    //   navigate('/HomeUser');
    // }else{
    //   console.log(response);
    //   setErrorApiResponce(true);  
    // }
    // console.log(response);
    

    //   if (response.message === "success") {
    //     console.log(response)
    //     navigate('/HomeUser');
    //     setErrorValidation([]);
    //     // setError("");
    //     setLoading(false);
    //   } else {
    //     // setErrorList(data.message);
    //     setLoading(false);
    // }
  };

  const toggleHandler = (e) => {
    $("#recordButton").on("click", (e) => {
      $("#recordBlock").slideToggle();
    });
  };
  
  return (
    <React.Fragment>
      <Fixedimage />
      <div className={style["page-content"]}>
        <div className={style["wizard-heading"] + " w-75"}>Ticket Form</div>
        <div className={style["wizard-v6-content"]}>
          <div className={style["wizard-form"]}>
            <form
              onSubmit={submitForm}
              className={style["form-register"] + " p-4 text-left w-75 m-auto"}
              id="form-register"
              action="#"
              method="post"
            >
              {errorValidation.map((e)=>{
                console.log(e);
                return (
                  <div className="alert alert-danger py-2">{e.message}</div>
                )
              })}
              {/* {error && <div className="alert alert-danger py-2">{error}</div>} */}
              <div className="w-100">
                <Input
                  type="text"
                  name={"subject"}
                  labelName={"Subject"}
                  textForm={"Enter the title that describe your problem"}
                  ref={subjectInputRef}
                />
              </div>
              <InputDropDown
                values={[
                  { name: "Sales department", value: "Sales" },
                  { name: "Technical Support", value: "Tech-Sup" },
                  { name: "Computer", value: "Devices-Com" },
                  { name: "TV", value: "Devices-TV" },
                  { name: "Mobile", value: "Devices-Mob" },
                  { name: "Air Conditioners", value: "Devices-Air" },
                ]}
                name={"departmet"}
                labelName={"Department"}
                textForm={
                  "choose the department that you think your problem belongs to"
                }
                ref={departmentInputRef}
              />
              <div className="d-flex my-3 text-light">
                <label htmlFor="description" className="me-2">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="100"
                  ref={descriptionInputRef}
                  placeholder="Write in details what happened and how can we help you?"
                />
              </div>
              <div className="my-2">
                <label
                  style={{
                    color: "white",
                    fontSize: "20px",
                    padding: "0",
                    margin: "5px",
                    fontWeight: "500",
                  }}
                >
                  Attach files to help us understand your problem:
                </label>
                <p className="text-muted p-0 m-0" style={{ fontSize: "16px" }}>
                  you have been allowed to send up to 5 images (Max size of uploaded component = 5MB )
                </p>
                <FileUploadComponent func={getFiles} funcStatus={funcStatus} />
              </div>
              <div className="">
                <button
                  id="recordButton"
                  onClick={toggleHandler}
                  type="button"
                  className={style["record-button"]}
                >
                  <p className="h6">
                    do want to record audio to describe your problem?
                  </p>
                </button>
                <div id="recordBlock" style={{ display: "none" }}>
                  <RecordAudio getRecorder={getRecorder} />
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center">
                <Button loading={loading} type={"Submit"} />
              </div>
            </form>
          </div>
        </div>
      </div>
      {
        errorApiResponce?   <ServerError/>  : ''
      }
      <FooterText/>
    </React.Fragment>
  );
}
