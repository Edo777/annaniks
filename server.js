const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require('cors');
//dev dependencies
const PORT = process.env.PORT || 3000;
const URL = "mongodb://localhost:27017/Annaniks_DB";
const morgan = require("morgan");
const app = express();
const API = require("./app").API;
mongoose.connect(URL)
    .then( () => {
        app.use(cors());
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


