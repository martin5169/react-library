import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';

function ListaLibros({libros,cargarLista,lista,estilo}) {
    if(libros.length==0)
    return <div> No hay libros</div>
    else{
  return (
    <div className={estilo}>
    {libros && libros.map((l, index) => (
         <Card style={{ width: '11rem' }} key={index} className="text-center"> 
         <Card.Img variant="top" src={l.book.cover}  />
         <Card.Body>
           <Card.Title>{l.book.title}</Card.Title>
           <Card.Text>
            By {l.book.author.name}
           </Card.Text>
           <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ver Detalles</Accordion.Header>
        <Accordion.Body>
          <p>Páginas: {l.book.pages}</p>
          <p>{l.book.synopsis}</p>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
           </Card.Body>
           {
           <Button variant="secondary" disabled={lista.some((libro)=> libro.title === l.book.title)} onClick={()=>{
            cargarLista(l.book)
           }}> {lista.some((item) => item.title === l.book.title) ? "EN LISTA" : "AGREGAR"}</Button>
            }
       </Card>
     
    ))}
  </div>
  )
}
}

export default ListaLibros