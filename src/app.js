const express = require('express');
const app= express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Convierte datos enviados por form a JSON

module.exports = app;
