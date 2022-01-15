const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.path = "./productos/";
    this._file = `${file}.txt`;
  }

  async save(object) {
    //Guardar
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let productos = JSON.parse(res);
      const producto = {
        id: productos[productos.length - 1].id + 1,
        title: object.title,
        price: object.price,
      };
      productos.push(producto);
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify(productos, null, 2)
        );
        return {
          status: "Success",
          message: "Producto creado con éxito.",
          id: producto.id,
        };
      } catch (err) {
        return {
          status: "Error",
          message: "Error al cargar el producto.",
          error: err,
        };
      }
    } catch (err) {
      const producto = {
        id: 1,
        title: object.title,
        price: object.price,
      };
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify([producto], null, 2)
        );
        return {
          status: "Success",
          message: "Archivo y producto creado con éxito.",
          id: producto.id,
        };
      } catch (err) {
        return {
          status: "Error",
          message: "Error al crear el archivo y producto.",
          error: err,
        };
      }
    }
  }

  async getById(id) {
    // buscar por id
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let productos = JSON.parse(res);
      let producto = productos.find((el) => el.id === id);
      if (!producto) {
        throw new Error();
      }
      return { status: "Success", data: producto };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encontro el producto solicitado.",
        error: err,
        data: null,
      };
    }
  }

  async getAll() {
    // Devolver todo
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let productos = JSON.parse(res);
      return { status: "Success", data: productos };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encontro el producto solicitado.",
      };
    }
  }

  async deleteById(id) {
    // Elimina por id
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let productos = JSON.parse(res);
      let siExiste = productos.find((el) => el.id === id);
      if (!siExiste) {
        throw new Error();
      }
      let productosActualizados = productos.filter((el) => el.id !== id);
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify(productosActualizados, null, 2)
        );
        return { status: "Success", message: "Producto eliminado con éxito." };
      } catch (err) {
        return {
          status: "Error",
          message: "Hubo un problema al borrar el producto.",
        };
      }
    } catch (err) {
      return {
        status: "Error",
        message: "No se encontro el producto solicitado.",
      };
    }
  }

  async deleteAll() {
    // Elimina todo
    try {
      await fs.promises.unlink(`${this.path}${this._file}`);
      return {
        status: "Success",
        message: "Se eliminaron todos los objetos del archivo.",
      };
    } catch (err) {
      return {
        status: "Error",
        message: "Hubo un error al intentar borrar los archivos.",
        error: err,
      };
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const carrito = new Contenedor("productos");

// Producto 1
carrito
  .save({
    title: "Escuadra",
    price: 123.45,
  })
  .then(() =>
    // Producto 2
    carrito
      .save({
        title: "Calculadora",
        price: 234.56,
      })
      .then(() =>
        // Producto 3
        carrito.save({
          title: "Globo Terráqueo",
          price: 345.67,
        })
      )
  );

// Buscar por ID
// carrito.getById(2).then((data) => console.log(data));
// carrito.getById(152).then((data) => console.log(data));

// Borrar por id
// carrito.deleteById(1).then((data) => console.log(data));
// carrito.deleteById(152).then((data) => console.log(data));

// Mostrar todo
//carrito.getAll().then((data) => console.log(data));

// Borrar todo
//carrito.deleteAll().then((data) => console.log(data));
