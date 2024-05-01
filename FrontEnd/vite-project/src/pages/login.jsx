import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "../components/formInput";
import FormButton from "../components/formButton";
import useLogin from "../store/useLogin";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/title";

const LoginContainer = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  width: 95vw;
  padding: 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .form {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    height: 60vh;
  }
  form input {
    width: 40vw;
  }
  .form label {
    font-size: 1.6rem;
  }
  .register {
    text-align: center;
    font-size: 1.1rem;
    margin: 1rem;
  }
  .error {
    font-size: 1.25rem;
    color: red;
  }
  .logout {
    background-color: #FFCCCC;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logout button{
    padding: 1rem 2rem;
    width: 15vw;
    font-size: 1.5rem;
  }

  @media (min-width: 1080px) {
    width: 80vw;
    .form {
      gap: 2rem;
    }
    .register {
      font-size: 1.3rem;
    }
    .form button {
      padding: 1rem 2rem;
      font-size: 1.4rem;
    }
    .form input {
      width: 30vw;
    }
  }
`;

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useLogin();
  const { username } = useLogin();
  const { logout } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFound = false;

    if (!user || user.length < 5) {
      setErrors((prev) => ({
        ...prev,
        user: { message: "Este campo es requerido" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        user: null,
      }));
    }

    if (!password || password.length < 5) {
      setErrors((prev) => ({
        ...prev,
        password: { message: "Ingrese una contraseña de 5 caracteres o más" },
      }));
      errorFound = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: null,
      }));
    }

    if (errorFound) {
      return;
    }

    try {
      const userLogin = { usuario: user, password: password };
      const response = await fetch("http://localhost:3000/users/login", {
        method: "post",
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Ocurrió un error inesperado");
      }

      login(user);
      navigate("/");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: { message: "Credenciales invalidas" },
      }));

      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          form: null,
        }));
      }, 3000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "post"
      });
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Ocurrió un error inesperado");
      }

      logout();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: { message: "Credenciales invalidas" },
      }));

      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          form: null,
        }));
      }, 3000);
    }
  };
  

  return (
    <LoginContainer>
      {username !== "" && (
        <Title className="logout">
          <h1>Para volver a ingresar, debes cerrar session</h1>
          <FormButton onClick={handleLogout}>Cerrar Sesion</FormButton>
        </Title>
      )}
      <Title>
        <h1>Hola! Inicia sesión para continuar</h1>
      </Title>
      {errors.form && <h1 className="error">{errors.form.message}</h1>}
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="user">Usuario:</label>
          <FormInput
            type="text"
            name="user"
            placeholder="Ej: wandamol14"
            onChange={(e) => setUser(e.target.value)}
          />
          {errors.user && <p className="error">{errors.user.message}</p>}
          <label htmlFor="password">Contraseña:</label>
          <FormInput
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <FormButton type="submit">Ingresar</FormButton>
        </div>
      </form>
      <p className="register">
        Si todavía no estás registrado,{" "}
        <Link to={"/register"}>clickea aquí</Link>
      </p>
    </LoginContainer>
  );
}

export default Login;
