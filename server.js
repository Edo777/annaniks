const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const session = require('express-session');
const compression = require('compression');

mongoose.Promise = Promise;
// mongoose.set('debug', true);
const bodyParser = require("body-parser");
//dev dependencies
const PORT = process.env.PORT || 3000;
const URL = "mongodb://annaniks:annaniks@ds121189.mlab.com:21189/annaniks";
//const URL = "mongodb://localhost:27017/annaniks";
const morgan = require("morgan");
const app = express();
const API = require("./app").API;
mongoose.connect(URL, { poolSize: 10 })
    .then(() => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        //app.use(morgan("dev"));
        app.use(helmet());
        app.disable('x-powered-by');
        app.use(compression());
        app.set('trust proxy', 1) // trust first proxy
        app.use(session({
            secret: 'annaniks2018',
            name: 'sessionId',
        })
        );
        app.listen(PORT, () => {
            console.log(`Listening to ${PORT}`);
        })
        API.initApp(app);
    })
    .catch(() => {
        return console.log("Server dont connect and i cant listen to port");
    })