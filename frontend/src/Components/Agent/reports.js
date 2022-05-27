import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './article.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import axios from 'axios';
import $ from 'jquery';
import { Viewbtn_add_report,Viewbtn_report } from './view';
import style from './Agent.module.css'

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            search_results: [],
            update: false,
            reportsIds: '',
            shouldShowMain: false,
            shouldShowAdd:false,
        }
        this.showAppMain = this.showAppMain.bind(this);
        this.sort_by = this.sort_by.bind(this);
        this.get_reports = this.get_tickets.bind(this);
        this.search = this.search.bind(this);
    };
    componentDidMount() {
        document.title = "Reports";
        $('.reply-btn').attr("disabled", true);


    }
    componentWillMount() {
        this.get_reports();
    }

    get_tickets() {
        axios.get('https://trouble-ticketing-system.herokuapp.com/getAllReports')
            .then((res) => {
                this.setState({ reports: res.data.report });
                $('.search').attr("disabled", false);
                $('.reply-btn').attr("disabled", false);
            })
            .catch((error) => {
                // error.response.status Check status code
            });
    }
    showAppMain(reportsId) {

        this.setState({ shouldShowMain: true, reportsIds: reportsId });
    };
    sort_by(e, type) {
        e.preventDefault();
        this.setState({ update: true });
        if (type === 'title') {
            this.state.reports.sort((a, b) => a.header.localeCompare(b.header));
            this.state.search_results.sort((a, b) => a.header.localeCompare(b.header));
        }
        // else if (type === 'date') {
        //     this.state.reports.sort(function (a, b) {
        //         return new Date(b.createdAt) - new Date(a.createdAt);
        //     });
        //     this.state.search_results.sort(function (a, b) {
        //         return new Date(b.createdAt) - new Date(a.createdAt);
        //     });
        // }
        else if (type === 'none') {
            this.get_reports();
        }
    }
    search(e) {
        if (e.key === 'Enter') {
            let key = $('.search').val();
            let r = this.state.reports.filter(report => (report.header.includes(key)) && key !== "");
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

            return (<Viewbtn_report reportsId={this.state.reportsIds} />);
        }
        if (this.state.shouldShowAdd) {

            return (<Viewbtn_add_report />);
        }
        return (
            <div>
                <Header />

                <div className='row mt-3 container-fluid'>
                    <div className='m-auto col-xl-10 col-lg-10'>
                        <p className='h3'>Reports</p>
                        <button className='add-blog btn reply-btn' onClick={() => { this.showAdd()}}>Create a report</button>
                        <div className='section'>

                            <Dropdown >
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
                                    {/* <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'date')}>Recently updated</Dropdown.Item> */}
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'none')}>Default</Dropdown.Item>
                                </Dropdown.Menu>
                                }
                            </Dropdown>
                            <input disabled type="text" className='search ms-3' placeholder='Search' onKeyPress={e => this.search(e)}></input>
                        </div>


                        <table className={style['style-table']}>
                            <tr>

                                <th>header</th>
                                <th>content</th>
                                <th>Action</th>
                            </tr>

                            {this.state.search_results.length === 0 && this.state.reports.map(report => (
                                <tr className='results'>
                                    <td key={report.key}>{report.header}</td>
                                    <td key={report.key}>{report.content}</td>
                                    <td> <button className='btn del-btn' onClick={() => axios.delete('https://trouble-ticketing-system.herokuapp.com/deleteReport/' + report._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))}

                            {this.state.search_results.map(report => (
                                <tr className='results'>
                                    <td key={report.key}>{report.header}</td>
                                    <td key={report.key}>{report.content}</td>
                                    <td><button className='btn del-btn' onClick={() => axios.delete('https://trouble-ticketing-system.herokuapp.com/deleteReport/' + report._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))}
                        </table>
                        {this.state.search_results.length !== 0 && <p align='center'><button onClick={() => this.back()} className={'view-btn btn mt-2'}>return</button></p>}
                        {this.state.reports.length === 0 && <p className='h4' align='center'>Couldn't find any reports</p>}
                        <div className='no-results'><p className='h4 ' align='center'>Couldn't find any results</p>
                            <p align='center'><button className='btn view-btn mt-2' onClick={() => { $('.results').show(); $('.no-results').hide(); }}>return</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Reports;