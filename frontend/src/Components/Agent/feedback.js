import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './article.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import axios from 'axios';
import $ from 'jquery';
import { Viewbtn_add_feedback } from './view';
class Feedbacks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
            search_results: [],
            update: false,
            // feedbackIds: '',
            shouldShowMain: false,
            shouldShowAdd:false,
        }
        // this.showAppMain = this.showAppMain.bind(this);
        this.sort_by = this.sort_by.bind(this);
        this.get_feedback = this.get_feedback.bind(this);
        this.search = this.search.bind(this);
    };
    componentDidMount() {
        document.title = "Feedback";
        $('.reply-btn').attr("disabled", true);


    }
    componentWillMount() {
        this.get_feedback();
    }

    get_feedback() {
        axios.get('https://trouble-ticketing-system.herokuapp.com/getAllFeedBack')
            .then((res) => {
                this.setState({ feedbacks: res.data.feedBack });
                $('.search').attr("disabled", false);
                $('.reply-btn').attr("disabled", false);
            })
            .catch((error) => {
                // error.response.status Check status code
            });
    }
    // showAppMain(feedbackId) {

    //     this.setState({ shouldShowMain: true, reportsIds: feedbackId });
    // };
    sort_by(e, type) {
        e.preventDefault();
        this.setState({ update: true });
        if (type === 'title') {
            this.state.feedbacks.sort((a, b) => a.status.localeCompare(b.status));
            this.state.search_results.sort((a, b) => a.status.localeCompare(b.status));
        }
        else if (type === 'date') {
            this.state.feedbacks.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            this.state.search_results.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
        else if (type === 'none') {
            this.get_reports();
        }
    }
    search(e) {
        if (e.key === 'Enter') {
            let key = $('.search').val();
            let r = this.state.feedbacks.filter(feedBack => (feedBack.status.includes(key)) && key !== "");
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
    // showAdd() {

    //     this.setState({ shouldShowAdd: true });
    // }
    render() {

        // if (this.state.shouldShowMain) {

        //     return (<Viewbtn_feedback feedbackId={this.state.feedbackIds} />);
        // }
        // if (this.state.shouldShowAdd) {

        //     return (<Viewbtn_add_feedback />);
        // }
        return (
            <div>
                <Header />

                <div className='row mt-3 container-fluid'>
                    <div className='m-auto col-xl-10 col-lg-10'>
                        <p className='h3'>Feedbacks</p>
                        {/* <button className='add-blog btn reply-btn' onClick={() => { this.showAdd()}}>Create a feedback</button> */}
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
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'date')}>Recently updated</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'none')}>Default</Dropdown.Item>
                                </Dropdown.Menu>
                                }
                            </Dropdown>
                            <input disabled type="text" className='search ms-3' placeholder='Search' onKeyPress={e => this.search(e)}></input>
                        </div>


                        <table className={style['style-table'] + ' m-5'}>
                            <tr>

                                <th>status</th>
                                <th>data</th>
                                {/* <th>Action</th> */}
                            </tr>

                            {this.state.search_results.length === 0 && this.state.feedbacks.map(feedback => (
                                <tr className='results'>
                                    <td key={feedback.key}>{feedback.status}</td>
                                    <td key={feedback.key}>{feedback.createdAt.slice(0, 10)}</td>
                                    {/* <td> <button className='btn del-btn' onClick={() => axios.delete('/deleteReport/' + feedback._id).then((res) => { window.location.reload(); })}>Delete</button></td> */}
                                </tr>
                            ))}

                            {this.state.search_results.map(feedback => (
                                <tr className='results'>
                                    <td key={feedback.key}>{feedback.header}</td>
                                    <td key={feedback.key}>{feedback.createdAt.slice(0, 10)}</td>
                                    {/* <td><button className='btn del-btn' onClick={() => axios.delete('/deleteReport/' + feedback._id).then((res) => { window.location.reload(); })}>Delete</button></td> */}
                                </tr>
                            ))}
                        </table>
                        {this.state.search_results.length !== 0 && <p align='center'><button onClick={() => this.back()} className={'view-btn btn mt-2'}>return</button></p>}
                        {this.state.feedbacks.length === 0 && <p className='h4' align='center'>Couldn't find any reports</p>}
                        <div className='no-results'><p className='h4 ' align='center'>Couldn't find any results</p>
                            <p align='center'><button className='btn view-btn mt-2' onClick={() => { $('.results').show(); $('.no-results').hide(); }}>return</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Feedbacks;