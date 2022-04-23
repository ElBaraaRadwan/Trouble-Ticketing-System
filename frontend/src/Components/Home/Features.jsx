import React from "react";
import style from "./About.module.css";
import image from "./../../images/card4.jpg";
import image2 from "./../../images/card1.jpg";
import image3 from "./../../images/card3.jpg";
import ColDisplay from "../UI/ColDisplay";

export default function Features() {
  return (
    <section>
      <div
        style={{
          // background:
          //   "linear-gradient(90deg, rgba(36,35,51,1) 0%, rgba(1,176,211,1) 100%)",
          // backgroundColor : 'rgb(98, 198, 216)',
          background: 'linear-gradient(90deg, rgba(86,148,161,1) 0%, rgba(88,159,167,1) 100%)'
,
          color: "black",
        }}
      >
        <div className="container py-5 text-center">
          <h1 className={" fw-bolder  " + style["head-of-contents"]}>
            Why Trouble Ticket System ? 
          </h1>
          <p className={"pb-2  position-relative " + style["p-belowtitle"]}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="row">
            <ColDisplay
              image={image}
              title="Your satisfications"
              pargraph={"our goal is make you happy with our services"}
            />
            <ColDisplay
              image={image2}
              title="Bye Telephone!"
              pargraph={
                "No more waiting on phone so you used to waiting alot to recive an answer"
              }
            />
            <ColDisplay
              image={image3}
              title="Your satisfications"
              pargraph={"our goal is make you happy with our services"}
            />
          </div>
        </div>
      </div>
   
    </section>
  );
}
