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

class Ticket extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ticket: [],
      update_ticket: false,
      selected_tab: "update",

    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.load_ticket = this.load_ticket.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
  }
  componentDidMount() {
    document.title = "view ticket";
    this.load_ticket();
  }
  componentDidUpdate(PrevProps, prevState) {
    $("#" + prevState.selected_tab).removeClass("selected-tab");
    $("#" + this.state.selected_tab).addClass("selected-tab");
    $("#" + prevState.selected_tab + "-section").hide();
    $("#" + this.state.selected_tab + "-section").show();
  }
  load_ticket() {
    axios.get('https://trouble-ticketing-system.herokuapp.com/getTicket/' + this.props.ticket_id)
      .then((res) => {
        this.setState({ ticket: res.data.ticket });

      })
      .catch((error) => {
        // error.response.status Check status code
      });
    $("#" + this.state.selected_tab).addClass("selected-tab");
    $("#seo-section").hide();

  }
  handleUpdate() {
    let title_in = $('#title-input').val();
    let des_in = $('#description-input').val();

    axios.patch('https://trouble-ticketing-system.herokuapp.com/updateTicket/' + this.props.ticket_id, {
      title: title_in,
      description: des_in
    })
      .then((res) => {
        $('.error-bag-title').text(" ");
        $('.error-bag-des').text(" ");
        //I want to refresh the component on update success
        title_in = $('#title-input').val('');
        $('#description-input').val('');
        $('.message-wrap').show();
        $('.message').text('Your update was successfull');
        this.load_ticket();
      })
      .catch((errors) => {
        $('.error-bag-title').text(" ");
        $('.error-bag-des').text(" ");
        if (errors.response.data.errors.title != null) {
          $('.error-bag-title').text(errors.response.data.errors.title.message);
        }
        if (errors.response.data.errors.description != null) {
          $('.error-bag-des').text(errors.response.data.errors.description.message);
        }
        // error.response.status Check status code sxsw
      });
  }
  handleReply() {
    let reply_in = $('#reply-input').val();
    axios.patch('https://trouble-ticketing-system.herokuapp.com/solveTicket/' + this.props.ticket_id, {
      reply: reply_in,
    })
      .then((res) => {
        $('.message-wrap').show();
        $('.message').text('Your reply was successfull');
        $('#reply-input').val(" ");
        this.load_ticket();
      })
      .catch((errors) => {
        console.log(errors);
      })

  }
  handleAssign() {
    let priorty_in = $('#priorty-input').val();
    let status_in = $('#status-input').val();
    axios.patch('https://trouble-ticketing-system.herokuapp.com/assignTicket/' + this.props.ticket_id, {
      priorty: priorty_in,
      status: status_in
    })
      .then((res) => {
        $('.message-wrap').show();
        $('.message').text('Your assign was successfull');
        $('#priorty-input').val(" ");
        $('#status-input').val(" ");
        this.load_ticket();
      })
      .catch((errors) => {
        $('.error-bag-priorty').text(" ");
        $('.error-bag-status').text(" ");
        if (errors.response.data.errors.priorty != null) {
          $('.error-bag-priorty').text(errors.response.data.errors.priorty.message);
        }
        if (errors.response.data.errors.status != null) {
          $('.error-bag-status').text(errors.response.data.errors.status.message);
        }
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

            {/* <div className='ticket-message'>
              <h3>{this.state.ticket.title}</h3>
              <p>{this.state.ticket.description}</p>
            </div> */}
            <div>
              <p className='details'><span>created at: {this.state.ticket.createdAt}</span><span>priorty: {this.state.ticket.priorty}</span>
                <span>status: {this.state.ticket.status}</span><span>department: {this.state.ticket.department}</span></p>
                <p><span className='details'>Reply:<br></br> {this.state.ticket.reply}</span></p>
            </div>
            <hr></hr>
            <div className='task-tabs mt-2 p-5'>
              <span id='update' onClick={() => this.setState({ selected_tab: 'update' })} >Update</span>
              <span id='reply' onClick={() => this.setState({ selected_tab: 'reply' })}>Reply</span>
              <span id='assign' onClick={() => this.setState({ selected_tab: 'assign' })}>Assign</span>
              <hr></hr>
            </div>
            <button className={style['back'] + ' ' + style['btn']} onClick={back} title="back to tickets"><FontAwesomeIcon icon={faAngleLeft} /> </button>
            <div id='reply-section'>
              <div>
                <textarea row="10" placeholder=" Write a reply." className='text-area' id='reply-input'></textarea>
              </div>
              {/* <input type="file" id="myfile" name="myfile" ></input>
        <span className='attachment ' onClick={() => $('#myfile').click()}> <FontAwesomeIcon icon={faPaperclip} /> Add attachment</span>
        */}
              <p align='center'><button className='btn reply-btn' onClick={this.handleReply}>reply</button></p>
            </div>
            <div id='update-section'>
              {/* <p>title</p>
              <input id='title-input' ></input> */}
              <p className='error-bag-title'></p>
              <p className='mt-1'>description</p>
              <textarea row='10' className='text-area' id='description-input' ></textarea>
              <p className='error-bag-des'></p>
              <p align='center'><button className='btn reply-btn' onClick={this.handleUpdate}>Update</button></p>
            </div>
            <div id='assign-section'>
            <p>priorty</p>
                            <select id='priorty-input' className='in'>
                            <option value="Undecided">Undecided</option>
                            <option value="Low">Low</option>
                            <option value="Mediem">Mediem</option>
                            <option value="High">High</option>
                            </select>
              <p className='error-bag-priorty'></p>
              <p>status</p>
                            <select id='status-input' className='in'>
                            <option value="Undecided">Undecided</option>
                            <option value="Pending">Pending</option>
                            <option value="Solved">Solved</option>
                            <option value="Closed">Closed</option>
                            </select>
              <p className='error-bag-status'></p>

              <p align='center'><button className='btn reply-btn' onClick={this.handleAssign}>Assign</button></p>


            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Ticket;