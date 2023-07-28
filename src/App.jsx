import { useState, useEffect } from "react";
import "./App.css";
import { library } from "./book.json";
import ListaLectura from "./components/ListaLectura";
import ListaLibros from "./components/ListaLibros";
import usePersistentStorage from "./usePersistentStorage"; // Importar el custom hook aquí
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [libros, setLibros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState("todas");
  const [filtroPaginas, setFiltroPaginas] = useState(3000);
  const [lista, setLista] = usePersistentStorage("lista",[]);

  const cargarGeneros = () => {
    const buscar = [];
    library.map((l) => {
      if (!buscar.includes(l.book.genre)) {
        buscar.push(l.book.genre);
      }
    });
    setGeneros(buscar);
  };

  const cargarLista = (libro) => {
    if (!lista.find((item) => item.title === libro.title)) {
      setLista([...lista, libro]);
    }
  };

  const filtrarGeneros = (e) => {
    setFiltroGenero(e.target.value);
 
  };

  const buscarPorNombre = (e) => {
    const librosNombre = library.filter((libro) =>
      libro.book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLibros(librosNombre);
  };

  const filtrarPorPaginas = (e) => {
    setFiltroPaginas(e.target.value);
  };

  const eliminar = (libro) => {
    setLista((lista) => lista.filter((libroEnLista) => libroEnLista.title !== libro.title));
  };

  useEffect(() => {
    let librosFiltrados = library;
    cargarGeneros();
    
    if (filtroGenero !== "todas") {
      librosFiltrados = librosFiltrados.filter(
        (libro) => libro.book.genre === filtroGenero
      );
    }
  
    if (filtroPaginas !== 3000) {
      librosFiltrados = librosFiltrados.filter(
        (libro) => libro.book.pages <= filtroPaginas
      );
    }
  
    setLibros(librosFiltrados);
  
  }, [filtroGenero, filtroPaginas,lista]);




  return (
    <div className="contenido">
      <div className="titulo">
        <h1>
          Library <FontAwesomeIcon icon={faBook} />
        </h1>
      </div>
      <h4>LIBROS DISPONIBLES: {libros.length}</h4>
      <div className="filtros">
        <input
          type="text"
          placeholder="Busca por titulo"
          onChange={buscarPorNombre}
        ></input>
        <p className="list">Filtrar hasta {filtroPaginas} paginas</p>
        <input
          type="range"
          onChange={filtrarPorPaginas}
          min={100}
          max={3000}
          value={filtroPaginas}
          step={100}
        />
        <p className="list">Filtrar por genero</p>
        <select name="" id="" onChange={filtrarGeneros}>
          <option value={"todas"}>Todas</option>
          {generos.map((g, index) => (
            <option key={index}>{g}</option>
          ))}
        </select>
      </div>
      <div className="general">
        <ListaLibros
          libros={libros}
          lista={lista}
          setLista={setLista}
          cargarLista={cargarLista}
        />
        {lista && lista.length > 0 && <ListaLectura lista={lista} eliminar={eliminar} />}
      </div>
    </div>
  );
}

export default App;
