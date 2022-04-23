import React from "react";
import BoxStyle from "./Layout/BoxStyle";
import SectionStyle from "./Layout/SectionStyle";

export default function Faqs() {
  return (
    <SectionStyle>
      <div style={{ height: "inherit" }} className="container">
        <h1
          style={{
            fontFamily: "revert",
            fontWeight: "500",
            margin: "0 0 30px",
          }}
        >
          Frequently Asked Questions
        </h1>
        <section className="d-flex">
          <BoxStyle>
            <div className="p-3">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "25px" ,margin :'0 0 20px'}}
              ></i>
              <h4>General FAQs</h4>
            </div>
          </BoxStyle>
          <BoxStyle>
            <div className="p-3">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "25px" ,margin :'0 0 20px'}}
              ></i>
              <h4>General FAQs</h4>
            </div>
          </BoxStyle>
          <BoxStyle>
            <div className="p-3">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "25px" ,margin :'0 0 20px'}}
              ></i>
              <h4>General FAQs</h4>
            </div>
          </BoxStyle>
          <BoxStyle>
            <div className="p-3">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "25px" ,margin :'0 0 20px'}}
              ></i>
              <h4>General FAQs</h4>
            </div>
          </BoxStyle>
        </section>
      </div>
    </SectionStyle>
  );
}

// align-items-center
