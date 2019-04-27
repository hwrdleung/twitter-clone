import axios from 'axios';

export const getUserCards = (usernames) => {
    // get user cards from server and return res
    console.log('getting usercards for ', usernames);
    return new Promise((resolve, reject) => {
        if (usernames.length > 0) {
            let data = {
                usernames: usernames
            }

            axios.put('/api/public/getUserCards', data)
                .then(res => resolve(res))
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            } else {
                reject('No usernames specified.');
            }
        })
}

export const alphabetize = (arr) => {
    return arr
}

export const getProfileUrl = (username) => {
    return `/profile/${username}`;
}
