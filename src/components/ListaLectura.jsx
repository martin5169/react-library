import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function ListaLectura({ lista, eliminar }) {

    return (
      <div className="containerLectura">
        <h4>Lista de lectura</h4>       
          <p>{lista.length > 0
            ? ""
            : "Aún no hay libros cargados."}</p>
          <div className="book-cards">
          {lista.map((l, index) => (
            <Card style={{ width: "6.5rem" }} key={index}>
              <Card.Body>
                {l && l.cover && <Card.Img variant="top" src={l.cover} />}
                <span
                  className="borrar-icon"
                  onClick={() => {
                    eliminar(l);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#ec0909" }} />
                </span>
              </Card.Body>
            </Card>
          ))}
        </div>
        </div>
    );
  
}

export default ListaLectura;