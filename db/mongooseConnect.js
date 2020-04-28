const mongoose = require("mongoose"); //require modules
const env = require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((d) => {
    console.log("database was connected");
  })
  .catch((e) => {
    console.log("cant connect to database");
    console.log(e);
  });

  
  