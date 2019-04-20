require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser : true})
.then(() => console.log('MongoDB connected'))
.catch(error => console.log(error));

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

// Routes
app.use('/api/public', require('./api/public'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/user', require('./api/user'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html')));

// Start server
app.listen(5000, () => {
    console.log('Server started');
});
