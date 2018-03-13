const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//dev dependencies
const PORT = process.env.PORT || 3000;
const URL = "mongodb://localhost:27017/Annaniks_DB";
const morgan = require("morgan");
const app = express();
const API = require("./app/app");
mongoose.connect(URL)
    .then( () => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));
        app.use(morgan("dev"));
        app.listen(PORT, () => {
            require("./swager/index")(app)
            console.log(`Listening to ${PORT}`);
        })
        API.initApp(app);
    })
    .catch(() => {
        return console.log("Server dont connect and i cant listen to port");
    })


