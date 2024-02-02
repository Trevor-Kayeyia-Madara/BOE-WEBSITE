const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/customer', customerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
