// Packages
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// App
import Container from 'shared/components/Container';
import Link from 'shared/components/Link';
import useCatalog from 'features/catalog/hooks/useCatalog.js';

// Styles
import './styles.scss';

function ProductPage() {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState('details');

  // Utilizamos la misma query que en Catalog
  const { books, isLoading, error } = useCatalog({ query: 'subject:fiction' });

  if (isLoading) return <p>Cargando libro...</p>;
  if (error) return <p>Error: {String(error.message)}</p>;

  // Buscamos dentro de la lista de libros del productId correspondiente
  const book = books.find((b) => b.id === productId);

  if (!book) {
    return (
      <Container className="product">
        <p>Libro no encontrado.</p>
        <Link to="/catalog">Volver al catálogo</Link>
      </Container>
    );
  }

  return (
    <Container className="producto">
      <Link to="/catalog">Go Back</Link>
      <br />
      <Link to="/thank-you-page">Thank You (quitar de aquí, es solo para probar)</Link>

      <div className="detalle-producto">
        <div className="detalle-producto__arriba">
          <div className="detalle-producto__ruta">
            <span>Home</span>
            <span>&gt;</span>
            <span>Literatura</span>
            <span>&gt;</span>
            <span>{book.title}</span>
          </div>

          <section className="detalle-producto__principal">
            <div className="detalle-producto__imagen">
                {book.thumbnail && (<img src={book.thumbnail} alt={book.title} />)}
            </div>

            <div className="detalle-producto__info">
              <p className="detalle-producto__categoria">
                {book.categories?.[0] ?? 'Sin categoría'}
              </p>

              <h2 className="detalle-producto__titulo">{book.title}</h2>

              <p className="detalle-producto__autor">{book.authors}</p>

              <div className="detalle-producto__fila-precio">
                <p className="detalle-producto__editorial">
                  <span className="etiqueta">Editorial:</span>{' '}
                  {book.publisher || 'Desconocida'}
                </p>

                <p className="detalle-producto__precio">${book.price}</p>
              </div>
                <p className="detalle-producto__stock">En Stock</p>
            

              <p className="detalle-producto__subtitulo">Sinopsis:</p>
              <p className="detalle-producto__resumen">
                {book.description || 'Sin descripción disponible.'}
              </p>

              <div className="detalle-producto__acciones">
                <div className="selector-cantidad">
                  <button>-</button>
                  <span>2</span>
                  <button>+</button>
                </div>

                <button className="boton-añadir-carrito">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="detalle-producto__pestañas">
          <div className="encabezado-pestañas">
            <button
              className={`pestana ${
                activeTab === 'details' ? 'pestana--activa' : ''
              }`}
              onClick={() => setActiveTab('details')}
            >
              Detalles del producto
            </button>
            <button
              className={`pestana ${
                activeTab === 'reviews' ? 'pestana--activa' : ''
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reseñas
            </button>
          </div>

          <div className="contenido-pestañas">
            {activeTab === 'detalles' && (
              <p className="placeholder-pestañas">
                Información técnica del producto.
              </p>
            )}

            {activeTab === 'reseñas' && (
              <p className="placeholder-pestañas">
                Aquí aparecerán las reseñas de los usuarios.
              </p>
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}

export default ProductPage;