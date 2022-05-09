import React from "react";
import image from "./../../images/process.gif";
import style from './FixedImage.module.css';


const Fixedimage = (props) => {
  return (
    <section className="" style={{ backgroundImage: `url(${image}) ` , 'height' : '360px' }}>
         <div className={style["overlay"]}>
            <div className=""
            style={{
              display : 'flex',
              flexDirection : 'column',
              alignItems : 'center',
              justifyContent : 'center',
              height : 'inherit'
            }}
            >
              <div className={style['HoverFixed'] + " text-center"} >
              <h1>Simple Steps, Success Processes</h1>
              <h4>We are here to help you</h4>
              </div>
            </div>
         </div>
    </section>
  );
};

export default Fixedimage;
