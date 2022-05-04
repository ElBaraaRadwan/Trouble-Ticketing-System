import React from 'react'

export default function CadrForm(props) {
  return (
    // 
    // "linear-gradient(90deg, rgba(88,122,130,1) 0%, rgba(111,109,179,1) 100%)"
    // linear-gradient(90deg, rgba(13,89,106,1) 0%, rgba(83,80,153,1) 100%)
    // 
    // background: linear-gradient(0deg, rgba(13,202,240,1) 46%, rgba(238,241,233,1) 100%);

    <section
      style={{
        minHeight: "calc(111vh - 10vh)",
        color: "white",
        background:
          "radial-gradient(circle, rgba(221,221,220,1) 0%, rgba(8,181,215,1) 100%)",
          // backgroundColor : '#110f16'
      }}
      className="d-flex align-items-center"
    >
        <div
        style={{
          background:
            "black",
          borderRadius: "5px 150px 5px",
          margin: '50px'
        }}
        className="w-50 m-auto"
      >
          {props.children}
    </div>
    </section>
  )
}
