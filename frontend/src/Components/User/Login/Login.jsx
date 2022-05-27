import axios from "axios";
import Joi from "joi";
import React, { useState , useRef, useContext} from "react";
import CadrForm from "../../UI/CadrForm";
import Input from './../../UI/Input';
import Button from './../../UI/Button';
import { useNavigate } from 'react-router-dom';
import { authContext } from "../../store/Context/AuthContext";
import heroBg from "../../../images/Images/hero-bg.png"
import style from "./LoginAll.module.css"
import styleSign from "./../Signup/Signup.module.css"
import styleAnimate from "../../NewHome/Animation.module.css"
import shape1 from '../../../images/Images/shape1.png'
import shape2 from '../../../images/Images/shape2.png'
import shape3 from '../../../images/Images/shape3.png'
import { NavLink } from 'react-router-dom';
import FooterAll from "../../NewHome/FooterAll";
import Mainbg from "../../UI/Mainbg";
import ServerError from "../../UI/ServerError";


export default function Login() {
  let [errorList, setErrorList] = useState([]);
  let [error, setError] = useState("");
  let [errorApiResponse, setErrorApiResponse] = useState(false); 
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const authCtx = useContext(authContext);

  async function formSubmit(e) {
    e.preventDefault()
    setLoading(true);
    const user = {
      email: inputEmailRef.current.value,
      password: inputPasswordRef.current.value,
    };
     let {data } = await axios.post(
        `https://trouble-ticketing-system.herokuapp.com/signIn`,
        user
      ).catch(err => setErrorApiResponse(true))
      if (data.message === "success") {
        authCtx.login(data.token);
        authCtx.assignRole(data.data.role);
        authCtx.assignId(data.data._id);
        if(data.data.role === 'user'){
          navigate('/HomeUser');
        }
        if(data.data.role === 'agent'){
          navigate('/Customer');
        } 
        if(data.data.role === 'admin'){
          navigate('/Dashbord');
        } 
        if(data.data.role === 'H_O'){
          navigate('/officeHeaderHome');
        } 


        
        setErrorList([]);
        setLoading(false);
        setErrorList([]);
        setError("");
        setLoading(false);
      } else {
        // setError(validatioForm.error.details);
        setErrorList(data.message);
        setLoading(false);
    }
  }
  function validateRegisterForm(user) {
    let scheme = Joi.object({
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
            }}>Login Form</h6>
              <p className="text-muted">Please fill All data to Login successfully</p>
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
      <div className="w-100 m-auto">
        <form id="signin" onSubmit={formSubmit}  className={" mb-3 mx-auto p-5 " + style['responsive']}
      style={{boxShadow : 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
          <h2 className="">Use your account to Login.</h2>
        <p className={styleSign["text-mine"]}>don't have an account? 
        <NavLink   
                  className={(navData) =>
                    navData.isActive ? styleSign.active : styleSign.active
                  }
                  to="/signup"
                >
                  Signup
                </NavLink>
        </p>
          <div className="my-2">
            {error && <div className="alert alert-danger py-2">{error}</div>}
          </div>
          {/* {errorList.map((error, i) =>
            error.context.label === "password" ? (
              <div key={i} className="alert alert-danger py-2 m-2">
                incorrect password
              </div>
            ) : (
              <div key={i} className="alert alert-danger p-2 m-2">
                {error.message}
              </div>
            )
          )} */}
          <Input
          type={"email"}
          name={"email"}
          labelName ={'Email'}
          ref={inputEmailRef}
          />
          <Input
          type={"password"}
          name={"password"}
          labelName ={'Password'}
          ref={inputPasswordRef}
          />
          <Button loading={loading} type={"Login"} />
        </form>
      </div>
      {
        errorApiResponse?   <ServerError/>  : ''
      }
      <FooterAll/>
   </>
  );
}