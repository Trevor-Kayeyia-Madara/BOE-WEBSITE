const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const customerRoutes = require('./routes/customer');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'boe',
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/customer', customerRoutes);

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a MySQL connection
    const connection = await mysql.createConnection(dbConfig);

    // Insert the user into the database
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    connection.end();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a MySQL connection
    const connection = await mysql.createConnection(dbConfig);

    // Retrieve the user from the database based on the email
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    connection.end();

    // Check if the user exists and verify the password
    if (users.length === 1) {
      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
