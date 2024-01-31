const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { generatePosters } = require('./posterController');
const { verifyToken } = require('./verifyToken');



const app = express();
app.enable('trust proxy');
const PORT = process.env.PORT || 5001;



const posterLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 10, 
    message: 'Too many requests For poster generation, please try again later after 1 hr.',
});

app.use(cors());
app.use(express.json());
app.use('/poster', posterLimiter);

const fetch = require('node-fetch'); 



app.post('/poster',verifyToken, generatePosters);

app.get('/', (req, res) => {
    res.status(200).contentType('text/plain').send('Server shaddy Rep is healthy 😀🥳');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

