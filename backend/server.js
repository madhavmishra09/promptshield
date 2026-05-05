id="server01"
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const chatRoute= require('./routes/chat');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRoute);
app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});