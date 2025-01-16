const express = require('express');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);   
})