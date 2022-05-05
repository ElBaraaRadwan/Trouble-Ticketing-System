import React from "react";

export default function Button(props) {
    const {loading , type} = props;
  return (
    <div className="my-3">
      <button className="btn btn-dark px-3 py-2">
        {loading ? <i className="fas fa-spinner fa-spin"></i> : type}
      </button>
    </div>
  );
}
