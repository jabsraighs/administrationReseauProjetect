const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path'); // Ensure path module is imported
const app = express();
const port = 5000;
const corsOptions = {
  origin:  "https://www.bouljay.site",
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

const pool = new Pool({
  user: 'postgres',
  host: 'adminer_database_1',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.get('/api/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "User"');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error ' + err);
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
