const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
require("./app/routes/sticky.routes.js")(app);
require("./app/routes/user.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
