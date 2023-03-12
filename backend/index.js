const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json())
app.use('',cors(), authRouter)
// app.use(cors({
//     origin:'http://localhost:5000/users',
// }));
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://vasyl:kovbasova@cluster0.ncnqc21.mongodb.net/test-db?retryWrites=true&w=majority')
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()