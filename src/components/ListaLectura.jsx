import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ListaLectura({ lista, eliminar }) {
  if (lista.length === 0) {
    return (
      <div>

        <p>No hay libros en la lista de lectura</p>
      </div>
    );
  } else {
    return (
      <div className="lectura">
        <h4>LISTA DE LECTURA</h4>
        <p>
          {lista.length > 0
            ? "CANTIDAD: " + lista.length + " LIBROS"
            : "No hay libros en la lista de lectura"}
        </p>
        <div className="containerLectura">
          {lista.map((l, index) => (
            <Card style={{ width: "6.5rem" }} key={index}>
              <Card.Body>
                {/* Add a check for the 'cover' property before rendering */}
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
}

export default ListaLectura;