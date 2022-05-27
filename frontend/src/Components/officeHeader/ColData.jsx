import React from 'react'


export default function ColData (props) {
    const {image , data } = props;
    

  return (
    <React.Fragment>
         <div className="col">
        <div className="row d-col my-2">
          <div className="col-md-6">
            <div className="card m-3 bottom-radious border-0 shadow bg-primary text-white">
              <div className="card-body d-flex justify-content-between">
                <div className="card-title">
                  <img src={image} alt="" width="60px"/>
                </div>
                <div className="text-right">
                <small className='h5'>{data[0].Name}</small>
                <p className="card-text fw-bold ">
                {data[0].total}  
                </p>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <div className="col">
        <div className="d-none justify-content-between">
          <p>Last Month</p>
          <a href="#" className="fw-bold small">View All</a>
        </div>
        <div className="card small my-3 shadow rounded border-0">
          <div className="card-header bg-white text-primary h3">
           {data[0].Name} Information
          </div>
          <div className="card-body">
            {
                data.slice(1).map((e)=>{
                  const keys = Object.keys(e);
                    return(
                        <div key={e[keys[0]]} className="d-flex justify-content-between">
                            <h6>{e[keys[0]]}</h6>
                            <p> {e[keys[1]]}</p>
                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
