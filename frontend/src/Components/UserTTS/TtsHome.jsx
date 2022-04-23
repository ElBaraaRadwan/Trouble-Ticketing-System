import React from "react";
import Navbar from "../Home/Navbar";
export default function TtsHome() {
  return (
    <main
      style={{
        backgroundColor: "#eeeeedr",
        height: "calc(100vh - 10vh)",
      }}
    >
      <section
        style={{
          height: "inherit",
          color: "white",
          background:
            "linear-gradient(90deg, rgba(88,122,130,1) 0%, rgba(111,109,179,1) 100%)",
        }}
        className="text-center p-5"
      >
        <h1 className="fs-1">Hello Ahmed</h1>
        <p className="display-6">Do you have a problem that you can't solve?</p>
        <p className="lead">Don't worry, We are aiming to help you</p>
        <div className="d-flex justify-content-center">
          <h4>Go to</h4>
          <div>
            <h4>
              <a href="">FAQs</a>
            </h4>
            <h4>
              <a href=""> Submit a ticket</a>{" "}
            </h4>
          </div>
        </div>
      </section>
    </main>
  );
}
