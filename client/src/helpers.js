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

export const getFormattedDate = (dateStr) => {
    let months = 'January February March April May June July August September October November December'.split(' ');
    let dateObj = new Date(dateStr);
    let month = months[dateObj.getMonth() + 1];
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes() > 10 ? dateObj.getMinutes() : '0' + dateObj.getMinutes();
    let amPm = 'AM';

    if (hours > 11) {
      amPm = 'PM';
      hours = hours - 12;
      hours = hours === 0 ? 12 : hours;
    }

    return `${month} ${date}, ${year} ${hours}:${minutes} ${amPm}`;
  }
