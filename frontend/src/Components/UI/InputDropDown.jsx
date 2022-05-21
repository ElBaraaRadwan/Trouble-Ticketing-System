import React from "react";

const InputDropDown = React.forwardRef((props , ref)=>{
  const { values, name, id , textForm} = props;
  return (
    <React.Fragment>
      <label 
      style={{'fontSize' : '16px'}}
      htmlFor={name} className="me-2 mb2 text-dark">Choose a department :</label>
      {
        textForm? <p className="text-muted" style={{ fontSize : '16px'}}>{textForm}</p> : ' ' 
      }
      <select className="form-select" id={id} name={name} ref={ref}>
        {values.map((el, index) => (
          <option key={el.name + index} value={el.value}> {el.name}</option>
        ))}
      </select>
    </React.Fragment>
  );
})

export default InputDropDown;