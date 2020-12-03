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

app.use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(join(__dirname, './public')))
    .get('/', (req, res) => {
        res.send(join(__dirname, './public/index.html'))
    })
    .use('/api', coursesRoute);
    

const server = http.createServer(app);
server.listen(4000, () => {
    console.log('Lisntening 4000');
});