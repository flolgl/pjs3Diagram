const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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



function isSqlSafe(query){
  isSafe = true;
  sqlCheckList = ["--",";--",";","/*","*/", "@@", "@", "char","nchar","varchar","nvarchar","alter","begin","cast","create","cursor","declare","delete","drop","end","exec","execute","fetch","insert","kill","select","sys","sysobjects","syscolumns","table","update"];
  sqlCheckList.forEach(element => {
    if (query.includes(element))
      isSafe = false;
  });

  return isSafe;

}

//
app.get('/getChiffrePerMonth', (req, res) => {
  connection.query('SELECT MONTH(ticket.DateTicket) as time, YEAR(ticket.DateTicket) as y, SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre FROM detailticket, ticket WHERE ticket.NoTicket = detailticket.NoTicket GROUP BY MONTH(ticket.DateTicket), YEAR(ticket.DateTicket)',
  function(err, rows, fields) {
    if (!err) {
      res.json(rows);
      console.log("[GET] -> getChiffrePerMonth")
      console.log(rows)    
    }
    else
      console.log('Query erreur.');
  })

})

//SELECT prixunit*qte, t.dateTicket FROM detailticket d, ticket t where t.NoTicket = d.NoTicket GROUP BY t.DateTicket
/*
SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0)))/COUNT(DISTINCT ticket.NoTicket) as chiffre,
MONTH(ticket.DateTicket) as time,
YEAR(ticket.DateTicket) as y
FROM detailticket, ticket 
WHERE ticket.NoTicket = detailticket.NoTicket 
GROUP BY(MONTH(ticket.DateTicket))
*/
app.get('/getTicketMoyenPerMonth', (req, res) => {
  connection.query('SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0)))/COUNT(DISTINCT ticket.NoTicket) as chiffre, MONTH(ticket.DateTicket) as time, YEAR(ticket.DateTicket) as y FROM detailticket, ticket WHERE ticket.NoTicket = detailticket.NoTicket GROUP BY MONTH(ticket.DateTicket), YEAR(ticket.DateTicket)',
  function(err, rows, fields) {
    if (!err) {
      res.json(rows);
      console.log("[GET] -> getTicketMoyenPerMonth")
      console.log(rows)
    }    
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
MONTH(ticket.DateTicket) as time, YEAR(ticket.DateTicket) as y 
FROM detailticket, ticket, produit 
WHERE ticket.NoTicket = detailticket.NoTicket 
AND detailticket.RefProd = produit.RefProd 
AND LOWER(produit.NomProd) LIKE "%bio%" 
GROUP BY(MONTH(ticket.DateTicket))
*/
app.get('/getChiffreCateg', (req, res) => {
  //const categorie = req.params.categorie
  const categorie = req.query.categ != null ? req.query.categ : "bio";
  if (!isSqlSafe(categorie))
    return;
  console.log(categorie)
  console.log(req.query.categ)

  connection.query('SELECT "'+categorie+'" as categ, SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre,  MONTH(ticket.DateTicket) as time, YEAR(ticket.DateTicket) as y  FROM detailticket, ticket, produit  WHERE ticket.NoTicket = detailticket.NoTicket  AND detailticket.RefProd = produit.RefProd  AND LOWER(produit.NomProd) LIKE "%'+categorie+'%"  GROUP BY MONTH(ticket.DateTicket), YEAR(ticket.DateTicket)',
    function(err, rows, fields) {
    if (!err) {
      res.json(rows)
      console.log("[GET] -> getChiffreCateg | categorie = " + categorie)
      console.log(rows)
    }    
    else
      console.log(err);
  })

})


/*
SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0)))/COUNT(ticket.NoTicket) as chiffre,
client.codecli, client.nom, client.prenom
FROM detailticket, ticket, client
WHERE ticket.NoTicket = detailticket.NoTicket 
AND client.codecli = ticket.codecli
GROUP BY(ticket.codecli)
*/
app.get('/getTicketMoyenClients', (req, res) => {

  connection.query('SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0)))/COUNT(ticket.NoTicket) as chiffre, client.codecli, client.nom, client.prenom FROM detailticket, ticket, client WHERE ticket.NoTicket = detailticket.NoTicket  AND client.codecli = ticket.codecli GROUP BY(ticket.codecli) ORDER BY client.nom',
    function(err, rows, fields) {
    if (!err) {
      res.json(rows)
      console.log("[GET] -> getChiffreCateg")
      console.log(rows)
    }    
    else
      console.log(err);
  })

})


/*
SELECT "bio" as categ, 
client.codecli, client.nom,
SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as depenceClient
FROM detailticket, ticket, produit, client
WHERE  
client.codecli = ticket.codecli
AND ticket.NoTicket = detailticket.NoTicket  
AND detailticket.RefProd = produit.RefProd  
AND LOWER(produit.NomProd) LIKE "%bio%"
GROUP BY(client.codecli)
*/
/*

SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre, client.codecli, client.nom, client.prenom, MONTH(ticket.DateTicket) as m, YEAR(ticket.DateTicket) as y 
FROM detailticket, ticket, client, produit 
WHERE detailticket.NoTicket = ticket.NoTicket 
AND client.codecli = ticket.codecli 
AND produit.RefProd = detailticket.RefProd 
AND produit.NomProd LIKE "%halal%" 
GROUP BY MONTH(ticket.DateTicket), YEAR(ticket.DateTicket), ticket.codecli 
ORDER BY client.codecli, MONTH(ticket.DateTicket) ASC 
*/

app.get('/getClientsAndDepensesByCateg', (req, res) => {


  const categorie = req.query.categ != null ? req.query.categ : "bio";
  if (!isSqlSafe(categorie))
    return;

  connection.query('SELECT SUM(detailticket.PrixUnit*detailticket.Qte*(1-COALESCE(detailticket.Remise_,0))) as chiffre, client.codecli, client.nom, client.prenom, MONTH(ticket.DateTicket) as m, YEAR(ticket.DateTicket) as y FROM detailticket, ticket, client, produit WHERE detailticket.NoTicket = ticket.NoTicket AND client.codecli = ticket.codecli AND produit.RefProd = detailticket.RefProd AND produit.NomProd LIKE "%'+categorie+'%" GROUP BY MONTH(ticket.DateTicket), YEAR(ticket.DateTicket), ticket.codecli ORDER BY client.codecli, MONTH(ticket.DateTicket) ASC',
    function(err, rows, fields) {
    if (!err) {
      res.json(rows)
      console.log("[GET] -> getChiffreCateg")
      console.log(rows)
    }    
    else
      console.log(err);
  })

})