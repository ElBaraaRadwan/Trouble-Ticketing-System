import React from 'react'
import $ from "jquery";

export default function TryJq() {
    const singHead = {
        padding: '5px' ,
        margin: '0',
        backgroundColor: 'rgba(214, 46, 51 , 0.6)',
        cursor: 'pointer',
        color: 'white',
    }
    const singpar  = {
        backgroundColor: 'rgb(218, 209, 209)',
        margin: '0',
        padding: '0',
    }
    const toggleHandler = (e)=>{
        $('.singHead').one('click',(e)=>{
            let currentIndex = $(e.target).attr('num');
            let x = $('.singpar').eq(currentIndex);
            x.slideToggle();  
            x.siblings('p').slideUp();
        });
    }
    
  return (
          <section id="singers" className="m-5">
        <div className="w-50 m-auto p-5 me text-center">
            <h4 style={singHead} className='singHead' num="0" onClick={toggleHandler}> Singer One</h4>
            <p style={singpar} className='singpar'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum."</p>
            
        </div>
    </section>
  )
}
