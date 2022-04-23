import axios from "axios";
import Joi from "joi";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CadrForm from "../../UI/CadrForm";
import Input from "../../UI/Input";
import Button from "./../../UI/Button";


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
      let { data } = await axios.post(`http://localhost:5000/addUser`, user);
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
    <CadrForm>
      <form onSubmit={formSubmit} className="w-75 m-auto p-1">
        <h2 className=" text-center">Sign up</h2>
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
          <Input
            type={"text"}
            name={"first_name"}
            labelName={"First Name"}
            ref={inputFirstNameRef}
          />
          <Input
            type={"text"}
            name={"last_name"}
            labelName={"Last Name"}
            ref={inputLastNameRef}
          />
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
    </CadrForm>
  );
};
