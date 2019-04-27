import React, { Component } from 'react';
import { getMessages, updateMessages } from '../../state/actions/action';
import { connect } from 'react-redux';
import './style.css';

const mapStateToProps = state => ({
    ...state
  });
  
  const mapDispatchToProps = dispatch => ({
      getMessages : (token) => dispatch(getMessages(token)),
      updateMessages : (data, token) => dispatch(updateMessages(data, token))
  });
  

class Messages extends Component {
    componentWillMount(){
        // 
    }

    deleteMessageHandler = () => {

    }

    renderMessageModal = () => {

    }

    render() {
        return (
            <h1>MESSAGES</h1>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
