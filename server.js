const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient; 
const client = new MongoClient(url);
//client.connect(); // will throw an error localy.

const PORT = process.env.PORT || 5000; 
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(__dirname + "/frontend/build"));
//     app.get("*", function(req, res) {
//       res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
//     });
// }

//app.use('/static', express.static(path.join(__dirname, 'frontend/build')));
app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader(    
        'Access-Control-Allow-Headers',    
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'  
    );  
    res.setHeader(    
        'Access-Control-Allow-Methods',    
        'GET, POST, PATCH, DELETE, OPTIONS'  
    );  
    next();
});
if (process.env.NODE_ENV === 'production') {  
    // Set static folder 
    app.use(express.static('/frontend/build'));
    //app.use('/static', express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) =>  {    
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));  
    });
}

app.get('/sayHello', (res) => {
    res.statusCode(200).send('hello');
});
app.listen(PORT, () => {  
    console.log(`Server listening on port ${PORT}.`);
});
