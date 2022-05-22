import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './article.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import axios from 'axios';
import $ from 'jquery';
import Viewbtn from './view';
import { Viewbtn_add } from './view';
import style from './Agent.module.css'

class Article extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            tickets: [],
            search_results: [],
            update: false,
            ticketsIds: '',
            shouldShowMain: false,
            shouldShowAdd:false,
        }
        this.showAppMain = this.showAppMain.bind(this);
        this.sort_by = this.sort_by.bind(this);
        this.get_tickets = this.get_tickets.bind(this);
        this.search = this.search.bind(this);
    };
    componentDidMount() {
        document.title = "Tickets";
        $('.reply-btn').attr("disabled", true);


    }
    componentWillMount() {
        this.get_tickets();
    }

    get_tickets() {
        axios.get('https://trouble-ticketing-system.herokuapp.com/getAllTicket')
            .then((res) => {
                this.setState({ tickets: res.data.tickets });
                $('.search').attr("disabled", false);
                $('.reply-btn').attr("disabled", false);
            })
            .catch((error) => {
                // error.response.status Check status code
            });
    }
    showAppMain(ticketsId) {

        this.setState({ shouldShowMain: true, ticketsIds: ticketsId });
    };
    sort_by(e, type) {
        e.preventDefault();
        this.setState({ update: true });
        if (type === 'title') {
            this.state.tickets.sort((a, b) => a.title.localeCompare(b.title));
            this.state.search_results.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (type === 'date') {
            this.state.tickets.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            this.state.search_results.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else if (type === 'none') {
            this.get_tickets();
        }
    }
    search(e) {
        if (e.key === 'Enter') {
            let key = $('.search').val();
            let r = this.state.tickets.filter(ticket => (ticket.title.includes(key) || ticket.priorty.includes(key)
             || ticket.status.includes(key) || ticket.department.includes(key)) && key !== "");
            this.setState({ search_results: r });
            if (r.length === 0) {
                $('.results').hide();
                $('.no-results').show();
            }
        }
    }
    back() {
        this.setState({ search_results: [] });
    }
    showAdd(blogId) {

        this.setState({ shouldShowAdd: true });
    }
    render() {

        if (this.state.shouldShowMain) {

            return (<Viewbtn ticketsId={this.state.ticketsIds} />);
        }
        if (this.state.shouldShowAdd) {

            return (<Viewbtn_add />);
        }
        return (
            <div>
                <Header />

                <div className='row mt-3 container-fluid'>
                    <div className='m-auto col-xl-10 col-lg-10'>
                        <p className='h3'>Tickets</p>
                        <button className='add-blog btn reply-btn' onClick={() => { this.showAdd()}}>Create a ticket</button>
                        <div className='section'>
                            <Dropdown class="mb-5">
                                <Dropdown.Toggle variant="" id="dropdown-basic" className='reply-btn mb-4 mt-4'>
                                    Sort By:
                                </Dropdown.Toggle>
                                {this.state.search_results.length !== 0 && <Dropdown.Menu>
                                    <span className='details m-3'>Sort by</span>
                                    <Dropdown.Item href="#/action-1" onClick={e => this.sort_by(e, 'title')}>title</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'date')}>Recently updated</Dropdown.Item>
                                </Dropdown.Menu>
                                }
                                {this.state.search_results.length === 0 && <Dropdown.Menu>
                                    <span className='details m-3'>Sort by</span>
                                    <Dropdown.Item href="#/action-1" onClick={e => this.sort_by(e, 'title')}>title</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'date')}>Recently updated</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'none')}>Default</Dropdown.Item>
                                </Dropdown.Menu>
                                }
                            </Dropdown>
                            {/* <input disabled type="text" className='search ms-3' placeholder='Search' onKeyPress={e => this.search(e)}></input> */}
                        </div>
                        <table className={"p-5 tab "+ style['style-table']}>
                            <tr>

                                <th>title</th>
                                <th>Priorty</th>
                                <th>Status</th>
                                <th>date</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>

                            {this.state.search_results.length === 0 && this.state.tickets.map(ticket => (
                                <tr className='results'>
                                    <td key={ticket.key}>{ticket.title}</td>
                                    <td key={ticket.key}>{ticket.priorty}</td>
                                    <td key={ticket.key}>{ticket.status}</td>
                                    <td key={ticket.key}>{ticket.createdAt.slice(0, 10)}</td>
                                    <td key={ticket.key}>{ticket.department}</td>
                                    <td><button className='btn view-btn' onClick={() => { this.showAppMain(ticket._id) }}>View</button> <button className='btn del-btn' onClick={() => axios.delete('https://trouble-ticketing-system.herokuapp.com/deleteTicket/' + ticket._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))}

                            {this.state.search_results.map(ticket => (
                                <tr className='results'>
                                    <td key={ticket.key}>{ticket.title}</td>
                                    <td key={ticket.key}>{ticket.priorty}</td>
                                    <td key={ticket.key}>{ticket.status}</td>
                                    <td key={ticket.key}>{ticket.createdAt.slice(0, 10)}</td>
                                    <td key={ticket.key}>{ticket.department}</td>
                                    <td><button className='btn view-btn' onClick={() => { this.showAppMain(ticket._id) }}>View</button> <button className='btn del-btn' onClick={() => axios.delete('https://trouble-ticketing-system.herokuapp.com/deleteTicket/' + ticket._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))}
                        </table>
                        {this.state.search_results.length !== 0 && <p align='center'><button onClick={() => this.back()} className={'view-btn btn mt-2'}>return</button></p>}
                        {this.state.tickets.length === 0 && <p className='h4' align='center'>Couldn't find any tickets</p>}
                        <div className='no-results'><p className='h4 ' align='center'>Couldn't find any results</p>
                            <p align='center'><button className='btn view-btn mt-2' onClick={() => { $('.results').show(); $('.no-results').hide(); }}>return</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Article;