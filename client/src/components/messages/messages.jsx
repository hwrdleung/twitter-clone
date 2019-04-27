import React, { Component } from "react";
import { getMessages, updateMessages } from "../../state/actions/action";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
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
    this.state = {
      showMessageModal: false      
    };
  }

  componentWillMount() {
    this.props
      .getMessages(sessionStorage.getItem("twitterCloneToken"))
      .then(res => {
        console.log(res);
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
        console.log(res);
      })
      .catch(error => console.log(error));
  };

  toggleMessageModal = () => {
    this.setState(state => {
      showMessageModal: !state.showMessageModal;
    });
  };

  markRead = message => {
      if(message.read === false) {
          let data = {
            task : 'READ',
            messageId : message._id
          }

          this.props.updateMessages(data, token).then(res => {
              console.log(res);
          });
      }
  }

  renderMessageModal = message => {
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
          <Modal.Body className="p-0 m-0">
            <p>Date: {message.date}</p>
            <p>From: {message.from}</p>
            <p>Subject: {message.subject}</p>
            <p>{message.body}</p>
          </Modal.Body>
        </div>
      </Modal>
    );
  };

  renderMessages = () => {
    return (
      <React.Fragment>
        <div className="d-flex flex-row justify-centent-start">
          <p>Date</p>
          <p>Sender</p>
          <p>Subject</p>
          <p>Sender</p>
        </div>
        {this.props.user.messages.map(message => (
          <div
            className="d-flex flex-row justify-centent-start"
            onClick={() => {
                this.renderMessageModal(message); 
                this.markRead(message)
            }}
          >
            <p>{message.date}</p>
            <p>{message.from}</p>
            <p>{message.subject}</p>
            <p>{message.body}</p>
            <button
              onClick={() => this.deleteMessageHandler(message)}
              className="btn btn-small btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </React.Fragment>
    );
  };

  render() {
    return <div>{this.user.isLoggedIn ? 
        this.renderMessages() : <p>User is not logged in.</p>}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
