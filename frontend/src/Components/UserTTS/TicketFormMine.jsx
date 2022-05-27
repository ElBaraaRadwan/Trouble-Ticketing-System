import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./TicketForm.module.css";
import Input from "../UI/Input";
import InputDropDown from "../UI/InputDropDown";
import Button from "../UI/Button";
import FileUploadComponent from "./Helper/Upload/FileUploadComponent";
import RecordAudio from "./Helper/Audio/RecordAudioMine";
import $, { get } from "jquery";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../store/Context/AuthContext";
import 'react-h5-audio-player/lib/styles.css';
import ServerError from '../UI/ServerError';
import { base64ToFile } from "./Helper/blob";
import Mainbg from "../UI/Mainbg";
import styleAnimate from '../NewHome/Animation.module.css'
import shape1 from '../../images/Images/shape1.png'
import shape2 from '../../images/Images/shape2.png'
import shape3 from '../../images/Images/shape3.png'
import simple from '../../images/Images/simple.png'
import FooterAll from "../NewHome/FooterAll";

export default function TicketFormMine() {
  let [loading, setLoading] = useState(false);
  let [ticketToData, setTicket] = useState([]);
  let [status, setStatus] = useState([]);
  let [record, setRecorder] = useState('');
  let [recordDatabase , setRecordDatabase] = useState(new Blob)
  let [files, setFiles] = useState([]);
  let [errorValidation, setErrorValidation] = useState([]);
  let [errorApiResponce , setErrorApiResponce] = useState(false);
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


    const audioRecord = await base64ToFile(record, `audio-${Date.now()}.webm`, "audio/webm");
    setRecorder(audioRecord); 
    setRecordDatabase(audioRecord);
   

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
      // loginFormData.append("audioRecord", audRecord);
      loginFormData.append("userID", authCtx.id);
      // loginFormData.set("attachment", files);
      
      
      // loginFormData.append("attachment", JSON.stringify(attachmentFiles));
      
      // console.log(loginFormData.get('title'));
      // console.log(loginFormData.get('department'));
      // console.log(loginFormData.get('description'));
      // console.log(loginFormData.get('userID'));

      // files.map((e , i)=>{
      //   loginFormData.append("attachment", files[i]);
      // })

      console.log(new File([audioRecord], `audio-${Date.now()}.webm`,{type: audioRecord.type}))
      if(record){
        files.push(new File([audioRecord], `audio-${Date.now()}.webm`,{type: audioRecord.type}));
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

      // recordFormData.append('wavfile', audioRecord, "recording.wav");

      //   const config = {
      //       headers: {'content-type': 'multipart/form-data'}
      //   }
      // const path = await axios.post('http://localhost:8080/', recordFormData , config); 
      // console.log(path)

      // const responce = await axios.post(
      //   'https://trouble-ticketing-system.herokuapp.com/createTicket' , loginFormData
      // )
      // console.log(responce);

      
      const response = await axios.post("https://trouble-ticketing-system.herokuapp.com/createTicket", 
   loginFormData).catch(err=>{
      setErrorApiResponce(true);
    });
    if(response.statusText === 'Created'){
      setLoading(false);
      setErrorValidation([]);
      setErrorApiResponce(false);
      navigate('/HomeUser');
    }else{
      setErrorApiResponce(true);  
    }

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
      <Mainbg>
      <div className="container mb-3">
          <div className="row" id="mainPart">
            <div className="col-md-6 ">
              <div style={{ height : 'inherit' }} 
               className={"  text-center d-flex flex-column justify-content-center h-100"}>
                <h2 className='h1' style={{letterSpacing : '5px'  ,fontWeight: 'bold', textAlign: '' }}>
                Simple Steps, Success Processes</h2>
                <h4 className="text-center py-1">Don't worry , we are here to help you</h4>
                <div className="text-muted">
                  Our Trouble Ticket system was bulid to help you.
                </div>
              </div>

            </div>
            <div className="col-md-5 offset-md-1">
              <div className={style["hero-img"]}>
                <img className="w-100" style={{ height: '450px' }} src={simple} alt="" />
              </div>
            </div>

          </div>
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-10"] + " " + styleAnimate["t-60"]}>
          <img src={shape1} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-70"] + " " + styleAnimate["t-60"]}>
          <img src={shape2} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-50"] + " " + styleAnimate["t-100"]}>
          <img src={shape3} alt="" />
        </div>
        </Mainbg>
      <div className={style["page-content"]}>
        <div className={style["wizard-heading"] + " w-75 text-dark"}>Ticket Form</div>
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
              <div className="d-flex my-3 text-dark">
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
                className="text-dark"
                  style={{
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
                  <p className="h6 text-dark" >
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
      <FooterAll/>
    </React.Fragment>
  );
}
