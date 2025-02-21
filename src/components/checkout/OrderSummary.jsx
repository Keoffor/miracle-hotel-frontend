import React, { useContext, useEffect,useState } from "react";
import moment from "moment";
import { CartContext } from "../contextProviders/CartProvider";
import { paymentCheckout } from "../utils/ApiFunctions";

const OrderSummary = ({isLoaded}) => {

  
  const{cartItems} = useContext(CartContext);
  const [error, setError] = useState("");

   
  const customerCart = cartItems ? cartItems : [];

  useEffect(()=>{},[customerCart]);

  const orderCheckoutRequest = localStorage.getItem("customerCart")
  console.log("isLoading...", isLoaded)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await processPayment();
    }
  };

 const processPayment = async () => {
    await paymentCheckout(orderCheckoutRequest).then((res) => {
      try {
        if (res.status === "INITIATE_PAYMENT") {
          
          window.location.href = res.stripeUrl;
          setError("");
        } else {
          setError(error);
        }
      } catch (error) {
        setError("An error occurred while processing payment.");
      }
    });
  };


  return (
    <>
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your Cart Summary</span>
          {/* <span className="badge bg-primary rounded-pill">{totalCart}</span> */}
        </h4>
        {customerCart.length > 0 ? (
          <>
            <ul className="list-group mb-3">
              {customerCart.map((res, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex flex-column align-items-start lh-sm mt-2"
                >
                  <strong className="my-2 text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="rgb(12, 69, 56)"
                      className="bi bi-house-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                      <path d="m8 3.293 4.72 4.72a3 3 0 0 0-2.709 3.248A2 2 0 0 0 9 13v2H3.5A1.5 1.5 0 0 1 2 13.5V9.293z" />
                      <path d="M13 9a2 2 0 0 0-2 2v1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1v-1a2 2 0 0 0-2-2m0 1a1 1 0 0 1 1 1v1h-2v-1a1 1 0 0 1 1-1" />
                    </svg>
                    {res.roomType}
                  </strong>
                  <strong className="text-body-secondary my-1"> 
                    Status: {res.status}
                  </strong>
                  <strong className="text-body-secondary my-2">
                    Date:{" "}
                    {res.date ? moment(res.date).format("MM Do YYYY") : "N/A"}
                  </strong>

                  <strong className="text-body-secondary my-1 cart-amount">
                    Price: ${res.amount}
                  </strong>
                </li>
              ))}

              <strong>Promo Code Section</strong>
              <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li>

              {/* Total Price Section */}
              <li className="list-group-item d-flex justify-content-between">
              <strong>Total Amount =
               
                  ${customerCart.reduce((total, item) => total + item.amount, 0)}
                </strong>
              </li>
            </ul>

            {/* Promo Code Input */}

            <form className="card p-2" onSubmit={handleSubmit}>
              {isLoaded===false ? (
            <button
                   className="w-100 btn btn-lg btn btn-success"
                   type="submit"
                 >
                   Continue to checkout
                 </button>
                 ) : (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
                 )}
            </form>
          </>
        ) : (
          <div className="total-text">Your cart is empty.</div>
        )}
      </div>
    </>
  );
};

export default OrderSummary;
