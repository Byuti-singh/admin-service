require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./config/database');
const path = require('path');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

dbConnection();

app.use(express.static(path.join(__dirname, 'UI')));

app.use('/api', userRoutes);
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
});