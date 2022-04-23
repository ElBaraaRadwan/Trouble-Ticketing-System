import React from "react";
import style from "./SectionsFeatures.module.css";
import image from "../../images/card1.jpg";
import image2 from "../../images/card3.jpg";
export default function SectionsFeatures() {
  return (
    <section
      className="p-5 text-white"
      style={{
        background: "#110f16",
      }}
    >
      <h3
        className="text-center "
        style={{
          margin: "2rem 0",
          textAlign: "center",
          fontSize: "2.5rem" ,
          fontFamily: "900 !important",
        }}
      >
        Why Trouble Ticket System?
      </h3>
      <div
        className="container my-5"
        style={{
          boxShadow: "0 4px 21px -12px rgb(255 255 255 / 66%)",
          color: "white",
          borderRadius : '10px',
          overflow: 'hidden',
        }}
      >
        <div className="row">
          <div
            className={"col-md-9 p-4 " + style["postcard"]}
            style={{
              background:
                "linear-gradient(90deg,  rgba(44,43,61,1) 35%), rgba(45,95,117,1) 0%" ,
                // "linear-gradient(90deg, rgba(45,95,117,1) 46%, rgba(198,198,198,1) 100%)"
            }}
          >
            <h1 className="h2 mb-4">GoodBye Telephone!</h1>
            {/* rgba(0, 118, 189, 0.1)  */}
            <p
              style={{
                textAlign: "justify",
              }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              laborum ullam, repudiandae sit itaque cupiditate sed consectetur
              quas cumque modi eaque voluptatibus magnam omnis non beatae odit
              sunt et dolore? Quibusdam quidem magni odio vel dolorum quisquam.
              Voluptates incidunt corporis laborum tempore eos?
            </p>
          </div>
          <div className={"col-md-3 p-0 overflow-hidden " + style["postcards"]}>
            <img
              src={image}
              className={"w-100 h-100 " + style["image-transform"]}
              alt=""
              style={{
                clipPath: "polygon(50px 0, 100% 0, 100% 100vh, 0 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="container my-5"
        style={{
          boxShadow: "0 4px 21px -12px rgb(255 255 255 / 66%)",
          color: "white",
          borderRadius : '10px',
          overflow: 'hidden',
        }}
      >
        <div className="row">
          <div className={"col-md-3 p-0 overflow-hidden " + style["postcards"]}>
            <img
              src={image2}
              className={"w-100 h-100 " + style["image-transform"]}
              alt=""
              style={{
                clipPath: "polygon(0 0, 81% 0, 100% 100%, 0% 100%)",
              }}
            />
          </div>
          <div
            className={"col-md-9 p-4 " + style["postcard"]}
            style={{
              background:
                // "linear-gradient(90deg, rgba(45,95,117,1) 46%, rgba(198,198,198,1) 100%)",
                "linear-gradient(90deg,  rgba(44,43,61,1) 35%), rgba(45,95,117,1) 0%"
            }}
          >
            <h1 className="h2 mb-4">GoodBye Telephone!</h1>
            <p
              style={{
                textAlign: "justify",
              }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              laborum ullam, repudiandae sit itaque cupiditate sed consectetur
              quas cumque modi eaque voluptatibus magnam omnis non beatae odit
              sunt et dolore? Quibusdam quidem magni odio vel dolorum quisquam.
              Voluptates incidunt corporis laborum tempore eos?
            </p>
          </div>
        </div>
      </div>
      <div
        className="container my-5"
        style={{
          boxShadow: "0 4px 21px -12px rgb(255 255 255 / 66%)",
          color: "white",
          borderRadius : '10px',
          overflow: 'hidden',
        }}
      >
        <div className="row">
          <div
            className={"col-md-9 p-4 " + style["postcard"]}
            style={{
              background:
                // "linear-gradient(90deg, rgba(45,95,117,1) 46%, rgba(198,198,198,1) 100%)",
                "linear-gradient(90deg,  rgba(44,43,61,1) 35%), rgba(45,95,117,1) 0%"
            }}
          >
            <h1 className="h2 mb-4">GoodBye Telephone!</h1>
            <p
              style={{
                textAlign: "justify",
              }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              laborum ullam, repudiandae sit itaque cupiditate sed consectetur
              quas cumque modi eaque voluptatibus magnam omnis non beatae odit
              sunt et dolore? Quibusdam quidem magni odio vel dolorum quisquam.
              Voluptates incidunt corporis laborum tempore eos?
            </p>
          </div>
          <div className={"col-md-3 p-0 overflow-hidden " + style["postcards"]}>
            <img
              src={image}
              className={"w-100 h-100 " + style["image-transform"]}
              alt=""
              style={{
                clipPath: "polygon(50px 0, 100% 0, 100% 100vh, 0 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
