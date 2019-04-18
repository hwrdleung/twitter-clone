const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

// Routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log('Server started');
});