const express = require('express');
const app = express();
const Datastore = require('nedb');


const positions = new Datastore('positions.db');
positions.loadDatabase();


app.listen('3000', () => console.log('listening on port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/save-position', (request, response) => { 
    console.log(request.body);
    const data = request.body;
    data.timestamp = Date.now();
    positions.insert(data);
    response.json(data);
});