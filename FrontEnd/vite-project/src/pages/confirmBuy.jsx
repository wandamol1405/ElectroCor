import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../components/title";
import useCartStore from "../store/useCart";
import FormButton from "../components/formButton";

const Resume = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  width: 75vw;
  margin: auto;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 10px;
    background-color: #ffffff;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 1rem;
    font-size: 1.4rem;
  }
  th:first-child {
    text-align: left;
  }
  td:last-child {
    text-align: right;
  }
  th:last-child {
    text-align: right;
  }
  button {
    font-size: 1.3rem;
    padding: 1rem;
  }
  @media (min-width: 1080px) {
    width: 40vw;
  }
`;

function ConfirmBuy() {
  const { items } = useCartStore();
  const [price, setPrice] = useState(0);
  const products = Object.values(items);
  const costDelivery = "2000";
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const totalPrice = products.reduce(
      (acc, p) => acc + parseFloat(p.price).toFixed(2) * parseInt(p.quantity),
      0
    );
    setPrice(totalPrice);
  }, [products]);

  function handleSubmit(){
    setConfirmed(true);
  }

  return (
    <Resume>
      <div className="container">
        <Title style={{ width: "30rem" }}>
          <h1>Confirmación de compra</h1>
        </Title>
        <table>
          <tbody>
            <td>Productos</td>
            {products.map((p) => (
              <tr>
                <td>{p.name}</td>
                <td>${parseFloat(p.price).toFixed(2) * parseInt(p.quantity)}</td>
              </tr>
            ))}
            <tr>
              <td>Envío</td>
              <td>
                {price > 10000 || price == 0 ? "Gratis" : `$${costDelivery}`}
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <th>
                $
                {price +
                  (price > 10000 || price == 0 ? 0 : parseFloat(costDelivery))}
              </th>
            </tr>
          </tbody>
        </table>
        <FormButton onClick={handleSubmit}>Confirmar pedido</FormButton>
        {confirmed&&<Title style={{ width: "30rem" }}><h1>Pedido realizado</h1><p style={{fontSize: "1.5rem"}}>Un vendedor se contactará contigo</p></Title>}
      </div>
    </Resume>
  );
}

export default ConfirmBuy;
