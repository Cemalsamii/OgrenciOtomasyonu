const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connection = require('./database/connection');

const PORT = process.env.PORT | 3700

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {

    connection.query(`SELECT * FROM ogrenci`, (err, rows, fields) => {

        var specialArr = Object.values(JSON.parse(JSON.stringify(rows)));

        res.render('home', { data: specialArr });
    });


});


app.post('/', (req, res) => {
    console.log(req.body);
    const name = req.body.Isim;
    const surname = req.body.Soyisim;
    const gender = req.body.Cinsiyet;
    const faculty = req.body.Fakulte;
    const department = req.body.Bolum;
    const entry = req.body.Giris;


    var sql = `INSERT INTO ogrenci (isim,soyisim,cinsiyet,giris,fakulte,bolum) VALUES ('${name}', '${surname}', '${gender}','${entry}','${faculty}','${department}')`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });



})




app.get("/update/:id", (req, res) => {

    connection.query(`SELECT * FROM ogrenci WHERE id = ${req.params.id}`, (err, rows, fields) => {

        var specialArr = Object.values(JSON.parse(JSON.stringify(rows)));

        res.render('update', { data: specialArr });
    });

});

app.post("/update/:id", (req, res) => {
    var sql = `UPDATE ogrenci SET isim = '${req.body.Isim}',soyisim='${req.body.Soyisim}',cinsiyet='${req.body.Cinsiyet}',giris='${req.body.Giris}',fakulte='${req.body.Fakulte}',bolum='${req.body.Bolum}' WHERE id =${req.params.id}`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.redirect('/');
    });

});


app.get("/delete/:id", (req, res) => {

    var sql = ` DELETE FROM ogrenci WHERE id = ${req.params.id}`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        res.redirect('/')

    });

});




app.listen(PORT, () => {
    console.log('server Listenining');
})