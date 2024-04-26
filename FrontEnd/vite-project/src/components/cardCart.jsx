import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormButton from "./formButton";
import useCartStore from "../store/useCart";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  width: 74vw;
  border-radius: 10px;
  gap: 2rem;
  padding: 2rem;
  margin: auto;

  img {
    width: 20vw;
  }
  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-content: center;
  }
  .description h5 {
    font-size: 1.4rem;
  }
  .count-price button {
    width: 9vw;
    font-size: 1rem;
    background-color: transparent;
    border: 0;
    text-align: left;
    color: #004e98;
  }
  .description button:hover {
    color: #0e94ca;
  }
  .count-price{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;s
  }
  form{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
  form input {
    width: 60px;
    height: 30px;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    font-size: 1rem;
    text-align: center;
  }
  @media (min-width: 1080px) {
    width:50vw;
    img {
        width: 10vw;
    }
    .description{
        gap:2rem;
    }
      .description h5 {
        font-size: 1.5rem;
      }
      .description button,
      form label {
        font-size: 1.2rem;
      }
      .count-price {
        gap: 1rem;
      }
      .count-price h4 {
        font-size: 1.6rem;
      }
      .resume {
        height: 30vh;
      }
  }
`;

function CardCart({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const { updateItemQuantity, removeItem } = useCartStore();

  const handleChange = (event) => {
    console.log(event.target.value);
    let newQuantity =
      quantity > event.target.value ? quantity - 1 : quantity + 1;
    setQuantity(newQuantity);
    updateItemQuantity(product.id_product, newQuantity);
    console.log(newQuantity);
  };

  console.log(quantity);
  return (
    <CardContainer>
      <div className="image">
        <img src={product.img} />
      </div>
      <div className="description">
        <h5>{product.name}</h5>
        <div className="count-price">
          <form action="product-count">
            <label htmlFor="count">Cantidad:</label>
            <input
              onChange={handleChange}
              defaultValue={quantity}
              type="number"
              name="count"
              min="1"
              max="10"
            />
          </form>
          <FormButton onClick={()=>{removeItem(product.id_product)}}>Eliminar</FormButton>
          <h4>${product.price}</h4>
        </div>
      </div>
    </CardContainer>
  );
}

export default CardCart;
