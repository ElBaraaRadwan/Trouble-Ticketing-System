import React , {useContext} from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import data from './header.json'
import Navbar from './navbarmine';
import { authContext } from './../store/Context/AuthContext';
import { NavLink } from 'react-router-dom';


export default function Header() {
    const isAuthen = useContext(authContext);
  return (
    <nav style={{backgroundColor : 'gray'}}>
    <ul >
      <li>
      <a href="/faqs">Faqs</a>
      </li>
      <li>
      <a href="/Customer">Customer</a>
      </li>
      <li>
      <a href="/tickets">tickets</a>
      </li>
      <li>
      <a href="/report">report</a>
      </li>
      <NavLink
                    onClick={() => isAuthen.logout()}
                    to="/Home"
                  >
                    Logout
                  </NavLink>
      
    </ul>
   </nav>
  )
}

// class Header extends React.Component {

//     render() {
//         // window.onclick = (event) => {
//         //     var $trigger = $("#clickableellips");
//         //     var $trigger2 = $(".add-btn");
//         //     if ($trigger !== event.target && !$trigger.has(event.target).length) {
//         //         document.getElementById("user").classList.remove("show");

//         //     }
//         //     if ($trigger !== event.target2 && !$trigger2.has(event.target).length) {
//         //         document.getElementById("add").classList.remove("show");
//         //     }
//         // }
//         return (
//             <div>
          

//                 {/* <div className='search-bar navbar-nav'>
//                     <input placeholder="Search" aria-label="Search" name="">
//                     </input>
//                 </div>
//                 <div className='user-action navbar-nav'>
//                     <div className='user-profile'>
//                         <img className='user-avatar' src={data['user-img']} alt='user avatar'></img>
//                         <div className='user-info'>
//                             <span className='greeting'>{'Hello'}</span>
//                             <span className='user-name'>{data['user-name']}</span>
//                         </div>
//                         <div className='user-dropdown'>
//                             <span id='clickableellips' onClick={() => $("#user").addClass("show")}><FontAwesomeIcon className='ellips-icon' icon={faEllipsisVertical} /></span>
//                             <div className='user-menu' id='user'>
//                                 <a className="dropdown-item" href="#">Bookmark list</a>
//                                 <a className="dropdown-item" href="#">Settings</a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='dropdown-add'>
//                         <span className='add-btn' onClick={() => $("#add").addClass("show")}> <FontAwesomeIcon icon={faPlus} /></span>
//                         <div className='user-menu' id='add'>
//                             <a className="dropdown-item" href="#">Bookmark list</a>
//                             <a className="dropdown-item" href="#">Settings</a>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//         );
//     }
// }
// export default Header;