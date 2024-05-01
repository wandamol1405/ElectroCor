import React, { useEffect, useState } from "react";
import CardCart from "../components/cardCart";
import useCartStore from "../store/useCart";
import styled from "styled-components";
import Title from "../components/title";
import useLogin from "../store/useLogin";
import FormButton from "../components/formButton";
import { useNavigate } from "react-router-dom";
import parsePrice from "../fuctions/parsePrice";

const CartContainer = styled.section`
  box-sizing: border-box;
  background-color: #ebebeb;
  font-family: "Roboto Flex Normal";
  color: #4b484d;
  display: flex;
  flex-direction: column;
  align-items: center;

  .resume {
    padding: 1.5rem;
    background-color: #ffffff;
    margin: 1rem;
    border-radius: 10px;
    width: 75vw;
  }
  h2 {
    text-align: center;
    font-size: 1.6rem;
  }
  .resume {
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
  .products-description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
  }
  @media (min-width: 1080px) {
    height: 100vh;
    h2 {
      font-size: 1.5rem;
    }
    .products {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .products img {
      width: 10vw;
    }
    .resume {
      width: 20vw;
    }
  }
`;

function Cart() {
  const { items } = useCartStore();
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const products = Object.values(items);
  const costDelivery = "2000";
  const { username } = useLogin();
  const navigate = useNavigate();
  const [cantBuy, setCantBuy] = useState(false);
  const [withoutProducts, setwithoutProducts] = useState(false);

  function handleSubmit() {
    if (!username||username=="admin") {
      setCantBuy(true);
    } else if (!price) {
      setwithoutProducts(true);
    } else {
      navigate("/confirmBuy");
    }
  }

  useEffect(() => {
    const totalProductsPrice = products.reduce(
      (acc, p) => acc + parseFloat(p.price) * parseInt(p.quantity),
      0
    );
    setPrice(totalProductsPrice);
    const totalPrice = totalProductsPrice+((totalProductsPrice>10000||totalProductsPrice==0)?0:parseFloat(2000));
    setTotalPrice(totalPrice);
  }, [products]);

  return (
    <CartContainer>
      <Title>
        <h1>Carrito de compras</h1>
      </Title>
      {cantBuy && <Title style={{backgroundColor: "#FFCCCC"}}>{username=="admin"?<h2>No debe ingresar como admin para comprar</h2>:<h2>Debe ingresar para realizar la compra</h2>}</Title>}
      {withoutProducts && <Title style={{backgroundColor: "#FFCCCC"}}><h1>No hay productos en el carrito</h1></Title>}
      <div className="products">
        <div className="products-description">
          {products.map((p) => (
            <CardCart key={p.id_product} product={p} />
          ))}
        </div>
        <div className="resume">
          <h2>Resumen de compra</h2>
          <table>
            <tbody>
              <tr>
                <td>Productos</td>
                <td>${parsePrice(price)}</td>
              </tr>
              <tr>
                <td>Envío</td>
                <td>
                  {price > 10000 || price == 0 ? "Gratis" : `$${parsePrice(costDelivery)}`}
                </td>
              </tr>
              <tr>
                <th>Total</th>
                <th>
                  $
                  {parsePrice(totalPrice)}
                </th>
              </tr>
            </tbody>
          </table>
          <FormButton onClick={handleSubmit}>
            Continuar con la compra
          </FormButton>
        </div>
      </div>
    </CartContainer>
  );
}

export default Cart;
