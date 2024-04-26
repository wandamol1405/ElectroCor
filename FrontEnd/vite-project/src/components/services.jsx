import React from "react";
import styled from "styled-components";

const ServicesContainer = styled.div`
  width: 75vw;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  gap: 0.5rem;
  font-size: 1rem;
  display: flex;
  align-self: center;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;

  .metodos-pago,
  .envios-gratis,
  .servicio-tecnico {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }
  .metodos-pago img,
  .servicio-tecnico img {
    width: 4rem;
    height: 4rem;
  }
  .envios-gratis img {
    width: 7rem;
    height: 4rem;
  }

  @media (min-width: 1080px) {
    width: 58vw;
    .metodos-pago img,
    .servicio-tecnico img {
      width: 6rem;
      height: 6rem;
    }
    .envios-gratis img {
      width: 10rem;
      height: 6rem;
    }
    p {
      font-size: 1.1rem;
    }
    .product-title {
      width: 80vw;
    }
  }
`;

function Services() {
  return (
    <ServicesContainer>
      <div className="metodos-pago">
        <img src="../resources/coinp.png" />
        <p>Todos los métodos de pago</p>
      </div>
      <div className="envios-gratis">
        <img src="../resources/truck-removebg-preview.png" />
        <p>Envíos gratis a partir de los $10000</p>
      </div>
      <div className="servicio-tecnico">
        <img src="../resources/tools.png" />
        <p>Servicio técnico</p>
      </div>
    </ServicesContainer>
  );
}

export default Services;
