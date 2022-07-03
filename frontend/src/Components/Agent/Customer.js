import React from 'react';
import './Customer.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';
import style from './Agent.module.css'

class Customer extends React.Component {
    state={
        Customers:[],
        createAt:[]
    };
    componentWillMount() {
        this.Customer();
    }

    Customer() {
        axios.get('https://trouble-ticketing-system.herokuapp.com/users')
            .then((res) => {
                // createAt=res.data.data.createdAt;
                // console.log("u",createAt);
                console.log(res.data.data[2].createdAt);
                if(res.data.data){
                    for(var i=0 ;i<res.data.data.length;i++){
                        console.log(res.data.data[2].createdAt)
                    }
                }
                this.setState({ Customers: res.data.data });
            })
            .catch((error) => {
                // error.response.status Check status code
            });
    }
    componentDidMount() {
        document.title = "Customer";
        
    }

    render() {
    
        // var createAt;
        return (

            <div>
<Header />
            <section className='m-4 ps-5'>
                <h4 className='pb-4 customer' style={{ disply: "block" }} > Customer </h4>

                {/* grid system */}
                <div className='row d-flex content justify-content-between' style={{ boxsizing: "border-box" }}>
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                        <select className={style['dropdown']}>
                            <option className={style['sortby']} value="SortBy: CreatedAt" disabled>SortBy</option>
                            {/* <option selected value="CreatedAt">SortBy: CreatedAt</option> */}
                            <option value="CreatedAt">CreatedAt</option>
                            <option value="Name">Name</option>
                            <option value="Email">Email</option>
                        </select>
                    </div>


                    {/* dropdown2 */}

                   


                    {/* search input*/}

                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 position-relative'>
                        <input type="text" className={style['input-search']} placeholder='Search'></input>
                        <FaSearch className={style['icon-search']} />

                    </div>



                    {/*button a href new */}
                    <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 '>
                        {/* a href new */}
                        <button className="btn btn-primary btn-cew-customer" >
                            <a href="#">
                                <span><AiOutlinePlus className='icone-plus' /> </span>
                                New Customer
                            </a>
                        </button>
                    </div>

                </div>

                {/* show table */}
                {/* <div className='pt-4'>
                    <JsonDataDisplay />
                </div> */}
                   <table className={style['style-table']}> {/* + ' m-5' */}
                            <tr className='bg-table-head '>

                                <th className='text-center table-h'>Name</th>
                                <th className='text-center table-h'>Mail</th>
                                <th className='text-center table-h'>CreatedAt</th>
                                <th className='text-center table-h'>UpdatedAt</th>
                            </tr>
                                                            
                            {this.state.Customers.map(customer => (
                                
                                <tbody key={customer.key} className='bt-5 border-td'>
                                <tr className='bt-5'>
                                    <td key={customer.key}>{customer.name} {customer.last_name}</td>
                                    <td key={customer.key}>{customer.email}</td>
                                    {/* <td key={customer.key}>{customer.age}</td> */}

                                    <td key={customer.key}>{new Date(customer.createdAt).toDateString()}</td>
                                    <td key={customer.key}>{new Date(customer.updatedAt).toDateString()}</td>
                                     </tr>
                                     </tbody>
                            ))}

                            

                            {/* {this.state.search_results.map(Customer => (
                                <tr className='results'>
                                    <td key={Customer.key}>{Customer.header}</td>
                                    <td key={Customer.key}>{Customer.content}</td>
                                    <td key={Customer.key}>{Customer.department}</td>
                                    <td key={Customer.key}>{Customer.createdAt.slice(0, 10)}</td>
                                    <td><button className='btn view-btn' onClick={() => { this.showAppMain(Customer._id) }}>View</button> <button className='btn del-btn' onClick={() => axios.delete('/deleteFAQs/' + Customer._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))} */}
                        </table>
                     


            </section>
</div>
        );
    }
}
export default Customer;
