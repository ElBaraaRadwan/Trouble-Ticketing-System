import React from 'react'

export default function SectionStyle(props) {
  return (
    <section
    style={{
      height: "calc(111vh - 10vh)",
      color: "black",
      background:
        "linear-gradient(90deg, #867070 0%, #807777 100%)",
    }}
  >
        {props.children}
    </section>
  )
}
