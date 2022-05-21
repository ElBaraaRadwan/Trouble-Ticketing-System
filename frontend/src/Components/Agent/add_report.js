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

class Addreport extends React.Component {
    handleCreate()
    {
        let header_in=$('#header-input').val();
        let content_in=$('#content-input').val();
        let form = new FormData();
            form.append("header",header_in);
            form.append("content",content_in);
       axios.post('/createReport',form)
      .then((res) => {
          $('#header-input').val('');
          $('#content-input').val('');
          $('.error-message').hide();
        $('.message-wrap').show();
        $('.message').text('Your report was created successfully');
      })
      .catch((errors) => {
        $('.error-message').show();
        $('.er-message').text(errors);
        
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
                    <button className='back btn' onClick={back} title="back to tickets"><FontAwesomeIcon icon={faAngleLeft} /> </button>
                <div className='row mt-3 container-fluid'>
                    
                    <div className='m-auto col-xl-10 col-lg-10'>
                    <p className='h3'>Create a report</p>
                    <div className='error-message'>
                        <FontAwesomeIcon icon={faClose} style={{ float: 'right', cursor: 'pointer' }} onClick={() => $('.error-message').hide()} />
                        <br></br>
                            <p className='er-message'></p>

                        </div>
                        
                        <div>
                        <p>header</p>
                            <input id='header-input' className='in'></input>
                            <p className='error-bag-header'></p>
                            <p>content</p>
                            <textarea id='content-input' className='in'></textarea>
                            <p className='error-bag-content'></p>
                            <p align='center'><button className='btn reply-btn' onClick={this.handleCreate}>Create</button></p>
                                </div>
                        </div>
                        </div>
                </div>
                );
    }
}
export default Addreport;
