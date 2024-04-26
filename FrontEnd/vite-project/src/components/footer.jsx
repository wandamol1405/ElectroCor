import React from 'react'
import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: #3A6EA5;
    width: 100vw;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    color: #FFFFFF;
    padding: 1rem;
    font-family: 'Roboto Flex Normal';
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap:1.5rem;
    align-items: center;

h6{
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
}
p{
    text-align: center;
    font-size: 1rem;
}
.redes{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
}
button{
    font-size: 1rem;
    background-color: transparent;
    border: 0;
    color: #FFFFFF;
}
button:hover{
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}`

function Footer() {
  return (
    <FooterContainer>
        <h6>Redes</h6>
        <div className="redes">
            <button>Instagram</button>
            <button>Facebook</button>
        </div>
        <p>Todos los derechos reservados</p>
    </FooterContainer>
  )
}

export default Footer