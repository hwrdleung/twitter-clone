import axios from 'axios';

export const setCurrentView = (view, isDashboard) => dispatch => {
    if (isDashboard) {
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
    let headers = {
        'x-auth-token': token
    }

    return new Promise((resolve, reject) => {
        axios.post('/api/auth/logout', {}, { headers }).then(res => {

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

export const clearUserState = () => dispatch => {
    dispatch({
        type: 'CLEAR_USER_STATE'
    })
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

export const deleteAccount = (data, token) => dispatch => {
    let headers = {
        'x-auth-token': token
    }

    return new Promise((resolve, reject) => {
        axios.post('/api/auth/deleteAccount', data, { headers }).then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'CLEAR_USER_STATE',
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const getProfileData = (username, token) => dispatch => {
    let headers = {
        'x-auth-token': token
    }
    return new Promise((resolve, reject) => {
        axios.get('/api/public/' + username, { headers }).then(res => {
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
                    type: 'UPDATE_USER_STATE',
                    payload: res.data.body
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const tweet = (data, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }
        axios.post('/api/user/tweet', data, { headers }).then(res => {
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

export const deleteTweet = (data, token, isDashboard) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }
        axios.post('/api/user/deleteTweet', data, { headers }).then(res => {
            if (res.data.success) {
                if (isDashboard) {
                    dispatch({
                        type: 'UPDATE_USER_STATE',
                        payload: res.data.body
                    })
                } else {
                    dispatch({
                        type: 'UPDATE_PROFILE_STATE',
                        payload: res.data.body
                    })
                }
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

export const getUserCards = (usernames, isDashboard, key) => dispatch => {
    // get user cards from server and return res
    return new Promise((resolve, reject) => {
        if (usernames.length === 0) {
            if (isDashboard) {
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: {
                        [key]: []
                    }
                });
            } else {
                dispatch({
                    type: 'UPDATE_PROFILE_STATE',
                    payload: {
                        [key]: []
                    }
                })
            }
            resolve('No Usercards')
        } else {
            axios.put('/api/public/getUserCards', { usernames: usernames }).then(res => {
                if (res.data.success) {
                    if (isDashboard) {
                        dispatch({
                            type: 'UPDATE_USER_STATE',
                            payload: {
                                [key]: res.data.body
                            }
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_PROFILE_STATE',
                            payload: {
                                [key]: res.data.body
                            }
                        })
                    }
                }
                resolve(res);
            }).catch(error => console.log(error));
        }
    });
}

export const uploadImage = (base64, type, token) => dispatch => {
    return new Promise((resolve, reject) => {
        let headers = {
            'x-auth-token': token
        }
        /*
         data = {
             type: 'PROFILE'  OR 'SPLASH
             base64: file from file input
         }
        */

        let data = {
            type: type,
            base64: base64.toString()
        }
        console.log(data);

        axios.post('/api/images/uploadImage', data, { headers }).then(res => {
            if (res.data.success) {
                let payload = { ...res.data.body };
                if (type === 'PROFILE') {
                    payload.selectedFileProfileImg = null;
                    payload.selectedFileBase64ProfileImg = null;
                } else {
                    payload.selectedFileSplashImg = null;
                    payload.selectedFileBase64SplashImg = null;
                }
                console.log(payload);
                dispatch({
                    type: 'UPDATE_USER_STATE',
                    payload: payload
                })
            }
            resolve(res.data);
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
}

export const selectFile = (file, base64, type) => dispatch => {
    let payload = null;

    switch (type) {
        case 'PROFILE':
            payload = {
                selectedFileProfileImg: file,
                selectedFileBase64ProfileImg: base64
            }
            break;

        case 'SPLASH':
            payload = {
                selectedFileSplashImg: file,
                selectedFileBase64SplashImg: base64
            }
            break;
        default:
            break;
    }

    dispatch({
        type: 'UPDATE_USER_STATE',
        payload: payload
    })
}

export const clearSelectedFile = (type) => dispatch => {
    let payload = null;

    if (type === 'PROFILE') {
        payload = {
            selectedFileProfileImg: null,
            selectedFileBase64ProfileImg: null
        }
    } else if (type === 'SPLASH') {
        payload = {
            selectedFileSplashImg: null,
            selectedFileBase64SplashImg: null
        }
    }

    dispatch({
        type: 'UPDATE_USER_STATE',
        payload: payload
    })
}





