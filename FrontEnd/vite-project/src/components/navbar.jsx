import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100vw;
  background-color: #004E98;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: space-evenly;

  .menu, .cart {
    margin: 0 2rem;
  }

  .menu img {
    width: 2.5rem;
    height: 2.5rem;
  }

  .cart img {
    width: 3rem;
    height: 2.5rem;
  }

  .logo img {
    width: 10rem;
    height: 4rem;
  }
`;

function Navbar() {
  return (
    <HeaderContainer>
      <Link to={`/login`} className="menu">
          <img src="../resources/user.png"/>
      </Link>
      <Link to={`/`} className="logo">
        <img src="../resources/logo.png"/>
      </Link>
      <Link to={`/cart`} className="cart">
          <img src="../resources/cart.png"/>
      </Link>
    </HeaderContainer>
  )
}

export default Navbar