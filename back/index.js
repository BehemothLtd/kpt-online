const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./routes/routes')
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3000
const db = mongoose.connection;

dotenv.config()

// connect db 
mongoose.set('useCreateIndex',true)

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true})
        .then(() => console.log('DB connected !'));
        db.on('error', (err) => {
          console.log('DB connection error:', err.message);
      })

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/',routes)
app.listen(PORT, function () {
  console.log('testttttt');
});

module.exports = app;