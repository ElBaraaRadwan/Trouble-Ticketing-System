import React from 'react'

export default function BoxStyle(props) {
  return (
    <div
    style={{
      width: "220px",
      height: "175px",
      backgroundColor: "black",
      color: "white",
    }}
    className="d-flex flex-column  justify-content-center m-4"
  >
      {props.children}
      </div>
  )
}
