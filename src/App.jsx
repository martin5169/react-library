import { useState, useEffect } from "react";
import "./App.css";
import { library } from "./book.json";
import ListaLectura from "./components/ListaLectura";
import ListaLibros from "./components/ListaLibros";
import usePersistentStorage from "./usePersistentStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [libros, setLibros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState("todas");
  const [filtroPaginas, setFiltroPaginas] = useState(3000);
  const [lista, setLista] = usePersistentStorage("lista", []);
  const [listaOculta, setListaOculta] = useState(true);

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
    setLista((lista) =>
      lista.filter((libroEnLista) => libroEnLista.title !== libro.title)
    );
  };

  const ocultarLista = () => {
    setListaOculta(!listaOculta);
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
  }, [filtroGenero, filtroPaginas, lista]);

  return (
    <div className="contenido">
      <div className="titulo">
        <h1>
          Library <FontAwesomeIcon icon={faBook} />
        </h1>
      </div>
        <button className="verLista" onClick={ocultarLista}>{listaOculta?"Ocultar lista":"Ver mi lista"}</button>
        
        
      <div className="filtros">
        <InputGroup onChange={buscarPorNombre}>
          <InputGroup.Text id="inputGroup-sizing-default">
            Titulo
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <Form.Label>Límite {filtroPaginas} páginas</Form.Label>
        <Form.Range
          onChange={filtrarPorPaginas}
          min={100}
          max={3000}
          value={filtroPaginas}
          step={100}
        />
        <Form.Select onChange={filtrarGeneros}>
          <option selected disabled hidden>
            Filtra por género
          </option>
          <option value={"todas"}>Todos</option>
          {generos.map((g, index) => (
            <option key={index}>{g}</option>
          ))}
        </Form.Select>
        <h5>{libros.length} libros disponibles</h5>
      </div>
      <div className={listaOculta ? "listas" : "lista-oculta"}>
        <ListaLibros
          libros={libros}
          lista={lista}
          setLista={setLista}
          cargarLista={cargarLista}
          estilo = {listaOculta?"container-libros":"lista-completa"}
        />
        {listaOculta && <ListaLectura lista={lista} eliminar={eliminar} />}
      </div>
    
    </div>
  );
}

export default App;
