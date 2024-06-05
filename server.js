const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');
connectDb();
const app = express();
const ceoRoutes = require('./routes/ceo/ceoRoutes');
const accountantRoutes = require('./routes/accountant/accountantRoutes');
const requisitionsRoutes = require('./routes/clients/requisitionsRoutes');
const teamRoutes = require('./routes/team/teamRoutes');


const port = process.env.PORT || 5001;

//CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


app.use(express.json());


app.use('/api/ceo', ceoRoutes);

app.use('/api/accountant', accountantRoutes);

app.use('/api/requisition', requisitionsRoutes);

app.use('/api/team', teamRoutes);


//Error handling 
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Rulethu finance app running on port ${port}`)
})

