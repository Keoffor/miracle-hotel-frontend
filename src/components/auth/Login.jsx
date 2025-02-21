import React, { useContext, useState, useEffect } from "react";
import { loginUser,findBookingRoomsByEmailAndCustomerId } from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextProviders/AuthProvider";
import {CartContext} from "../contextProviders/CartProvider";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
    const[email, setEmail] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useContext(AuthContext);
  const {updateCart,updateCustomerId, customerId} = useContext(CartContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

 
  useEffect(() => {
    if (email && customerId) {
        console.log("Triggering API with:", email, customerId);
        handleCustomerChart(email, customerId);
    }
}, [email, customerId]);

useEffect(() => {},[customerId])

const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);

    if (success) {
        updateCustomerId(`${success.id}`);
        setEmail(success.email);
        handleLogin(success.token);
        localStorage.setItem("customerId", success.id.toString());
        navigate("/");

        // Delay execution of handleCustomerChart to ensure state updates first
        
            handleCustomerChart(success.email, success.id);
        
    } else {
        setErrorMessage("Invalid username or password. Please try again");
    }

    setTimeout(() => {
        setErrorMessage("");
    }, 5000);
};

const handleCustomerChart = async (email, customerId) => {
    try {
        const res = await findBookingRoomsByEmailAndCustomerId(email, customerId);

        //update global state of cartItems
        updateCart(res);
    } catch (error) {
        console.error("Error fetching booking rooms:", error.message);
    }
};


  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
        </div>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={login.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={login.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet? <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
