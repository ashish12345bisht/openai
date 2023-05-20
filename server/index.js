require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const openaiRoutes  = require('./routes/openai');

  
const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());

app.use('/', openaiRoutes);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);