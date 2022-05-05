import React from "react";
import SectionsFeatures from "./SectionsFeatures";
import backgroundImage from "./../../images/ba0.jpg";
import About from "./About";
import Footer from "./Footer";
import style from "./Home.module.css";
import image4 from "./../../images/process.gif";

export default function HomePage() {
  return (
    <React.Fragment>
      <section
        style={{
          backgroundColor: "#110f16",
        }}
      >
        <main
          style={{
            background: `
        linear-gradient(rgba(0, 0, 0, .2),rgba(0, 0, 0, .2)),
        url(${backgroundImage})
        `,
            clipPath: "polygon(0 0, 100% 0, 100% 65%, 0 100%)",
            backgroundColor: "#110f16",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            backgroundAttachment: "fixed",
            height: "calc(111vh - 10vh)",
          }}
          className={"d-flex align-items-center justify-content-center"}
        >
          <div className="text-center">
            <h1
              className={"text-white " + style["h1-homePage"]}
              style={{
                fontSize: "60px !important",
              }}
            >
              <span>We</span> are here to help <span>you</span>
            </h1>
            <p className="text-white">we want help you....</p>
            <button className="btn btn-outline-info px-3">Signup</button>
          </div>
        </main>
      </section>
      <SectionsFeatures />
      <About />
      <div className="" style={{ background: "#110f16" }}>
        <div
          className=" text-center py-5"
          style={{
            backgroundColor: "#ececec",
            clipPath : 'polygon(0 12%, 100% 32%, 100% 93%, 0 80%)'
        }}
        >
          <div className="container" 
          style={{
            padding : '150px 0',
            
          }}
          >
            <h3 style={{ fontFamily: "initial" }} className="p-3">
              Issue Tracking, from identification to resolution
            </h3>
            <img src={image4} className="w-100" alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
