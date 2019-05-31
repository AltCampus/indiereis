require('dotenv').config();
const express = require("express");

// session authentication packages
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var passport = require('passport');

const port = 8000;
require('./server/models/User');

mongoose.connect(
 "mongodb://localhost/travelInfo",
 { useNewUrlParser: true },
 function(err, connection) {
  if (err) throw err;
  else console.log("connected to mongodb");
 }
)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

// code for session based authentication
// app.use(
//  session({
//   secret: "travelInfo",
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({ url: "mongodb://localhost/travelInfo" })
//  })
// );

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
app.use("/api/v1", require("./server/routes/api"));
app.use("/auth", require("./server/routes/auth"));
app.use('/*', require("./server/routes/index"));
// app.use("/admin", require("./server/routes/admin"));

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});
