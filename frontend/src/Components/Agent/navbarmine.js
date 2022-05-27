import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route,Navigate,Link  } from "react-router-dom";
import Customer from "./Customer";
import Reports from './reports';
import Article from "./tickets";
import Faqs from './faqs';
export default class Navbar extends Component {
    state = { 
       
     }

    render() { 
                    
        
        return ( 
            <div>

            
 
 <Routes>
 {/* <Route path="/tickets" element={<Article />} /> */}

   {/* <Route path="/faqs" element={<Faqs />}/>
   <Route path="/Customer" element={<Customer />} />
     <Route path="/" exact element={<Article />} />
      <Route path="/" element={<Faqs />} />
      <Route path="/report" element={<Reports />} />
      <Route path="/tickets" element={<Article />} /> */}
     
     {/* <Route  path="/"  element={<Navigate replace to="/Customer" />}/> */}
     {/* <Navigate  to="/Customer" />               */}
   
 </Routes>
           
          </div>
        );
    }
}


