import React from 'react'

export default function ServerError() {
  return (
    <div 
    style={{
      position: 'fixed',
      bottom: '2%',
      right: '2%',
      display : 'flex',
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center', 
      background : 'lightblue',
      padding : '15px 10px',
      color : 'black',
      borderRadius : '30px'
    }}
    >
      <i style={{fontSize : '50px' , margin : '10px'}} className="fa-solid fa-circle-exclamation d-block"></i>
      <p style={{fontSize : '18px' , fontWeight : 'bold'}}>
        There is an error connecting to the server <br />
        Please try again 
      </p>
   </div>
  )
}
