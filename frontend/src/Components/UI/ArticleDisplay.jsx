import React from "react";

const ArticleDisplay = (props) => {
    const {title , pargraph}=  props;
  return (
    <div>
      <h5>{title}</h5>
      <p style={{ textAlign: "left" }}>{pargraph}</p>
    </div>
  );
};



export default ArticleDisplay;
