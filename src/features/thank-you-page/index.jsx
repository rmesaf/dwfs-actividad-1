// Packages
import React from 'react';

// App
import Container from 'shared/components/Container';
import Link from 'shared/components/Link';

import Thanks_Image from './thanks.svg';

// Styles
import './styles.scss';

function ThankYouPage() {
  return (
    <main className="agradecimiento__principal">
      <Container className="agradecimiento__contenido">
        <section className="agradecimiento__mensaje">
          <h1>Gracias por tu compra</h1>
          <p>
            Puedes consultar el estado de tu pedido revisando tu historial de pedidos.
          </p>

          <div className="agradecimiento__acciones">
            <button className="boton--pedidos">Mis pedidos</button>
            <Link to="/catalog" className="boton--seguircomprando">
              Seguir comprando
            </Link>
          </div>
        </section>

        <section className="agradecimiento__imagen">
          <img
            src={Thanks_Image}
            alt="Imagen de agradecimiento"
            className="imagen-mensaje"
          />
        </section>
      </Container>
    </main>
  );
}

export default ThankYouPage;
