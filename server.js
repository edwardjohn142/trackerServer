const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());


const usersRouter = require('./routes/users');
app.use('/user', usersRouter);

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.use('/', router);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
