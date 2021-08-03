const express = require('express');

const app = express();

app.use(express.json());

const userRouters = require('./routers/userRouter');
const loginRouters = require('./routers/loginRouter');
const categoryRouters = require('./routers/categoriesRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRouters);
app.use(loginRouters);
app.use(categoryRouters);

app.listen(3000, () => console.log('ouvindo porta 3000!'));