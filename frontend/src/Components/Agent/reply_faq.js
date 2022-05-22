import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';
import './ticket.css';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import style from './Agent.module.css'


class Blog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Blog: [],
            update_blog: false,
            selected_tab: "update",

        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.load_blog = this.load_blog.bind(this);
    }
    componentDidMount() {
        document.title = "view blog";
        this.load_blog();
    }
    componentDidUpdate(PrevProps, prevState) {
        $("#" + prevState.selected_tab).removeClass("selected-tab");
        $("#" + this.state.selected_tab).addClass("selected-tab");
        $("#" + prevState.selected_tab + "-section").hide();
        $("#" + this.state.selected_tab + "-section").show();
    }
    load_blog() {
        axios.get('https://trouble-ticketing-system.herokuapp.com/getFAQs/' + this.props.blog_id)
            .then((res) => {
                this.setState({ Blog: res.data.faq });

            })
            .catch((error) => {
                // error.response.status Check status code
            });
        $("#" + this.state.selected_tab).addClass("selected-tab");
        $("#seo-section").hide();

    }
    handleUpdate() {
        let title_in = $('#header-input').val();
        let con_in = $('#content-input').val();
        let dep_in = $('#department-input').val();

        axios.patch('https://trouble-ticketing-system.herokuapp.com/updateFAQs/' + this.props.blog_id, {
            header: title_in,
            content: con_in,
            department: dep_in
        })
            .then((res) => {
                $('.error-bag-header').text(" ");
                $('.error-bag-con').text(" ");
                $('.error-bag-dep').text(" ");
                //I want to refresh the component on update success
                $('#header-input').val('');
                $('#content-input').val('');
                $('#department-input').val('');
                $('.message-wrap').show();
                $('.message').text('Your update was successfull');
                this.load_blog();
            })
            .catch((errors) => {
                $('.error-bag-header').text(" ");
                $('.error-bag-con').text(" ");
                $('.error-bag-dep').text(" ");
                if (errors.response.data.errors.header != null) {
                    $('.error-bag-title').text(errors.response.data.errors.header.message);
                }
                if (errors.response.data.errors.content != null) {
                    $('.error-bag-con').text(errors.response.data.errors.content.message);
                }
                if (errors.response.data.errors.department != null) {
                    $('.error-bag-dep').text(errors.response.data.errors.department.message);
                }
                // error.response.status Check status code sxsw
            });
    }
    render() {
        function back() {
            window.location.reload();
        }

        return (
            <div>

                <Header />
                <div className='message-wrap'>
                    <FontAwesomeIcon icon={faClose} style={{ float: 'right', cursor: 'pointer' }} onClick={() => $('.message-wrap').hide()} />
                    <br></br>
                    <p className='message'></p>
                </div>
                <div className='row mt-3 container-fluid'>
                    <div className='m-auto col-xl-10 col-lg-10'>

                        <div className='ticket-message'>
                            <h3>{this.state.Blog.header}</h3>
                            <p>{this.state.Blog.content}</p>
                        </div>
                        <div>
                            <p className='details'><span>created at: {this.state.Blog.createdAt}</span>
                                <span>department: {this.state.Blog.department}</span></p>
                        </div>
                        <hr></hr>
                        <div className='task-tabs mt-2 p-5'>
                            <span id='update' onClick={() => this.setState({ selected_tab: 'update' })} >Update</span>
                            <hr></hr>
                        </div>
                        <button className={style['back'] + ' ' + style['btn']} onClick={back} title="back to tickets"><FontAwesomeIcon icon={faAngleLeft} /> </button>

                        <div id='update-section'>
                            <p>header</p>
                            <input id='header-input' ></input>
                            <p className='error-bag-header'></p>
                            <p>content</p>
                            <textarea id='content-input' ></textarea>
                            <p className='error-bag-con'></p>
                            <p>department</p>
                            <select id='department-input' className='in'>
                            <option value="Sales">Sales</option>
                            <option value="Tech-Sup">Tech-Sup</option>
                            <option value="Devices-Com">Devices-Com</option>
                            <option value="Devices-TV">Devices-TV</option>
                            <option value="Devices-Mob">Devices-Mob</option>
                            <option value="Devices-Air">Devices-Air</option>
                            </select>
                            <p className='error-bag-dep'></p>
                            <p align='center'><button className='btn reply-btn' onClick={this.handleUpdate}>Update</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Blog;