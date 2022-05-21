import axios from "axios";
import Joi from "joi";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../UI/Input";
import Button from "./../../UI/Button";
import styleSign from "./Signup.module.css"
import heroBg from "../../../images/Images/hero-bg.png"
import styleAnimate from "../../NewHome/Animation.module.css"
import shape1 from '../../../images/Images/shape1.png'
import shape2 from '../../../images/Images/shape2.png'
import shape3 from '../../../images/Images/shape3.png'
import { NavLink } from 'react-router-dom';
import FooterAll from "../../NewHome/FooterAll";
import Mainbg from "../../UI/Mainbg";

export default function Signup(props){
  let [errorList, setErrorList] = useState([]);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const inputFirstNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputEmailRef = useRef();
  const inputAgeRef = useRef();
  const inputPasswordRef = useRef();
  const navigate = useNavigate();

  async function formSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const user = {
      name: inputFirstNameRef.current.value,
      last_name: inputLastNameRef.current.value,
      age: inputAgeRef.current.value,
      email: inputEmailRef.current.value,
      password: inputPasswordRef.current.value,
    };

    const validatioForm = validateRegisterForm(user);
    console.log(validatioForm)
    if (validatioForm.error) {
      setErrorList(validatioForm.error.details);
      setLoading(false);
    } else {
      let { data } = await axios.post(`https://trouble-ticketing-system.herokuapp.com/addUser`, user);
      if (data.message === "user created") {
        navigate('/login')
        setLoading(false);
        setErrorList([]);
        setError("");
      } else {
        console.log(data);
        setError(data.message);
        setErrorList(validatioForm.error.details);
        setLoading(false);
      }
    }
  }
  function validateRegisterForm(user) {
    let scheme = Joi.object({
      name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(60).required(),
      email: Joi.string().email({
        tlds: { allow: ["com", "net", "eg", "org"] },
      }),
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z][1-9]{3,30}$")),
    });
    return scheme.validate(user, { abortEarly: false });
  }
  return (
    <>
    <Mainbg>
        <div className="container pb-5 mb-3">
          <div className="row justify-content-center" id="mainPart">
          
            <div className="col-md-12 text-center py-2">
              <h6 className="" style={{fontWeight : 'bold' , 
              letterSpacing : '8px' , fontSize : '55px'
            }}>Sign up Form</h6>
              <p className="text-muted">Please fill All data to signup successfully</p>
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
      <form onSubmit={formSubmit} className={" mb-3 mx-auto p-5 " + styleSign['responsive']}
      style={{boxShadow : 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}
      >
        <h2 className="">Create new account.</h2>
        <p className={styleSign["text-mine"]}>Aready Member? 
        <NavLink   
                  className={(navData) =>
                    navData.isActive ? styleSign.active : styleSign.active
                  }
                  to="/login"
                >
                  Login
                </NavLink>
        </p>
        <div className="my-2">
          {error && <div className="alert alert-danger p-2">{error}</div>}
        </div>
        {errorList.map((error, i) =>
          error.context.label === "password" ? (
            <div key={i} className="alert alert-danger p-2 m-2">
              Password must start with uppercase character and cannot be empty
            </div>
          ) : (
            <div key={i} className="alert alert-danger p-2 m-2">
              {error.message}
            </div>
          )
        )}
        <div className="d-flex justify-content-between">
          <div className="w-50 pe-2">
          <Input
            type={"text"}
            name={"first_name"}
            labelName={"First Name"}
            ref={inputFirstNameRef}
          />
          </div>
          <div className="w-50 ps-2">
          <Input
            type={"text"}
            name={"last_name"}
            labelName={"Last Name"}
            ref={inputLastNameRef}
          />
          </div>
        
        
        </div>
        <Input
          type={"number"}
          name={"age"}
          labelName={"Age"}
          ref={inputAgeRef}
        />
        <Input
          type={"email"}
          name={"email"}
          labelName={"Email"}
          ref={inputEmailRef}
        />
        <Input
          type={"password"}
          name={"password"}
          labelName={"Password"}
          ref={inputPasswordRef}
        />
        <Button loading={loading} type={"Register"} />
      </form>
      <FooterAll/>
      </>
  );
};