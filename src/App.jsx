import { useState, useEffect } from "react";
import "./App.css";
import { library } from "./book.json";
import ListaLectura from "./ListaLectura";
import ListaLibros from "./ListaLibros";
import Storage from "./storage";


const storage = new Storage("lista");

function App() {
  const [libros, setLibros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [lista, setLista] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState("todas");
  const [filtroPaginas, setFiltroPaginas] = useState(3000);

  const cargarGeneros = () => {
    const buscar = [];
    library.map((l) => {
      if (!buscar.includes(l.book.genre)) {
        buscar.push(l.book.genre);
      }
      setGeneros(buscar);
    });
  };

  const cargarLista = (libro) => {
    if (!lista.includes(libro)) {
      setLista([...lista, libro]);
    }
  };

  const filtrarGeneros = (e) => {
    setFiltroGenero(e.target.value);
  };

  const buscarPorNombre = (e) => {
    const librosNombre = library.filter(
      (libro) =>
        libro.book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLibros(librosNombre);
  };

  const filtrarPorPaginas = (e) => {
    setFiltroPaginas(e.target.value);
  };

  const eliminar = (l) => {
    setLista((lista) => lista.filter((libro) => libro.title !== l.title));
  };

  useEffect(() => {
    let librosFiltrados = library;

    if (filtroGenero !== "todas") {
      librosFiltrados = librosFiltrados.filter(
        (libro) => libro.book.genre === filtroGenero
      );
    }

    librosFiltrados = librosFiltrados.filter(
      (libro) => libro.book.pages <= filtroPaginas
    );

    setLibros(librosFiltrados);
    cargarGeneros();
    
  }, [filtroGenero, filtroPaginas]);

  return (
    <div className="contenido">
      <div className="titulo">
        <h1>Library</h1>
      </div>
      <h4>{libros.length} libros disponibles</h4>
      <div className="filtros">
        <input
          type="text"
          placeholder="Busca por titulo"
          onChange={buscarPorNombre}
        ></input>
        <input
          type="range"
          onChange={filtrarPorPaginas}
          min={100}
          max={3000}
          value={filtroPaginas}
          step={100}
        />
        <p className="list">Filtrar hasta {filtroPaginas} paginas</p>
        <p className="list">Filtrar por genero</p>
        <select name="" id="" onChange={filtrarGeneros}>
          <option value={"todas"}>Todas</option>
          {generos.map((g, index) => (
            <option key={index}>{g}</option>
          ))}
        </select>
      </div>
      <div className="general">
        <ListaLibros libros={libros} cargarLista={cargarLista} lista={lista} />
        <ListaLectura lista={lista} eliminar={eliminar} />
      </div>
    </div>
  );
}

export default App;