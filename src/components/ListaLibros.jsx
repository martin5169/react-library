import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';

function ListaLibros({libros,cargarLista,lista}) {
    if(libros.length==0)
    return <div> No hay libros</div>
    else{
  return (
    <div className="container-libros">
    {libros && libros.map((l, index) => (
         <Card style={{ width: '10rem' }} key={index} className="text-center"> 
         <Card.Img variant="top" src={l.book.cover}  />
         <Card.Body>
           <Card.Title>{l.book.title}</Card.Title>
           <Card.Text>
            By {l.book.author.name}
           </Card.Text>
           <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ver sinopsis</Accordion.Header>
        <Accordion.Body>
          {l.book.synopsis}
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
           </Card.Body>
           {
           <Button variant="secondary" disabled={lista.includes(l.book)} onClick={()=>{
            cargarLista(l.book)
           }}>{lista.includes(l.book)?"EN LISTA":"AGREGAR"}</Button>
            }
       </Card>
     
    ))}
  </div>
  )
}
}

export default ListaLibros