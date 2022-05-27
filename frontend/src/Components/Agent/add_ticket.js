import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';
import './add.css';
import './ticket.css';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import style from './Agent.module.css'


class Add extends React.Component {
    handleCreate()
    {
        let title_in=$('#title-input').val();
        let description_in=$('#description-input').val();
        let priorty_in=$('#priorty-input').val();
        let status_in=$('#status-input').val();
        let department_in=$('#department-input').val();
        let form = new FormData();
            form.append("title",title_in);
            form.append("description",description_in);
            form.append("department",department_in);
            // form.append("priorty",priorty_in);
            // form.append("status",status_in);
       axios.post('https://trouble-ticketing-system.herokuapp.com/createTicket',form)
      .then((res) => {
        $('#title-input').val('');
        $('#description-input').val('');
        $('#department-input').val('');
        // $('#priorty-input').val('');
        // $('#status-input').val('');
        $('.error-message').hide();
        $('.message-wrap').show();
        $('.message').text('Your ticket was created successfully');
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
                        <p className='h3'>Create a Ticket</p>
                        <div className={style['error-message']}>
                        <FontAwesomeIcon icon={faClose} style={{ float: 'right', cursor: 'pointer' }} onClick={() => $('.error-message').hide()} />
                        <br></br>
                            <p className={style['er-message']}></p>

                        </div>
                        <div>
                        <p>title</p>
                            <input id='title-input' className={style['in']}></input>
                            <p>description</p>
                            <textarea id='description-input' className={style['in']}></textarea>
                            <p>department</p>
                            <select id='department-input' className={style['in']}>
                            <option value="Sales">Sales</option>
                            <option value="Tech-Sup">Tech-Sup</option>
                            <option value="Devices-Com">Devices-Com</option>
                            <option value="Devices-TV">Devices-TV</option>
                            <option value="Devices-Mob">Devices-Mob</option>
                            <option value="Devices-Air">Devices-Air</option>
                            </select>
                            {/* <p>priorty</p>
                            <select id='priorty-input' className='in'>
                            <option value="Undecided">Undecided</option>
                            <option value="Low">Low</option>
                            <option value="Mediem">Mediem</option>
                            <option value="High">High</option>
                            </select>
                            <p>status</p>
                            <select id='status-input' className='in'>
                            <option value="Undecided">Undecided</option>
                            <option value="Pending">Pending</option>
                            <option value="Solved">Solved</option>
                            <option value="Closed">Closed</option>
                            </select> */}
                            <p align='center'><button className={style['btn'] + ' ' + style['reply-btn']  + ' ' + 'mt-2'} onClick={this.handleCreate}>Create</button></p>
                        </div>
                        </div>
                        </div>
                </div>
                );
    }
}
export default Add;
