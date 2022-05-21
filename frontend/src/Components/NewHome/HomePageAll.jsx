import React from 'react';
import style from './HomePage.module.css'
import styleAnimate from './Animation.module.css'
import shape1 from '../../images/Images/shape1.png'
import shape2 from '../../images/Images/shape2.png'
import shape3 from '../../images/Images/shape3.png'
import shape4 from '../../images/Images/shape4.png'
import hero from '../../images/Images/hero.png'
import heroBg from '../../images/Images/hero-bg.png'
import track from '../../images/Images/track.png'
import bg from '../../images/Images/bg.png'
import blog1 from '../../images/Images/blog1.png'
import blog2 from '../../images/Images/blog2.png'
import blog3 from '../../images/Images/blog3.png'
import faq from '../../images/Images/faq.png'
import success from '../../images/Images/success-bg.png'
import service1 from '../../images/Images/service1.png'
import service2 from '../../images/Images/service2.png'
import service3 from '../../images/Images/service3.png'

import NavbarAll from './NavbarAll';
import FooterAll from './FooterAll';

const HomePageAll = () => {
  return (
    <>
      <main style={{ backgroundImage: `url(${heroBg})` }} className={style["pt-220"] + " position-relative"}>
        <div className="container ">
          <div className="row" id="mainPart">
            <div className="col-md-6 pt-4">
              <div className={style["content-box"] + " mb-5 text-left"}>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Hello in Our Help System</h1>
                <h4 className="text-center py-1">we are here to help you</h4>
                <div className="text-muted">
                  we create that system to help you to find a solution for your problem as fast as we can.
                </div>
                <div className="d-flex mt-3 justify-content-start">
                  <button className={style["btn-mine"]}>
                    Sign up
                  </button>
                </div>
              </div>

            </div>
            <div className="col-md-5 offset-md-1">
              <div className={style["hero-img"]}>
                <img style={{ height: '410px' }} src={hero} alt="" />
              </div>
            </div>

          </div>
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-10"] + " " + styleAnimate["t-60"]}>
          <img src={shape1} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-70"] + " " + styleAnimate["t-60"]}>
          <img src={shape2} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-50"] + " " + styleAnimate["t-100"]}>
          <img src={shape3} alt="" />
        </div>
      </main>
      <div className="container ml-4 position-relative">
        <div className={style['responsive'] + " d-flex justify-content-center position-relative "}
          style={{}} >
          <div className={style["service-block"] + " text-center " + style["style-three"] + " m-4"
            + " col-md-4"
          }>
            <div className="service-icon">
              <img src={service1} alt="" />
            </div>
            <div className="">
              <h4>
                Feedback
              </h4>
              <p className="text-muted-mine px-2">
                we take your feedback to improve.
              </p>
            </div>
          </div>
          <div className={style["service-block"] + " text-center " + style["style-three"] + " m-4"
            + " col-md-4"
          }>
            <div className="service-icon">
              <img src={service2} alt="" />
            </div>
            <div className="">
              <h4>
                Agents
              </h4>
              <p className="text-muted-mine px-2">
                we teach our agents so they have the ability to help you
              </p>
            </div>
          </div>
          <div className={style["service-block"] + " text-center " + style["style-three"] + " m-4"
            + " col-md-4"
          }>
            <div className="service-icon">
              <img src={service3} alt="" />
            </div>
            <div className="">
              <h4>
                Statstics
              </h4>
              <p className="text-muted-mine px-2">
                we always make statistics to enhacment our system
              </p>
            </div>
          </div>
        </div>
        <div
          className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-10"] + " " + styleAnimate["t-0"]}
        >
          <img src={shape3} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["r-5"] + " " + styleAnimate["t-100"]}>
          <img src={shape1} alt="" />
        </div>
      </div>
      <section className='pt-4 position-relative'>
        <div className="container pt-5 ">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h6 className="h1">Tracking And Analytics</h6>
              <p className="py-1">
                we track all tickets and collect all important
                data that we need and analytic it to get new consequences to improve our services
              </p>
              <div className="d-flex mt-3 justify-content-start">
                <button className={style["btn-mine"]}>
                  Contact Us
                </button>
              </div>
            </div>
            <div className="col-md-6">
              {/* track */}
              <div className={style["hero-img"]}>
                <img style={{ height: '410px' }} src={track} alt="" />
              </div>
            </div>
          </div>
          <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-10"] + " " + styleAnimate["t-5"]}>
            <img src={shape4} alt="" />
          </div>
        </div>
      </section>
      <section style={{
        paddingTop: '150px', paddingBottom: '70px',

      }} className="position-relative mt-5">
        <div className={style["success-bg"]} style={{ backgroundImage: `url(${success})` }}>
        </div>
      </section>
      <section style={{ marginBottom: '115px' }} className="position-relative">
        <section style={{
          backgroundImage: `url(${bg})`, width: '90%',
          margin: 'auto', paddingTop: '40px', borderRadius: '50px', paddingBottom: '40px', boxShadow: '0 1px 23px rgb(0 0 0 / 3%)'
        }} className={style["inner"]} >
          <div className="text-center">
            <p className="h2">Why TTS?</p>
            <p className={style["text-mine-spe"] + " pt-2 pb-3"}>Track, prioritize, and assign tickets, and automate resolution processes to drive efficiency.</p>

          </div>
          <div className={style['responsive'] + " d-flex  justify-content-center"}>
            <div className={style["service-style"]}>
              <div className={style["service-image"] + " d-flex justify-content-center"}>
                <img style={{ borderRadius: '20px' }} src={blog1} alt="" />
              </div>
              <div className='w-75 m-auto'>
                <h4>Bye Telephone</h4>
                <p >All what you need know one click and let us take the job</p>
              </div>
            </div>
            <div className={style["service-style"]}>
              <div className={style["service-image"] + " d-flex justify-content-center"}>
                <img style={{ borderRadius: '20px' }} src={blog2} alt="" />
              </div>
              <div className='w-75 m-auto'>
                <h4>access anywhere</h4>
                <p>if you have any problem anywhere just open the website</p>
              </div>
            </div>
            <div className={style["service-style"]}>
              <div className={style["service-image"] + " d-flex justify-content-center"}>
                <img style={{ width: '323px', height: '189px' }} src={blog3} alt="" />
              </div>
              <div className='w-75 m-auto'>
                <h4>Why web application?</h4>
                <p >A total of 5 billion people around the world use the internet today</p>
              </div>
            </div>
          </div>
        </section>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-10"] + " " + styleAnimate["t-60"]}>
          <img src={shape1} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-70"] + " " + styleAnimate["t-60"]}>
          <img src={shape2} alt="" />
        </div>
        <div className={styleAnimate["shape"] + " " + styleAnimate["shapeAnimationOne"] + " " + styleAnimate["l-50"] + " " + styleAnimate["t-100"]}>
          <img src={shape3} alt="" />
        </div>
      </section>
      <section className="position-relative mt-5">
        <div className="container-fluid mt-2">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <img className='w-100' src={faq} alt="" />
            </div>
            <div className={"col-md-5 ms-5 d-flex flex-column justify-content-center " + style['m-0']}>
              <h4 className="h4 fw-bold" >How FAQs Can Help You?</h4>
              <p style={{ textAlign: 'justify' }}>
                FAQs enable you to deal with specific queries that your customers have about your business.
                They also represent another way to reach out and connect with your
                target audience. Therefore, it is one of the most important elements of your website strateg
              </p>

            </div>
          </div>
        </div>
      </section>
      <section className={" m-auto text-center mt-5 pt-5 mb-4 " + style["w-95"] + ' ' + style["w-50-m"]}>
        <div className={style["call-action-content"]}>
          <h4 className="h2">Have any question about us?</h4>
          <p className="">if you have aby question just sgn up and send a ticket</p>
          <button className={style["btn-mine"]}>
            Sign up
          </button>
        </div>
      </section>
      <FooterAll/>
    </>
  );
}

export default HomePageAll;