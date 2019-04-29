import React, { Component } from "react";
import { getMessages, updateMessages } from "../../state/actions/action";
import { connect } from "react-redux";
import { Modal, Spinner } from "react-bootstrap";
import { getFormattedDate } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./style.css";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getMessages: token => dispatch(getMessages(token)),
  updateMessages: (data, token) => dispatch(updateMessages(data, token))
});

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      showMessageModal: false,
      messages: [],
      currentMessage: {},
      isLoading: true
    };
  }

  componentWillMount() {
    this.props
      .getMessages(sessionStorage.getItem("twitterCloneToken"))
      .then(res => {
        this.setState({ messages: res.body.messages, isLoading: false })
      })
      .catch(error => console.log(error));
  }

  deleteMessageHandler = message => {
    let data = {
      task: "DELETE",
      messageId: message._id
    };

    let token = sessionStorage.getItem("twitterCloneToken");

    this.props
      .updateMessages(data, token)
      .then(res => {
        this.setState({ messages: res.body.messages })
      })
      .catch(error => console.log(error));
  };

  toggleMessageModal = (message) => {
    this.setState(state => ({
      showMessageModal: !state.showMessageModal,
      currentMessage: message ? message : {}
    }));
  };

  markRead = message => {
    if (message.read === false) {
      let data = {
        task: 'READ',
        messageId: message._id
      }
      let token = sessionStorage.getItem('twitterCloneToken');

      this.props.updateMessages(data, token).then(res => {
        this.setState({ messages: res.body.messages });
      });
    }
  }

  renderMessageModal = () => {
    return (
      <Modal
        centered
        className="px-auto mx-auto"
        show={this.state.showMessageModal}
        onHide={this.toggleMessageModal}
      >
        <div className="modal-content overflow-hidden">
          <Modal.Header className="m-0 px-2 py-1">
            <Modal.Title className="h5">View Message</Modal.Title>
            <button
              type="button"
              className="close"
              onClick={this.toggleMessageModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <Modal.Body className="p-3 m-0">
            <p className="my-0"><span className="font-weight-bold">Date:</span> {getFormattedDate(this.state.currentMessage.date)}</p>
            <p className="my-0"><span className="font-weight-bold">From:</span> {this.state.currentMessage.from}</p>
            <p className="my-0"><span className="font-weight-bold">Subject:</span> {this.state.currentMessage.subject}</p>
            <p className="py-3">{this.state.currentMessage.body}</p>
          </Modal.Body>
        </div>
      </Modal>
    );
  };

  getMessageBgColor = (read) => {
    switch (read) {
      case true:
        return { backgroundColor: '#ebebeb' }
        break;
      case false:
        return { backgroundColor: 'none' }
        break;
    }
  }

  renderMessages = () => {
    if (this.state.isLoading) {
      return <div className="container text-center py-4"><Spinner animation="border" variant="primary" /></div>
    }

    if (this.state.messages.length === 0) {
      return <div className="container"><p className="font-italic text-secondary text-center py-4">You have no messages.</p></div>
    } else {
      return (
        <div id="messages-container">
          {this.state.messages.map(message => (
            <React.Fragment>
              <div
                style={this.getMessageBgColor(message.read)}
                className="row m-0 p-0 d-flex message-row flex-row flex-nowrap justify-content-start align-items-center"
                onClick={() => {
                  this.toggleMessageModal(message);
                  this.markRead(message)
                }}
              >
                <p className="col-md-3 m-0 px-2 py-1 small message-date">{getFormattedDate(message.date)}</p>
                <p className="col-md-3 m-0 p-1 message-from">{message.from}</p>
                <p className="col-md-5 m-0 p-1 message-subject">{message.subject}</p>

                <FontAwesomeIcon icon={['fas', 'trash']} onClick={() => this.deleteMessageHandler(message)}
                  className="col-md-1 mr-2 p-0 clickable trash-icon" />
              </div>

            </React.Fragment>
          ))}
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
        <h5>Messages:</h5>
        <div className="bg-light shadow">
          <div id="messages-container-header-bar" className="row row m-0 p-0 d-flex flex-row flex-nowrap justify-content-start align-items-center">
            <p className="col-md-3 m-0 p-2 font-weight-bold">Date</p>
            <p className="col-md-3 m-0 p-2 font-weight-bold">Sender</p>
            <p className="col-md-5 m-0 p-2 font-weight-bold">Subject</p>
          </div>

          {this.renderMessages()}
        </div>
        {this.renderMessageModal()}
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
