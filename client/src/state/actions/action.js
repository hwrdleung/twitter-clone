import axios from 'axios';

export const action = (str) => dispatch => {
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: str
    })
}

export const login = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('api/auth/login', data).then(res => {
            if (res.data.success) {
                sessionStorage.setItem('twitterCloneToken', res.data.body.token)
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body.user
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const logout = (data) => dispatch => {
    dispatch({
        type: 'CLEAR_USER_STATE'
    })
}

export const register = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('api/auth/register', data).then(res => {
            if (res.data.success) {
                sessionStorage.setItem('twitterCloneToken', res.data.body.token)
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body.user
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getProfileData = (username) => dispatch => {
    console.log(username)
    return new Promise((resolve, reject) => {
        axios.get('../api/public/' + username).then(res => {
            console.log(res.data);
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_PROFILE_STATE',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getUserData = (token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.get('api/user/getUserData', { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                });
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const updateUserData = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-headers': token
        }

        axios.put('/api/user/updateUserData', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const changePassword = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-headers': token
        }

        axios.put('/api/user/updateUserData', data, { headers }).then(res => {
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getFeed = (token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-headers': token
        }

        axios.get('/api/user/getFeed', { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_FEED',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const tweet = (data, token) => dispatch => {
    console.log(token)
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }
        console.log('making post request to server')
        axios.post('/api/user/tweet', data, { headers }).then(res => {
            console.log(res.data)
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}


export const like = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.post('/api/user/like', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_TWEET',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const reply = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-headers': token
        }

        axios.post('/api/user/reply', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_PROFILE_STATE',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const follow = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-headers': token
        }

        axios.post('/api/user/follow', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_PROFILE_STATE',
                    payload: res.data.body
                })
                resolve(res.data);
            }
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}