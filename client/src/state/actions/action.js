import axios from 'axios';

export const setCurrentView = (view, isUser) => dispatch => {
    if (isUser) {
        dispatch({
            type: 'SET_USER_CURRENT_VIEW',
            payload: view
        })
    } else {
        dispatch({
            type: 'SET_PROFILE_CURRENT_VIEW',
            payload: view
        })
    }
}

export const login = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', data).then(res => {
            if (res.data.success) {
                sessionStorage.setItem('twitterCloneToken', res.data.body.token)
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body.user
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const logout = (token) => dispatch => {
    console.log('logging out')
    let headers = {
        'x-auth-token': token
    }

    return new Promise((resolve, reject) => {
        axios.post('/api/auth/logout', {}, { headers }).then(res => {
            console.log(res.data)

            if (res.data.success) {
                sessionStorage.removeItem('twitterCloneToken')
                dispatch({
                    type: 'CLEAR_USER_STATE'
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const register = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/auth/register', data).then(res => {
            console.log(res.data);
            if (res.data.success) {
                sessionStorage.setItem('twitterCloneToken', res.data.body.token)
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body.user
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getProfileData = (username) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/public/' + username).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_PROFILE_STATE',
                    payload: res.data.body
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getUserData = (token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.get('/api/user/getUserData', { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                });
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const updateUserData = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.put('/api/user/updateUserData', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const changePassword = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.put('/api/user/changePassword', data, { headers }).then(res => {
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getFeed = (token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.get('/api/user/getFeed', { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_FEED',
                    payload: res.data.body
                })
            }
            resolve(res.data);
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
            }
            resolve(res.data);
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
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const reply = (data, token) => dispatch => {
    console.log('reply action')
    console.log(token)
    console.log(data)
    let headers = {
        'x-auth-token': token
    }

    return new Promise((resolve, reject) => {
        axios.post('/api/user/reply', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_TWEET',
                    payload: res.data.body
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const follow = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.post('/api/user/follow', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_PROFILE_STATE',
                    payload: res.data.body.profile
                });

                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body.user
                });
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const followRequestResponse = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.post('/api/user/followRequestResponse', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getMessages = (token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.get('/api/user/messages', { headers }).then(res => {
            if (res.data.success) {
                let payload = {
                    stats: res.data.body.stats,
                    messages: res.data.body.messages
                }
                dispatch({
                    type: 'UPDATE_USER_MESSAGES',
                    payload: payload
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const updateMessages = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }

        axios.post('/api/user/messages', data, { headers }).then(res => {
            if (res.data.success) {
                let payload = {
                    stats: res.data.body.stats,
                    messages: res.data.body.messages
                }
                dispatch({
                    type: 'UPDATE_USER_MESSAGES',
                    payload: payload
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}



