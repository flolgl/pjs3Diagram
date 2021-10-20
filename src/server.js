const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pjs3",
});
connection.connect();


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11


app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('Hello world !!');
});

app.get('/getWatchesList', (req, res) => {
  // SELECT DISTINCT MONTH(DateTicket) FROM `ticket`
  connection.query('SELECT * FROM categorie', function(err, rows, fields) {
    if (!err) 
      res.json(rows);
    else
      console.log('Query erreur.');
    
  });
});