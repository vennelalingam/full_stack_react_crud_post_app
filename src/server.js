// calling packages
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

// Declare our app - expressJs app
const app = express();
const port = 5000;

// Middlewares app
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// default route for server
app.get('/', (req, res) => res.status(200).send({
    message: 'Server is running on port 5000'
}));

const WriteTextToFileAsync = async (contentToWrite) => {
    fs.writeFile('./src/data.json', contentToWrite, (err) => {
        console.log(contentToWrite);
        if(err) {
            console.log(err);
        } else {
            console.log('Done writing to file');
        }
    })
}


// Declare post / write "route" to accept incoming request with  data
app.post('/endpoint-write', async (req, res, next) => {
    const receivedData = JSON.stringify(req.body);
    await WriteTextToFileAsync(receivedData)
})


// 404 route for server
app.use((req, res, next) => res.status(404).send({
    message: 'Server not found'
}));

// Run Server
app.listen(port, () => {
    console.log(
        `
        !!! Server is running
        !!! Listening for incoming requests on port ${port}
        !!! http://localhost:5000
        `
    )
})