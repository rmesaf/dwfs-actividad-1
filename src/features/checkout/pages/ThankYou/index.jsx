// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// App
import Button from 'shared/components/Button';
import Container from 'shared/components/Container';
import ThanksImage from 'assets/images/thanks.svg';

// Styles
import './styles.scss';

function ThankYouPage() {

      const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

      useEffect(() => {
          const interval = setInterval(() => {
              setCountdown(prev => prev - 1);
          }, 1000);
  
          return () => clearInterval(interval);
      }, []);
  
      useEffect(() => {
          if (countdown === 0) {
              navigate('/catalog');
          }
      }, [countdown, navigate]);

  return (
    <Container className="thank-you">
      <section className="thank-you__message">
        <h1>Gracias por tu compra</h1>
        <p>
          Puedes consultar el estado de tu pedido revisando tu historial de pedidos.
        </p>

        <div className="thank-you__actions">
          {/* <Button>Mis pedidos</Button> */}
          <Button variant='outline' href="/catalog">Seguir comprando</Button>
        </div>
        <p className='welcome__countdown'>Redirigiendo en {countdown} segundos...</p>
      </section>

      <section className="thank-you__image">
        <img
          src={ThanksImage}
          alt="Imagen de agradecimiento"
          className="message-image"
        />
      </section>
    </Container>
  );
}

export default ThankYouPage;