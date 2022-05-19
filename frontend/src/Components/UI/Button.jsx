import React from "react";
import style from "./Button.module.css"

export default function Button(props) {
    const {loading , type} = props;
  return (
    <div className="my-3 ">
      <button className={" px-3 py-2 px-2 " + style["btn-mine"] }
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : type}
      </button>
    </div>
  );
}
