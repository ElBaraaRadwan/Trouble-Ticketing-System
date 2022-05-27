import React, { useEffect, useState } from 'react'
import Mainbg from '../UI/Mainbg'
import style from './DashboardOH.module.css'
import axios from 'axios';
import faq from './../../images/Images/Faq.svg'
import user from './../../images/Images/users.svg'
import ticket from './../../images/Images/tickets.svg'
import feedback from './../../images/Images/feedback.svg'
import ColData from './ColData';
import { NavLink, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

export default function DashboardOH() {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalTickets, setTotalTickets] = useState([]);
  const [allFaqs, setAllFaqs] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [show , setShow] = useState(false);


  const getData = async () => {
    const { data } = await axios.get(`https://trouble-ticketing-system.herokuapp.com/dashboard/h_o`);
    const faqs = data.FAQ_Data.faqs;
    console.log(data)
    const faqsMobD = faqs.filter(item => item.department === "Devices-Mob");
    const FaqsMob = {
      departmentName: 'Mobile Devices',
      total: faqsMobD.length,
    };
    const faqsTVD = faqs.filter(item => item.department === "Devices-TV");
    const FaqsTv = {
      departmentName: 'Television Devices',
      total: faqsTVD.length,
    };
    const faqsComp = faqs.filter(item => item.department === "Devices-Com");
    const FaqsCom = {
      departmentName: 'Computer Devices',
      total: faqsComp.length,
    };
    const faqsTechD = faqs.filter(item => item.department === "Tech-Sup");
    const FaqsTech = {
      departmentName: 'Technical Devices',
      total: faqsTechD.length,
    };
    const AirTech = faqs.filter(item => item.department === "Devices-Air");
    const FaqsAir = {
      departmentName: 'Air Conditioner Devices',
      total: AirTech.length,
    };
    const SalesTech = faqs.filter(item => item.department === "Sales");
    const FaqsSales = {
      departmentName: 'Sales Department',
      total: SalesTech.length,
    };
    const AllFaqs = [{ Name: 'Total Faqs', total: faqs.length }, FaqsMob, FaqsTv, FaqsCom, FaqsTech, FaqsAir, FaqsSales];
    setAllFaqs(AllFaqs);
    const users = data.UserData.users;
    const userAgent = users.filter(item => item.role === 'agent');
    const userAdmin = users.filter(item => item.role === 'admin');
    const userCustomer = users.filter(item => item.role === 'user');
    const allUsers = [{ Name: 'Total Users', total: users.length }, { Name: 'Total Agents', total: userAgent.length }
      , { Name: 'Total Admins', total: userAdmin.length }, { Name: 'Total Customers', total: userCustomer.length }];
    setTotalUsers(allUsers);
    const tickets = data.TicketData.tickets;
    const ticketSales = tickets.filter(item => item.department === "Sales");
    const ticketComp = tickets.filter(item => item.department === "Devices-Com");
    const ticketMobil = tickets.filter(item => item.department === "Devices-Mob");
    const ticketTv = tickets.filter(item => item.department === "Devices-TV");
    const ticketAir = tickets.filter(item => item.department === "Devices-Air");
    const ticketTech = tickets.filter(item => item.department === "Tech-Sup");
    const allTickets = [{ Name: 'Total Ticket', total: tickets.length },
    { Name: 'Sales Department', total: ticketSales.length }, { Name: 'Mobile Department', total: ticketMobil.length },
    { Name: 'Computer Department', total: ticketComp.length }, { Name: 'Tv Department', total: ticketTv.length },
    { Name: 'Air Conditional Department', total: ticketAir.length },
    { Name: 'Technical Department', total: ticketTech.length }]
    setTotalTickets(allTickets);
    const feedbacks = data.FeedbackData.feedBack;
    const goodF = feedbacks.filter(item => item.status === "Good");
    const veryHappyF = feedbacks.filter(item => item.status === "Very Happy");
    const happyF = feedbacks.filter(item => item.status === "Happy");
    const sadF = feedbacks.filter(item => item.status === "Sad");
    const verySadF = feedbacks.filter(item => item.status === "Very Sad");
    // Happy
    const allFeedbacks = [{ Name: 'Total Feedbacks', total: feedbacks.length }, { Name: 'Very Happy', total: veryHappyF.length }
      , { Name: 'Happy', total: happyF.length }, { Name: 'Good', total: goodF.length },
    { Name: 'Sad', total: sadF.length }, { Name: 'Very Sad', total: verySadF.length }
    ]
    setAllFeedbacks(allFeedbacks)
    setShow(true);

  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <Mainbg />
      <div className={"p-5 " + style["bottom-radious"] + ' ' + 'shadow-lg'}>
        <h1 className="display-3">Welcome Our Partner</h1>
        <p className="lead">
          <NavLink className={(navData) =>
            navData.isActive ? style.active : style.NormalLi
          }
            to='/officeHeaderHome/faqs'>
            Faqs
          </NavLink>
          <NavLink className={(navData) =>
            navData.isActive ? style.active : style.NormalLi
          } to='/officeHeaderHome/users'>
            Users
          </NavLink>
          <NavLink className={(navData) =>
            navData.isActive ? style.active : style.NormalLi
          } to='/officeHeaderHome/tickets'>
            Tickets
          </NavLink>
          <NavLink className={(navData) =>
            navData.isActive ? style.active : style.NormalLi
          } to='/officeHeaderHome/Feedbacks'>
            Feedbacks
          </NavLink>
        </p>
        <hr className="my-2" />
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-md-2 mt-md-2 align-items-center">
            {
              show &&
             ( <Routes>
                <Route path='faqs' element={<ColData data={allFaqs} image={faq} />} />
                <Route path='users' element={<ColData data={totalUsers} image={user} />} />
                <Route path='tickets' element={<ColData data={totalTickets} image={ticket} />} />
                <Route path='feedbacks' element={<ColData data={allFeedbacks} image={feedback} />} />
              </Routes>)
            }
            
          </div>
        </div>
      </div>
    </>

  )
}
