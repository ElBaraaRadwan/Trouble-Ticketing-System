import React from "react";
import style from "./ColDisplay.module.css";
export default function ColDisplay(props) {
  const { image, title, pargraph } = props;
  return (
    <div className="col-md-4 my-2">
      <div
        className="card w-100"
        style={{
          // background:
          //   "linear-gradient(90deg, rgba(36,35,51,1) 0%, rgba(89,176,194,1) 100%)",
          backgroundColor : 'black',
            // borderRadius : '15px'
        }}
      >
        <div className="overflow-hidden" style={{ height: "250px" }}>
          <img
            src={image}
            style={{ height: "inherit" }}
            className={"card-img-top overflow-hidden " + style["imageTrans"]}
            alt="..."
          />
        </div>
        <div className="card-body" style={{color : 'white'}}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{pargraph}</p>
        </div>
      </div>
    </div>
  );
}
