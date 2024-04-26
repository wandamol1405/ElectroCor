import React, { useEffect, useState } from "react";
import CardCart from "../components/cardCart";
import useCartStore from "../store/useCart";
import styled from "styled-components";

const CartContainer = styled.section`
  box-sizing: border-box;
  background-color: #ebebeb;
  font-family: "Roboto Flex Normal";
  color: #4b484d;
  display: flex;
  flex-direction: column;
  align-items: center;

  .buy-cart,
  .resume {
    padding: 1.5rem;
    background-color: #ffffff;
    margin: 1rem;
    border-radius: 10px;
    width:75vw;
  }
  .buy-cart, h2 {
    text-align: center;
    font-size: 1.6rem;
  }
  .count-price h4 {
    font-size: 1.4rem;
  }
  .resume{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .resume table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 1rem;
    font-size: 1.4rem;
  }
  .products-description{
    display: flex;
    flex-direction: column;
    gap:1rem;
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
  .resume button {
    display: block;
    margin: 20px auto;
    border-radius: 10px;
    border: 0;
    font-size: 1.3rem;
    padding: 1rem 2rem;
    color: #ffffff;
    background-color: #004e98;
  }
  .resume button:hover {
    background-color: #006e98;
  }
  @media (min-width: 1080px) {
    height: 100vh;
    .buy-cart, h2 {
      font-size: 1.5rem;
    }
    .products {
      display: flex;
      flex-direction: row;
      align-items:center;
    }
    .products img {
      width: 10vw;
    }
    .resume {
      width:20vw;
    }
  }
`;

function Cart() {
  const { items } = useCartStore();
  const [price, setPrice] = useState(0);
  const products = Object.values(items);
  const costDelivery = "2000";

  useEffect(() => {
    const totalPrice = products.reduce((acc, p) => acc + parseFloat(p.price)*parseInt(p.quantity), 0);
    setPrice(totalPrice);
  }, [products]);

  return (
    <CartContainer>
      <div className="buy-cart">
        <h3>Carrito de compras</h3>
      </div>
      <div className="products">
        <div className="products-description">
          {products.map((p) => (
            <CardCart
              key={p.id_product}
              product={p}
            />
          ))}
        </div>
        <div className="resume">
            <h2>Resumen de compra</h2>
          <table>
            <tbody>
              <tr>
                <td>Productos</td>
                <td>${price}</td>
              </tr>
              <tr>
                <td>Envío</td>
                <td>{price > 10000 || price == 0 ? "Gratis" : `$${costDelivery}`}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>${price + (price > 10000 || price == 0 ? 0 : parseFloat(costDelivery))}</th>
              </tr>
            </tbody>
          </table>
          <button className="submit">Continuar con la compra</button>
        </div>
      </div>
    </CartContainer>
  );
}

export default Cart;
