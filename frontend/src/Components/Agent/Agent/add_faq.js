import React from 'react';
import Header from './Header';
import './add.css';
import './ticket.css';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import style from './Agent.module.css'

class Faq extends React.Component {
    handleCreate() {
        let header_in = $('#header-input').val();
        let content_in = $('#content-input').val();
        let department_in = $('#department-input').val();
        let form = new FormData();
        form.append("header", header_in);
        form.append("content", content_in);
        form.append("department", department_in);
        axios.post('https://trouble-ticketing-system.herokuapp.com/createFAQs', form)
            .then((res) => {
                $('#header-input').val('');
                $('#content-input').val('');
                $('#department-input').val('');
                $('.error-message').hide();
                $('.message-wrap').show();
                $('.message').text('Your FAQ was created successfully');
            })
            .catch((errors) => {
                $('.error-message').show();
                $('.er-message').text(errors.response.data);

            });
    }
    render() {
        function back() {
            window.location.reload();
        }
        return (
            <div>
                <Header />
                <div className={style['message-wrap']}>
                    <FontAwesomeIcon icon={faClose} style={{ float: 'right', cursor: 'pointer' }} onClick={() => $('.message-wrap').hide()} />
                    <br></br>
                    <p className={style['message']}></p>
                </div>
                <button className={style['back'] + ' ' + style['btn']} onClick={back} title="back to tickets"><FontAwesomeIcon icon={faAngleLeft} /> </button>
                <div className='row mt-3 container-fluid'>

                    <div className='m-auto col-xl-10 col-lg-10'>
                        <p className='h3'>Create a FAQ</p>
                        <div className={style['error-message']}>
                            <FontAwesomeIcon icon={faClose} style={{ float: 'right', cursor: 'pointer' }} onClick={() => $('.error-message').hide()} />
                            <br></br>
                            <p className={style['er-message']}></p>

                        </div>

                        <div>
                            <p>header</p>
                            <input id='header-input' className={style['in']}></input>
                            <p className={style['error-bag-header']}></p>
                            <p>content</p>
                            <textarea id='content-input' className={style['in']}></textarea>
                            <p className={style['error-bag-content']}></p>
                            <p>department</p>
                            <select id='department-input' className={style['in']}>
                                <option value="Sales">Sales</option>
                                <option value="Tech-Sup">Tech-Sup</option>
                                <option value="Devices-Com">Devices-Com</option>
                                <option value="Devices-TV">Devices-TV</option>
                                <option value="Devices-Mob">Devices-Mob</option>
                                <option value="Devices-Air">Devices-Air</option>
                            </select>
                            <p className={style['error-bag-department']}></p>
                            <p align='center'><button className={style['btn'] + ' ' + style['reply-btn']} onClick={this.handleCreate}>Create</button></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Faq;
