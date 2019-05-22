require('dotenv').config();
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var passport = require('passport');

const port = 8000;

require('./server/module/passport');
require('./server/models/User');

mongoose.connect(
 "mongodb://localhost/travelInfo",
 { useNewUrlParser: true },
 function(err, connection) {
  if (err) throw err;
  else console.log("connected to mongodb");
 }
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

app.use(
 session({
  secret: "travelInfo",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: "mongodb://localhost/travelInfo" })
 })
);

if (process.env.NODE_ENV === "development") {
 var webpack = require("webpack");
 var webpackConfig = require("./webpack.config");
 var compiler = webpack(webpackConfig);

 app.use(
  require("webpack-dev-middleware")(compiler, {
   noInfo: true,
   publicPath: webpackConfig.output.publicPath
  })
 );

 app.use(require("webpack-hot-middleware")(compiler));
}

app.use(cors());

app.use("/api", require("./server/routes/api"));
app.use("/auth", require("./server/routes/auth"));
app.use('/*', require("./server/routes/index"));

app.listen(port, () => {
 console.log(`server is running on http://localhost:${port}`);
});