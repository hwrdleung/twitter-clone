class Tweet {
    constructor(user, text) {
        this.user = user;
        this.text = text;
        this.date = new Date().toString();
        this.id = new Date().getDate().toString();
        this.likes = 50;
        this.replies = [];
    }
}

let user = {
    username: 'user1',
    firstName : 'First',
    lastName: 'Last',
}

export default [
    new Tweet(user, 'This is a tweet'),
    new Tweet(user, 'This is another tweeet'),
    new Tweet(user, 'Hello world'),
    new Tweet(user, 'Hows it going?'),
    new Tweet(user, 'aaweawawewe'),
    new Tweet(user, 'mnbvcwerg'),
    new Tweet(user, 'This is a tweet!!!!!!!!!!!!!!!'),
    new Tweet(user, 'awehjaeraejkjsrkst')
]
