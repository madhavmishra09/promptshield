id="server01"
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoute= require('./routes/chatRoute');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRoute);
app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});