const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const ADODB = require('node-adodb');

app.use(cors());
app.use(bodyParser.json());

const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=database.accdb;');

app.get('/getData', async (req, res) => {
  try {
    const data = await connection.query('SELECT * FROM YourTable');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addData', async (req, res) => {
  const { columnName, columnValue } = req.body;

  try {
    await connection.execute(`INSERT INTO YourTable (ColumnName) VALUES ('${columnValue}')`);
    res.json({ success: true, message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});