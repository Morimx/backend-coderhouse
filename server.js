const express = require("express");
const moment = require("moment");
const fs = require("fs");

//////
let contador = 0;
const app = express();
const PORT = 8080;
//////
app.get("/", (req, res, next) => {
  console.log(req);
  res.send(
    `<h1 style="color:blue">Hola para ver los productos ingresar a <a href="http://localhost:8080/productos">Este Link</a> o si quiere visualizar un producto aleatorio ingresar a <a href="http://localhost:8080/productosRandom">Este Link</a> </h1>`
  );
});

app.get("/visitas", (req, res, next) => {
  contador++;
  res.send(`Numero de visitas: ${contador}`);
});

app.get("/fyh", (req, res, next) => {
  res.json({ fyh: moment().format("DD/MM/YYYY HH:mm:SS") });
});

app.get("/productos", (req, res, next) => {
  fs.readFile("productos.txt", "utf-8", (err, data) => {
    if (err) throw "Se encontro un error por favor comuniquelo a soporte.";
    ProductosArray = JSON.parse(data);
    res.send(ProductosArray);
  });
});

app.get("/productosRandom", (req, res, next) => {
  fs.readFile("productos.txt", "utf-8", (err, data) => {
    if (err) throw "Se encontro un error por favor comuniquelo a soporte.";
    ProductosArray = JSON.parse(data);
    const randomProd = Math.floor(Math.random() * ProductosArray.length);
    res.send(ProductosArray[randomProd]);
  });
});

/////////Server On///////
const server = app.listen(PORT, () => {
  console.log(`Server on`);
});

server.on("error", (error) => {
  console.log(error);
});
