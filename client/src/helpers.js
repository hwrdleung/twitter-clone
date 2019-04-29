export const alphabetize = (arr) => {
    return arr
}

export const getProfileUrl = (username) => {
    return `/profile/${username}`;
}

export const getUsernameFromPath = (path) => {
    let pathArr = path.split('/')
    if (pathArr[1] === 'profile') return pathArr[2];
}

export const getFormattedDate = (dateStr, includeTime) => {
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

    let time = `${hours}:${minutes} ${amPm}`;

    return `${month} ${date}, ${year} ${includeTime ? time : ''}`;
}

export const getBackgroundImgCss = url => {
    return {
        backgroundImage: `url(${url})`
    }
}
