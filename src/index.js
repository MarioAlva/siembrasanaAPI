const express = require('express')
const { sequelize } = require('./models');
const productRouter = require('./routes/product');
const cors = require('cors');

const app = express()
const port = process.env.PORT ?? 3000;

app.use(cors({
	  origin: (origin, allowFn) => {
		    allowFn(null, 'http://localhost:3000');
		    allowFn(null, 'https://siembrasana.bio');
		},
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', productRouter)

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})