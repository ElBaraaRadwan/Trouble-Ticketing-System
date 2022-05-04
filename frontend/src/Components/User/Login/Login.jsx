import axios from "axios";
import Joi from "joi";
import React, { useState , useRef, useContext} from "react";
import CadrForm from "../../UI/CadrForm";
import Input from './../../UI/Input';
import Button from './../../UI/Button';
import { useNavigate } from 'react-router-dom';
import { authContext } from "../../store/Context/AuthContext";


export default function Login() {
  let [errorList, setErrorList] = useState([]);
  let [error, setError] = useState("");
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
    let validatioForm = validateRegisterForm(user);
    if (validatioForm.error) {
      setErrorList(validatioForm.error.details);
      setLoading(false);
      return ;
    }
     let {data } = await axios.post(
        `http://localhost:5000/signIn`,
        user
      );
      console.log(data);
      if (data.message === "success") {
        authCtx.login(data.token);
        authCtx.assignRole(data.data.role);
        authCtx.assignId(data.data._id);
        console.log(data.data._id)
        navigate('/HomeUser');
        setErrorList([]);
        setError("");
        setLoading(false);
      } else {
        setError(validatioForm.error.details);
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
    <CadrForm>
      <div className="w-75 m-auto">
        <h1 className=" text-center ">Login</h1>
        <form onSubmit={formSubmit} className="w-75 m-auto">
          <div className="my-2">
            {error && <div className="alert alert-danger py-2">{error}</div>}
          </div>
          {errorList.map((error, i) =>
            error.context.label === "password" ? (
              <div key={i} className="alert alert-danger py-2 m-2">
                incorrect password
              </div>
            ) : (
              <div key={i} className="alert alert-danger p-2 m-2">
                {error.message}
              </div>
            )
          )}
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
    </CadrForm>
  );
}
