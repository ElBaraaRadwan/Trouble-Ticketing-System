import React, { useEffect, useState } from "react";
import $ from "jquery";
import Fixedimage from "../UI/FixedImage";
import axios from "axios";
import style from './MyTicket.module.css'

const singHead = {
  padding: "5px",
  margin: "0",
  backgroundColor: "lightslategrey",
  cursor: "pointer",
  color: "white",
  textAlign : 'left',
  fontsize : '24px',
  fontWeight : 'bold'
};
const singpar = {
  backgroundColor: "white",
  margin: "0",
  padding: "10px",
  display: "none",
  textAlign : 'justify',
  fontSize : '22px !important',
  fontWeight : 'bold'
};
const toggleHandler = (e) => {
  $(e.target).one("click", (e) => {
    let currentIndex = $(e.target).attr("num");
    let id = $(e.target).attr("db-target");
    let parentSection = $(e.target).closest(`#${id}`);
    let chidlernparagraoh = $(`#${id}`).find('.singpar');
    console.log(chidlernparagraoh)
    let getPargraph = $(e.target).parent().siblings(".singpar");
    // let x = $(".singpar").eq(currentIndex);
    let y = chidlernparagraoh.eq(currentIndex);
    y.slideToggle();
    // x.siblings("p").slideUp();
  });
};

export default function FaqsData() {
  const [sales, setSales] = useState([]); //Sales
  const [mobile, setMobiles] = useState([]); //Mobile
  const [tv, setTv] = useState([]); //Tv
  const [air, setAir] = useState([]); // Air
  const [techSup, setTechSup] = useState([]); // Air
  const [com, setCom] = useState([]); // Air
  
  // le = Date.now();

  const getFaqs = async () => {
    const { data } = await axios.get("http://localhost:5000/getAllFAQs");
    const dataArr = data.faq;
    console.log(data)

    let tvDep = [];
    let salesDep = [];
    let mobileDep = [];
    let airDep = [];
    let techSupDep = [];
    let comDep = [];
    dataArr.map((e) => (e.department === "Sales" ? salesDep.push(e) : ""));
    dataArr.map((e) => (e.department === "Devices-Mob" ? mobileDep.push(e) : "")); 
    dataArr.map((e) => (e.department === "Devices-TV" ? tvDep.push(e) : "")); 
    dataArr.map((e) => (e.department === "Devices-Air" ? airDep.push(e) : "")); 
    dataArr.map((e) => (e.department === "Tech-Sup" ? techSupDep.push(e) : "")); 
    dataArr.map((e) => (e.department === "Devices-Com" ? comDep.push(e) : "")); 
    console.log(mobileDep)
    setSales(salesDep);
    setMobiles(mobileDep);
    setTv(tvDep);
    setAir(airDep);
    setTechSup(techSupDep);
    setCom(comDep);
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <React.Fragment>
      <Fixedimage />
      <section
        className="p-5"
        style={{
          background: "rgb(31, 40, 51)",
        }}
      >
        <div className="py-3"   id="sales">
          <h3 className={"text-center text-light " + style['header_faqs']}>Sales Department (FAQs)</h3>
          <div className= " m-auto text-center" style={{width : '90%'}}>
            {sales.map((e , i) => {
              return (
                <div>
                  <div
                    className="d-flex justify-content-between align-items-center px-3 singHead"
                    style={singHead} 
                  >
                    <h4 className="p-0">{e.header}</h4>
                    <i
                      className="fa-solid fa-arrow-down d-block "
                      num={i} 
                      db-target='sales'
                      onClick={toggleHandler}
                    ></i>
                  </div>
                  <p style={singpar} className="singpar" pargraph='para'>
                   {e.content}
                  </p>
                </div>
              )
              
            })}
          </div>
        </div>
         <div className="py-3"   id="mobile">
          <h3 className={"text-center text-light " + style['header_faqs']}>Mobile Devices Department (FAQs)</h3>
          <div className= " m-auto text-center" style={{width : '90%'}}>
            {mobile.map((e , i) => {
              return (
                <div className="">
                  <div
                    className="d-flex justify-content-between align-items-center px-3 singHead"
                    style={singHead}
                  >
                    <h4 className="p-0">{e.header}</h4>
                    <i
                      className="fa-solid fa-arrow-down d-block "
                      num={i }
                      onClick={toggleHandler}
                      db-target='mobile'
                    ></i>
                  </div>
                  <p style={singpar} className="singpar">
                   {e.content}
                  </p>
                  
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-3"   id="tv">
          <h3 className={"text-center text-light " + style['header_faqs']}>Television Department (FAQs)</h3>
          <div className= " m-auto text-center" style={{width : '90%'}}>
            {tv.map((e , i) => {
              return (
                <div className="">
                  <div
                    className="d-flex justify-content-between align-items-center px-3 singHead"
                    style={singHead}
                  >
                    <h4 className="p-0">{e.header}</h4>
                    <i
                      className="fa-solid fa-arrow-down d-block "
                      num={i }
                      onClick={toggleHandler}
                      db-target='tv'
                    ></i>
                  </div>
                  <p style={singpar} className="singpar">
                   {e.content}
                  </p>
                  
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-3" id="Air">
          <h3 className={"text-center text-light " + style['header_faqs']}>Air Conditioner Department (FAQs)</h3>
          <div className= " m-auto text-center" style={{width : '90%'}}>
            {air.map((e , i) => {
              
              return (
                <div className="">
                  <div
                    className="d-flex justify-content-between align-items-center px-3 singHead"
                    style={singHead}
                  >
                    <h4 className="p-0">{e.header}</h4>
                    <i
                      className="fa-solid fa-arrow-down d-block "
                      num={i }
                      onClick={toggleHandler}
                      db-target='Air'
                    ></i>
                  </div>
                  <p style={singpar} className="singpar">
                   {e.content}
                  </p>
                  
                  
                </div>
              );
            })}
          </div>
        </div>  
        <div className="py-3" id="Technical">
          <h3 className={"text-center text-light " + style['header_faqs']}>Technical Support Department (FAQs)</h3>
          <div className= " m-auto text-center" style={{width : '90%'}}>
            {techSup.map((e , i) => {
              
              return (
                <div className="">
                  <div
                    className="d-flex justify-content-between align-items-center px-3 singHead"
                    style={singHead}
                  >
                    <h4 className="p-0">{e.header}</h4>
                    <i
                      className="fa-solid fa-arrow-down d-block "
                      num={i}
                      onClick={toggleHandler}
                      db-target='Technical'

                    ></i>
                  </div>
                  <p style={singpar} className="singpar">
                   {e.content}
                  </p>
                  
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-3" id="Computer">
          <h3 className={"text-center text-light " + style['header_faqs']}>Computer Devices Department (FAQs)</h3>
          <div className= " m-auto text-center" style={{width : '90%'}}>
            {com.map((e , i) => {
              
              return (
                <div className="">
                  <div
                    className="d-flex justify-content-between align-items-center px-3 singHead"
                    style={singHead}
                  >
                    <h4 className="p-0">{e.header}</h4>
                    <i
                      className="fa-solid fa-arrow-down d-block "
                      num={i}
                      onClick={toggleHandler}
                      db-target='Computer'

                    ></i>
                  </div>
                  <p style={singpar} className="singpar">
                   {e.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
    </React.Fragment>
  );
}

// const toggleHandler = (e)=>{
//     $(e.target).one('click',(e)=>{
//         let currentIndex = $(e.target).attr('num');
//         let x = $('.singpar').eq(currentIndex);
//         x.slideToggle();
//         x.siblings('p').slideUp();
//     });
// }
