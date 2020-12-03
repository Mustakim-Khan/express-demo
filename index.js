const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const coursesRoute = require('./routes/coursesRoute');
const { join } = require('path');
require('dotenv').config();

const app = express()
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log('Success'))
.catch(err => console.log(err));

app.use(bodyParser.json())
    .use('/api', coursesRoute);
    

const server = http.createServer(app);
server.listen(4000, () => {
    console.log('Lisntening 4000');
});