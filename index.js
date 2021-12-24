class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `El nombre es ${this.nombre} ${this.apellido}`;
  }
  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota);
  }
  countMascota() {
    return console.log(this.mascotas.length);
  }
  addBook(titulo, autor) {
    this.libros.push({ Titulo: titulo, Autor: autor });
  }
  getBookName() {
    return this.libros.forEach((e) => {
      console.log(e.Titulo);
    });
  }
}

let juan = new Usuario(
  "Juan",
  "Posse",
  [
    { Titulo: "El arte de la guerra", Autor: "Sun Tsu" },
    { Titulo: "Harry potter", Autor: "JK Rowling" },
  ],
  ["perro", "gato"]
);

juan.addMascota("Tero");
juan.countMascota();
juan.addBook("DragonBall", "Akira Toriyama");

console.log(juan.getFullName());
console.log(juan.mascotas);
console.log(juan.libros);
juan.getBookName();
