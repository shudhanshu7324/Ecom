const express = require('express');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const isLoggedIn = require('./middlewares/auth.middleware');
dotenv.config();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);


app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);   
})