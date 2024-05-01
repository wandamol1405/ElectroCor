import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../components/title";
import useCartStore from "../store/useCart";
import FormButton from "../components/formButton";
import parsePrice from "../fuctions/parsePrice";
import useLogin from "../store/useLogin";

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
  const [totalPrice, setTotalPrice] = useState(0);
  const products = Object.values(items);
  const costDelivery = "2000";
  const [confirmed, setConfirmed] = useState(false);
  const { username } = useLogin();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);

  async function getUser() {
    const response = await fetch(
      "http://localhost:3000/users/confirm-buy/" + username
    );
    const prod = await response.json();
    setUser(prod.data);
  }

  useEffect(() => {
    const totalProductsPrice = products.reduce(
      (acc, p) => acc + parseFloat(p.price) * parseInt(p.quantity),
      0
    );
    setPrice(totalProductsPrice);
    const totalPrice =
      totalProductsPrice + (totalProductsPrice < 10000 ? parseFloat(2000) : 0);
    setTotalPrice(totalPrice);
    getUser();
  }, []);

  async function handleSubmit() {
    try {
      const newSaleOrder = { id_user: user.id_user, date_order: new Date(), total_order: totalPrice, products };
      const response = await fetch("http://localhost:3000/sale-order", {
        method: "post",
        body: JSON.stringify(newSaleOrder),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Ocurrió un error inesperado");
      }
      setConfirmed(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: { message: "Error desde BackEnd" },
      }));
  }
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
                <td>
                  ${parsePrice(parseFloat(p.price) * parseInt(p.quantity))}
                </td>
              </tr>
            ))}
            <tr>
              <td>Envío</td>
              <td>
                {price > 10000 || price == 0
                  ? "Gratis"
                  : `$${parsePrice(costDelivery)}`}
              </td>
            </tr>
            <tr>
              <td>Domicilio de entrega</td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <th>Total</th>
              <th>${parsePrice(totalPrice)}</th>
            </tr>
          </tbody>
        </table>
        <FormButton onClick={handleSubmit}>Confirmar pedido</FormButton>
        {confirmed && (
          <Title style={{ width: "30rem" }}>
            <h1>Pedido realizado</h1>
            <p style={{ fontSize: "1.5rem" }}>
              Un vendedor se contactará contigo
            </p>
          </Title>
        )}
      </div>
    </Resume>
  );
}

export default ConfirmBuy;
