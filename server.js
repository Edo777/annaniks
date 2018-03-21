const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.set('debug', true);
const bodyParser = require("body-parser");
//dev dependencies
const PORT = process.env.PORT || 3000;
const URL = "mongodb://annaniks:annaniks@ds121189.mlab.com:21189/annaniks";
const morgan = require("morgan");
const app = express();
const API = require("./app").API;
mongoose.connect(URL)
    .then( () => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));
        app.use(morgan("dev"));
        app.listen(PORT, () => {
            require("./swager")(app)
            console.log(`Listening to ${PORT}`);
        })
        API.initApp(app);
    })
    .catch(() => {
        return console.log("Server dont connect and i cant listen to port");
    })


