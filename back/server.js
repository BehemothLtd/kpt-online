const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const corsOptions = {
  origin: "http://localhost:8081",
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to the database!");
  })
  .catch(err => {
    console.log("cannot connect to database!", err);
    process.exit();
  })

app.get("/", (req, res) => {
  res.json({ message: "welcome to KPT-online application " });
});

require("./app/routes/board.routes")(app);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('USER_JOIN', function(data) {
    console.log(data);
    io.emit('ON_USER_JOIN', `${data.name} joined board !!!!`)
  });

  socket.on('CREATE_CARD', function(data) {
    io.emit('ON_CREATE_CARD', {
      card: data.card
    })
  });
});