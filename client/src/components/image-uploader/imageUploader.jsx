import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImage, selectFile, clearSelectedFile } from '../../state/actions/action';
import { getBase64 } from '../../helpers';
import { Spinner } from "react-bootstrap";
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    uploadImage: (base64, type, token) => dispatch(uploadImage(base64, type, token)),
    selectFile: (file, base64, type) => dispatch(selectFile(file, base64, type)),
    clearSelectedFile: (type) => dispatch(clearSelectedFile(type))
});


class ImageUploader extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false
        }
    }
    // This component handles image upload for both profile and splash images
    // Selected files are stored in the store

    cancelUploadHandler = () => {
        this.props.clearSelectedFile(this.props.type);
    }

    fileInputChangeHandler = e => {
        let file = e.target.files[0];

        getBase64(file).then(base64 => {
            this.props.selectFile(file, base64, this.props.type);
        }).catch(error => console.log(error));
    }

    fileUploadHandler = () => {
        this.setState({ isLoading: true })
        let base64 = this.props.type === 'PROFILE' ? this.props.user.selectedFileBase64ProfileImg : this.props.user.selectedFileBase64SplashImg;
        let token = sessionStorage.getItem('twitterCloneToken');
        let type = this.props.type;

        this.props.uploadImage(base64, type, token).then(res => {
            if (res.success) {
                this.setState({ isLoading: false });
                // I think browser cache was causing previous image to appear even when
                // new image successfully uploaded.  Force refresh to work around this problem.
                window.location.reload();
            }
        }).catch(error => console.log(error));
    }

    renderBtns = () => {
        let changePhotoBtn = <button className="btn btn-block mt-1 btn-sm btn-primary mb-1" onClick={() => this.fileInput.click()}>Change photo</button>

        if (this.props.type === 'PROFILE' && this.props.user.selectedFileProfileImg) {

            return <React.Fragment>
                {changePhotoBtn}
                {this.state.isLoading ? this.renderLoader() : <button className="btn btn-block btn-sm btn-success mb-1" onClick={this.fileUploadHandler}>Save</button>}
                <button className="btn btn-block btn-sm btn-danger mb-1" onClick={this.cancelUploadHandler}>Cancel</button>
            </React.Fragment>
        } else if (this.props.type === 'SPLASH' && this.props.user.selectedFileSplashImg) {

            return <React.Fragment>
                {changePhotoBtn}
                {this.state.isLoading ? this.renderLoader() : <button className="btn btn-block btn-sm btn-success mb-1" onClick={this.fileUploadHandler}>Save</button>}
                <button className="btn btn-block btn-sm btn-danger my-2" onClick={this.cancelUploadHandler}>Cancel</button>
            </React.Fragment>
        } else {
            return changePhotoBtn
        }
    }

    renderLoader = () => {
        return <div className="text-center my-2"><Spinner
            variant="success"
            animation="border"
            size="sm"
            role="status"
        /></div>
    }

    render() {
        return <div className="d-flex flex-column justify-content-center align-items-center">
            <input type="file"
                style={{ display: 'none' }}
                onChange={this.fileInputChangeHandler}
                ref={fileInput => this.fileInput = fileInput} />

            {this.renderBtns()}

        </div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);