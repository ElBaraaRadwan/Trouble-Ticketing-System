
import React from 'react';
import Ticket from './reply_ticket';
import Blog from './reply_faq';
import Add from './add_ticket';
import Faq from './add_faq';
import Reports from './reports';
import Addreport from './add_report';
// import Feedbacks from './feedback';
// import Addreport from './add_report';
export default function Viewbtn(props){

        return (

            <div>
                <Ticket ticket_id={props.ticketsId}  />
            </div>
        );
    }
    export  function Viewbtn_blogs(props){

        return (

            <div>
                <Blog blog_id={props.blogId}  />
            </div>
        );
    }
    export  function Viewbtn_add(){

        return (

            <div>
                <Add />
            </div>
        );
    }
    export  function Viewbtn_add_blog(){

        return (

            <div>
                <Faq />
            </div>
        );
    }
    export  function Viewbtn_report(){

        return (

            <div>
                <Reports />
            </div>
        );
    }
    export  function Viewbtn_add_report(){

        return (

            <div>
                <Addreport />
            </div>
        );
    }
    // export  function Viewbtn_add_feedback(){

    //     return (

    //         <div>
    //             <Feedbacks />
    //         </div>
    //     );
    // }