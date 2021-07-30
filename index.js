require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./src/controllers');
const middlewares = require('./src/middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user', controllers.createUser);

app.use(middlewares.error);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());
