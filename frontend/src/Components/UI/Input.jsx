import React from "react";

const Input = React.forwardRef((props, ref) => {
  const { type, name, labelName  , textForm} = props;
  let {flex} = props;
  if(!flex){
    flex = '';
  }
  return (
    <div className="my-2" key={name}>
      <label
        style={{ color:'black', fontSize: "18px", padding: "3px 0", fontWeight: "bold"}}
        htmlFor={name}
        className={"me-3 " + flex}
      >
        {labelName}
      </label>
      {
        textForm? <p className="text-muted" style={{ fontSize : '16px'}}>{textForm}</p> : ' ' 
      }
      <input
        id={name}
        className="form-control"
        type={type}
        name={name}
        ref={ref}
        required
      />
    </div>
  );
});

export default Input;
