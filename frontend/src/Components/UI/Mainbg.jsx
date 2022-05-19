import React from 'react'
import heroBg from "../../images/Images/hero-bg.png"
import style from '../NewHome/HomePage.module.css'

export default function Mainbg(props) {
  return (
    <main style={{ backgroundImage: `url(${heroBg})` }} className={style["pt-220"] + " position-relative"}>
        {props.children}
    </main>
  )
}
