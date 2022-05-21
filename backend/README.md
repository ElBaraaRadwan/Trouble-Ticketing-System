Graduation Project of IT_MUST Student

---===[Trouble_Ticketing_System]===---

///// Routes /////

    // FAQ //
https://localhost:5000/getAllFAQs  // Get req All FAQs
https://localhost:5000/getFAQs/:id  // Get req for specific FAQ
https://localhost:5000/editFAQs/:id  // Patch req for editing/updating specific FAQ
https://localhost:5000/deleteFAQs/:id  // Delete req for delete specific FAQ
https://localhost:5000/createFAQs  // Post req for Creating FAQ

    // Report //
https://localhost:5000/getAllReports  // Get req All Reports
https://localhost:5000/editReport/:id  // Patch req for editing/updating specific Report
https://localhost:5000/deleteReport/:id  // Delete req for delete specific Report
https://localhost:5000/createReport  // Post req for Creating Report

    // Feadback //
https://localhost:5000/getAllFeedBack  // Get req All Feedback
https://localhost:5000/createFeedBack/:id  // Post req for Creating feedback 

    // Ticket //
https://localhost:5000/getAllTicket  // Get req All Tickets
https://localhost:5000/getTicket/:id  // Get req for specific Ticket
https://localhost:5000/getAllTicket/myTicket/:id // Get req for All Ticket that a specific user create it
https://localhost:5000/editTicket/:id  // Patch req for editing/updating specific Ticket
https://localhost:5000/replyTicket/:id  // Patch req for user replys to a solaution of his Ticket
https://localhost:5000/solveTicket/:id  // Patch req for Agent solaution to the Ticket
https://localhost:5000/assignTicket/:id  // Patch req for assign specific Ticket to it department && change the status of that ticket
https://localhost:5000/deleteTicket/:id  // Delete req for delete specific Ticket
https://localhost:5000/createTicket  // Post req for Creating Ticket

    // User //
https://localhost:5000/users  // Get req All Users
https://localhost:5000/updateUser/:id  // Patch req for editing/updating specific User
https://localhost:5000/deleteUser/:id  // Delete req for delete specific User
https://localhost:5000/addUser  // Post req for Creating (Sign_Up/register) User
https://localhost:5000/signIn  // Post req for (Sign_In/Login) User

    // Uploads //
https://localhost:5000/uploads/FAQs/IMG/...The_IMG_Name  // Get req for specific FAQ Image
https://localhost:5000/uploads/FAQs/Video/...The_Video_Name  // Get req for specific FAQ Video
https://localhost:5000/uploads/Tickets/Audio/...The_Audio_Name  // Get req for specific Ticket Audio
https://localhost:5000/uploads/Tickets/IMG/...The_IMG_Name  // Get req for specific Ticket Image

    // Dashboard //
https://localhost:5000/Dashboard/H_O  // GET req for every info that will display to the Head_Office