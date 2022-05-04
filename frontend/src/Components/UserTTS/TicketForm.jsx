import React, { useContext, useRef, useState } from "react";
import style from "./TicketForm.module.css";
import Input from "../UI/Input";
import InputDropDown from "../UI/InputDropDown";
import Button from "./../UI/Button";
import FileUploadComponent from "./Helper/Upload/FileUploadComponent";
import RecordAudio from "./Helper/Audio/RecordAudio";
import Fixedimage from "../UI/FixedImage";
import $ from "jquery";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FooterText from './../Home/FooterText';
import { authContext } from "../store/Context/AuthContext";

export default function TicketForm() {
  let [loading, setLoading] = useState(false);
  let [ticketToData, setTicket] = useState([]);
  let [status, setStatus] = useState([]);
  let [record, setRecorder] = useState(null);
  let [files, setFiles] = useState([]);
  let [mineRecord , setMineRecord] = useState(null)
  let [errorValidation, setErrorValidation] = useState(null);
  const loginFormData = new FormData();
  const authCtx = useContext(authContext);
  const navigate = useNavigate();
  const subjectInputRef = useRef();
  const departmentInputRef = useRef();
  const descriptionInputRef = useRef();

  const validateTicket = (ticket) => {
    let scheme = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      description: Joi.string().min(60).max(550).required(),
    });
    return scheme.validate(ticket, { abortEarly: false });
  };
  const funcStatus = (staus) => {
    setStatus(staus);
  };
  const getFiles = (data) => {
    const {name , size , type } = data;
    const image = {
      fileName :  name,
      fileType : type ,
      fileSize : size
    }

    setFiles((prevArray) => [...prevArray, image]);
  };

  const getRecorder = (recorderSrc) => {
    setRecorder(recorderSrc);
  };
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
    var chunks = [];
    chunks.push(record);
    const RecordDataBase = new Blob (chunks, { type: 'audio/webm' });
    const mineRecord =  URL.createObjectURL(RecordDataBase);
    setMineRecord(mineRecord)
    // const RecordDataBase = window.URL.createObjectURL(new Blob(binaryData, {type: 'audio/webm'}))
    // console.log(mineREcord)
    console.log(RecordDataBase)
    console.log(mineRecord)

    // if(validation.error && !status){
    console.log(validation)
    if(validation.error){
      setErrorValidation(validation.error.details);
      setLoading(false);
      return ;
    }
    const attachmentFiles = [files , record];
    
    loginFormData.append("title", subjectInputRef.current.value);
    loginFormData.append("department", departmentInputRef.current.value);
    loginFormData.append("description", descriptionInputRef.current.value);
    loginFormData.append("audioRecord", RecordDataBase);
    loginFormData.append("userID", authCtx.id);
    // loginFormData.append("attachment", JSON.stringify(attachmentFiles));
    
    // title, description, department, userID, agentID 

    console.log('formdata')
    const response = await axios({
      method: "POST",
      url: "http://localhost:5000/createTicket", 
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    if(response.statusText === 'Created'){
      setLoading(false);
      setErrorValidation(null);
      navigate('/HomeUser');
    }else{
      console.log(response)
    }
    console.log(response);
    
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
              {/* {errorValidation && (
                <div className="alert alert-danger py-2">{errorValidation}</div>
              )} */}
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
      <FooterText/>
    </React.Fragment>
  );
}
