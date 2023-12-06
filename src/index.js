const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const { sequelize } = require('./models');
const productRouter = require('./router/product');
const cors = require('cors');

const app = express()
const port = process.env.PORT ?? 3000;

app.use(cors({
	  origin: (origin, allowFn) => {
		    allowFn(null, 'http://localhost:3001');
		    // allowFn(null, 'https://siembrasana.bio');
		},
}));
app.use(bodyParser.json())
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '\\public'));
app.use('/products', productRouter);
app.get('/', (req, res) => {
  res.send('Hello World!')
})


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