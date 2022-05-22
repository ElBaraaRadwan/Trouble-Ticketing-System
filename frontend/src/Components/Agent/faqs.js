import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './article.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import axios from 'axios';
import $ from 'jquery';
import { Viewbtn_blogs } from './view';
import { Viewbtn_add_blog } from './view';
import style from './Agent.module.css'

class Faqs extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            blogs: [],
            search_results: [],
            blogIds: '',
            update: false,
            shouldShowMain: false,
            shouldShowAdd:false,
        }
        this.showAppMain = this.showAppMain.bind(this);
        this.sort_by = this.sort_by.bind(this);
        this.get_blogs = this.get_blogs.bind(this);
        this.search = this.search.bind(this);
        this.showAdd = this.showAdd.bind(this);
    };
    componentDidMount() {
        document.title = "FAQs";
        $('.reply-btn').attr("disabled", true);


    }
    componentWillMount() {
        this.get_blogs();
    }

    get_blogs() {
        axios.get('https://trouble-ticketing-system.herokuapp.com/getAllFAQs')
            .then((res) => {
                this.setState({ blogs: res.data.faq });
                $('.search').attr("disabled", false);
                $('.reply-btn').attr("disabled", false);
            })
            .catch((error) => {
                // error.response.status Check status code
            });
    }
    
    sort_by(e, type) {
        e.preventDefault();
        this.setState({ update: true });
        if (type === 'title') {
            this.state.blogs.sort((a, b) => a.header.localeCompare(b.header));
            this.state.search_results.sort((a, b) => a.header.localeCompare(b.header));
        }
        else if (type === 'date') {
            this.state.blogs.sort(function (a, b) {
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
            let r = this.state.blogs.filter(blog => (blog.header.includes(key)
                || blog.department.includes(key)) && key !== "");
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
    showAppMain(blogId) {

        this.setState({ shouldShowMain: true, blogIds: blogId });
    };
    showAdd(blogId) {

        this.setState({ shouldShowAdd: true });
    }
    render() {
        if (this.state.shouldShowMain) {

            return (<Viewbtn_blogs blogId={this.state.blogIds} />);
        }
        if (this.state.shouldShowAdd) {

            return (<Viewbtn_add_blog />);
        }
        return (
            <div>
                <Header />
                <div className='row mt-3 container-fluid'>
                    <div className='m-auto col-xl-10 col-lg-10'>
                        <p className='h3'>FAQs</p>
                        <button className='add-blog btn reply-btn'
                         onClick={() => { this.showAdd()}}>Create a FAQ</button>
                        <div className='section'>
                            <Dropdown >
                                <Dropdown.Toggle variant="" id="dropdown-basic" className='reply-btn   mb-4 mt-4'>
                                    Sort By:
                                </Dropdown.Toggle>
                                {this.state.search_results.length !== 0 && <Dropdown.Menu>
                                    <span className={style['details'] + ' m-3'}>Sort by</span>
                                    <Dropdown.Item href="#/action-1" onClick={e => this.sort_by(e, 'title')}>title</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'date')}>Recently updated</Dropdown.Item>
                                </Dropdown.Menu>
                                }
                                {this.state.search_results.length === 0 && <Dropdown.Menu>
                                    <span className={style['details'] + ' m-3'}>Sort by</span>
                                    <Dropdown.Item href="#/action-1" onClick={e => this.sort_by(e, 'title')}>title</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'date')}>Recently updated</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={e => this.sort_by(e, 'none')}>Default</Dropdown.Item>
                                </Dropdown.Menu>
                                }
                            </Dropdown>
                            <input disabled type="text" className='search ms-3' placeholder='Search' onKeyPress={e => this.search(e)}></input>
                        </div>


                        <table className={style["style-table"]}>
                            <tr>
                                <th>Header</th>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>

                            {this.state.search_results.length === 0 && this.state.blogs.map(blog => (
                                <tr className={style['results']}>
                                    <td key={blog.key}>{blog.header}</td>
                                    <td key={blog.key}>{blog.department}</td>
                                    <td key={blog.key}>{blog.createdAt.slice(0, 10)}</td>
                                    <td><button className='btn view-btn' onClick={() => { this.showAppMain(blog._id) }}>View</button> <button className='btn del-btn' onClick={() => axios.delete('https://trouble-ticketing-system.herokuapp.com/deleteFAQs/' + blog._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))}

                            {this.state.search_results.map(blog => (
                                <tr className={style['results']}>
                                    <td key={blog.key}>{blog.header}</td>
                                    <td key={blog.key}>{blog.content}</td>
                                    <td key={blog.key}>{blog.department}</td>
                                    <td key={blog.key}>{blog.createdAt.slice(0, 10)}</td>
                                    <td><button className={'btn ' + style['view-btn']} onClick={() => { this.showAppMain(blog._id) }}>View</button> <button className='btn del-btn' onClick={() => axios.delete('https://trouble-ticketing-system.herokuapp.com/deleteFAQs/' + blog._id).then((res) => { window.location.reload(); })}>Delete</button></td>
                                </tr>
                            ))}
                        </table>
                        {this.state.search_results.length !== 0 && <p align='center'><button onClick={() => this.back()} className={'view-btn btn mt-2'}>return</button></p>}
                        {this.state.blogs.length === 0 && <p className='h4' align='center'>Couldn't find any tickets</p>}
                        <div className={style['no-results']}><p className='h4 ' align='center'>Couldn't find any results</p>
                            <p align='center'><button className={'btn mt-2 ' + style['view-btn']} onClick={() => { $('.results').show(); $('.no-results').hide(); }}>return</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Faqs;