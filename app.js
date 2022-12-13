const express = require('express');
const customerRoute = require('./routes/cab');
const parser = require('body-parser');
const app = express();
var cookieParser = require('cookie-parser')

const {engine} = require('express-handlebars')

app.set('view engine', 'handlebars');
app.engine('handlebars', engine());
app.use(express.static('public'))

app.use(parser.urlencoded({extended: true}));
app.use("/tw",customerRoute);


app.listen(3000);