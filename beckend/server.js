const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('./app/config/jwt');
const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt());

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(`Cannot connect database: ${err}`);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello!!!" });
});

require("./app/routes/turorial.routes.js")(app);
require("./app/routes/board.routes.js")(app);
require("./app/routes/board_member.routes.js")(app);
require("./app/routes/sticky.routes.js")(app);
require("./app/routes/user.routes.js")(app);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('CREATE_STICKY', function (data) {
    io.emit('STICKY_CREATED', data)
  });

  socket.on('UPDATE_STICKY', function (data) {
    io.emit('STICKY_UPDATED', data)
  });

  socket.on('DELETE_STICKY', function (data) {
    io.emit('STICKY_DELETED', data);
  });

  socket.on('CREATE_BOARD', function (data) {
    io.emit('BOARD_CREATED', data)
  });

  socket.on('DELETE_BOARD', function (data) {
    io.emit('BOARD_DELETED', data);
  });

  socket.on('RENAME_BOARD', function (data) {
    io.emit('BOARD_RENAMED', data);
  });
});