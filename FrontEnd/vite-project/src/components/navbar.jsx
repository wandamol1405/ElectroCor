import React from 'react'
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100vw;
  background-color: #004E98;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: space-evenly;

  button {
    background-color: transparent;
    border: 0;
  }

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
      <div className="menu">
        <button>
          <img src="../resources/user.png"/>
        </button>
      </div>
      <div className="logo">
        <img src="../resources/logo.png"/>
      </div>
      <div className="cart">
        <button>
          <img src="../resources/cart.png"/>
        </button>
      </div>
    </HeaderContainer>
  )
}

export default Navbar