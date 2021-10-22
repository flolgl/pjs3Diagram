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
    if (!err){
      res.json(rows);
      console.log(res.json)
    }
    else
      console.log('Query erreur.');
    
  });
});



// prendre en compte la remise
app.get('/getChiffrePerMonth', (req, res) => {
  connection.query('SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre, MONTH(ticket.DateTicket) as mois, YEAR(ticket.DateTicket) as year FROM detailticket, ticket WHERE ticket.NoTicket = detailticket.NoTicket GROUP BY(MONTH(ticket.DateTicket))',
  function(err, rows, fields) {
    console.log(rows)
    if (!err) 
      res.json(rows);    
    else
      console.log('Query erreur.');
  })

})


// Récup le chiffre total d'une categ
/*
SELECT SUM(detailticket.PrixUnit*detailticket.Qte) as totalPrixNoRemise, 
SUM(detailticket.PrixUnit*detailticket.Qte*COALESCE(detailticket.Remise_,1)) as totalPrixRemiseFausse, 
SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as totalPrixRemise 
FROM detailticket, produit 
WHERE detailticket.RefProd = produit.RefProd 
AND LOWER(produit.NomProd) LIKE "%bio%" 
*/
// Récup le chiffre par mois d'un categ
/*
SELECT "Bio" as categ, 
SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre, 
MONTH(ticket.DateTicket) as mois, YEAR(ticket.DateTicket) as year 
FROM detailticket, ticket, produit 
WHERE ticket.NoTicket = detailticket.NoTicket 
AND detailticket.RefProd = produit.RefProd 
AND LOWER(produit.NomProd) LIKE "%bio%" 
GROUP BY(MONTH(ticket.DateTicket))
*/
app.get('/getChiffreCateg', (req, res) => {
  //const categorie = req.params.categorie
  const categorie = req.query.categ;
  console.log(categorie)
  console.log(req.query.categ)

  connection.query('SELECT "'+categorie+'" as categ, SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre,  MONTH(ticket.DateTicket) as mois, YEAR(ticket.DateTicket) as year  FROM detailticket, ticket, produit  WHERE ticket.NoTicket = detailticket.NoTicket  AND detailticket.RefProd = produit.RefProd  AND LOWER(produit.NomProd) LIKE "%'+categorie+'%"  GROUP BY(MONTH(ticket.DateTicket))',
    function(err, rows, fields) {
    if (!err) {
      res.json(rows)
      console.log("Requête GET chiffre categ")
      console.log(rows)
    }    
    else
      console.log(err);
  })

})
