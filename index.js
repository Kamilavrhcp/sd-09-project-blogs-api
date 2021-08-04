const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRoutes');
const errors = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.use(errors);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
