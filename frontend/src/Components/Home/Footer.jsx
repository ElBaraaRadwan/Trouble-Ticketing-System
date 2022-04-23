import React from "react";
import image from "./../../images/hearYou.jpeg";
import style from "./Footer.module.css";
import FooterText from './FooterText';

const Footer = () => {
  return (
    <footer
      style={{
        background : '#110f16',
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="">
        <h3 className={"p-3 " + style.head} style={{ fontFamily: "serif" }}>
          Contact us
        </h3>
        <div className="w-75 m-auto">
          <img
            style={{ borderRadius: "10px" }}
            src={image}
            alt="we hear you"
            className="m-3"
          />
        </div>
        <div>
          <FooterText/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
