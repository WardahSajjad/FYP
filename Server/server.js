require('dotenv').config();

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require('./Routes/userRoute.js')
const quizRoute = require('./Routes/quizRoute.js')
const verifyToken = require('./Middlewares/authMidlleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Define routes here
app.use("/account", userRoutes);
app.use("/quiz", quizRoute);
app.use('/parallelParking', express.static(path.join(__dirname, 'UnityModes', 'ParallelParking')));
app.use('/perpendicularParking', express.static(path.join(__dirname, 'UnityModes', 'PerpendicularParking')));
app.use('/reverseParking', express.static(path.join(__dirname, 'UnityModes', 'ReverseParking')));
app.use('/sideParallelParking', express.static(path.join(__dirname, 'UnityModes', 'SideParallelParking')));
app.use('/garageParking', express.static(path.join(__dirname, 'UnityModes', 'GarageParking')));
app.use('/easyMode', express.static(path.join(__dirname, 'UnityModes', 'EasyMode')));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

