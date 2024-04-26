import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FormButton from "../components/formButton";

const ProductDetailContainer = styled.section`
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10px;
  width: 75vw;
  padding: 2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Flex Normal";

  .product-img img {
    width: 85vw;
  }
  .product-general {
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .buttons button {
    border-radius: 10px;
    border: 0;
    font-size: 1.5rem;
    padding: 0.8rem;
    color: #ffffff;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-detail {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
  }
  .buy {
    background-color: #004e98;
  }
  .buy:hover {
    background-color: #006e98;
  }
  .toCart {
    background-color: #3a6ea5;
  }
  .toCart:hover {
    background-color: #3a7ea5;
  }
  button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1080px) {
    width: 80vw;
    padding: 4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5rem;

    .product-img img {
      width: 35vw;
    }

    .buttons button {
      padding: 1.2rem;
    }
    .buttons {
      margin-top: 4vh;
    }

    margin: auto; 
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getProducts() {
      const result = await fetch("http://localhost:3000/products/" + id);
      const response = await result.json();
      setProduct(response.data);
    }
    getProducts();
  }, []);
  return (
    <ProductDetailContainer>
      <div className="product-img">
        <img src={product?.img} />
      </div>
      <div className="product-general">
        <div className="product-detail">
          <h1 style={{ fontSize: "1.7rem" }}>{product?.name}</h1>
          <h2 style={{ fontSize: "2rem" }}>${product?.price}</h2>
        </div>
        <div className="buttons">
          <FormButton className="buy">Comprar ahora</FormButton>
          <FormButton className="toCart">Agregar al carrito</FormButton>
          <div className="product-detail">
            <h4 style={{ fontSize: "2rem", textAlign:"center"}}>Especificaciones</h4>
            <p style={{ fontSize: "1.5rem" }}>
              {product?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
            </p>
          </div>
        </div>
      </div>
    </ProductDetailContainer>
  );
}

export default ProductDetail;
