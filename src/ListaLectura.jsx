import React from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ListaLectura({ lista, eliminar }) {
    if(lista.length==0)
    return <div></div>
    else{
  return (
    
      <div className="lectura">
      <h3>Lista de Lectura</h3>
      <p>
        {lista.length > 0
          ? "CANTIDAD: " + lista.length
          : "No hay libros en la lista de lectura"}
      </p>
      <div className="containerLectura">
        
        {lista.map((l, index) => (
          <Card style={{ width: "6.5rem" }} key={index} className="text-center">
            <Card.Img variant="top" src={l.cover} />
              <span className="borrar-icon" onClick={() => {
                  eliminar(l);
                }}>
                <FontAwesomeIcon icon={faTrash} shake style={{color: "#ec0909",}} />
              </span>
          </Card>
        ))}
      </div>
      </div>
  );
}
}

export default ListaLectura;
