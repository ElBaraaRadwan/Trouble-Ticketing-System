import React from "react";
import style from "./About.module.css";
import image from "./../../images/auto.png";
import ArticleDisplay from "./../UI/ArticleDisplay";
const Dummy_data = [
  {
    title: "Improve customer retention",
    pargraph: ` A fit-for-purpose ticketing system, along with best-practice processes,
      helps organizations prevent major incidents from becoming a very public
      reality.`,
  },
  {
    title: "Save time and money",
    pargraph: `Downtime is money. IT professionals waste less time on unnecessary manual processes, 
      freeing up valuable time for more important work.`,
  },
  {
    title: "Better support, happier customers",
    pargraph: `By systematically capturing tickets and categorizing them correctly, 
      a ticketing system allows for proper management of incidents leading to quicker resolution times.`,
  },
];

export default function About() {
  return (
    <section
      style={{
        backgroundColor: "#110f16",
      }}
    >
      <div
        style={{ backgroundColor: "#ececec", 
        paddingTop: "80px" ,
        clipPath : 'polygon(0 0, 100% 18%, 100% 100%, 0 82%)'  
      }}
        className=""
      >
        <div className="container py-5 text-center">
          <h4 style={{ fontFamily: "initial", fontWeight: "600" }}>
            How Trouble Ticket System can help you?
          </h4>
          <p>
            Track, prioritize, and assign tickets, and automate resolution
            processes to drive efficiency.
          </p>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <img className={style["img"]} src={image} alt="" />
            </div>
            <div className="col-md-6 d-flex flex-column align-items-center">
              <div className="w-75">
                {Dummy_data.map((e) => (
                  <ArticleDisplay title={e.title} pargraph={e.pargraph} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
