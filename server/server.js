const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const nameRoutes = require("./routes/name-routes");
const { createPath, handleError } = require("./helpers/helper");

const app = express();
app.set("view engine");

/*mongoose  
  .connect(process.env.MONGO_URL)  
  .then((res) => console.log('Connected to DB')) 
  .catch((error) => console.log(error)); */

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Listening port ${process.env.PORT}`);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.use(nameRoutes);

app.use((req, res) => {
  const title = "Error page";
  res.status(404).render(createPath("error"), { title });
});
