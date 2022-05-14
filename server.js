let express = require("express");
let mongoose = require("mongoose");
const dotenv = require("dotenv");
let cors = require("cors");
let bodyParser = require("body-parser");

dotenv.config();

// Express Route
const userRoute = require("./routes/User.route");

// Connecting mongoDB Database
mongoose
  .connect(process.env.ATLAS_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-stack-crud-server.herokuapp.com",
    ],
    credentials: true,
  })
);

app.use("/users", userRoute);
app.use("/services", require("./routes/Service.route"));

app.get('/', (req, res) => {
  res.send('API Server');
})

// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});