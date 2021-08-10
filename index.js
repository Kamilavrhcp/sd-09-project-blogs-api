const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Online on PORT: ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
