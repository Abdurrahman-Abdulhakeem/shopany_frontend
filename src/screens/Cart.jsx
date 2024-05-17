import { CartAction } from "../components/Addcart";
import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";

import {
  cartState,
  getCarts,
  openModal,
  updateCart,
  deleteCart,
  totalCartPrice,
  deleteCarts,
  payoutCarts,
} from "../redux/cartSlice";

import { BASEURL } from "../utils/useAxios";

function Cart() {
  const dispatch = useDispatch();
  const { carts, totalPrice, isModalOpen, loading, paymentLoading } =
    useSelector(cartState);

  // /////if carts.length > 0 to dispatch totalPrice
// console.log(activePaymentReference)
  useEffect(() => {
    if (carts.length > 0) {
      dispatch(totalCartPrice());
    }
  }, [carts, dispatch]);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  const handleDeleteCart = async (deleteCart) => {
    await dispatch(deleteCart);
    dispatch(totalCartPrice());
  };

  return (
    <Base>
      <main className="dashboard">
        <div className="cart">
          <Hamburger />
          <h1>My shopping Cart</h1>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                  <th>Price</th>
                </tr>
              </thead>
              {loading ? (
                <Loader />
              ) : (
                carts?.map((cart) => (
                  <tbody key={cart.id} className="tbody">
                    <td>
                      <img src={BASEURL + cart.image} alt={cart.name} />
                    </td>

                    <td>
                      {cart.name}{" "}
                      <span style={{ marginLeft: "6px" }}>
                        {" "}
                        X{cart.quantity}
                      </span>
                    </td>
                    <td>
                      <CartAction
                        dataId={cart.id}
                        dataQuantity={cart.quantity}
                        incAction={updateCart}
                        decAction={updateCart}
                      />
                    </td>
                    <td
                      style={{ color: "rgb(123, 104, 238)", fontSize: "25px" }}
                    >
                      <span
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteCart(deleteCart(cart.id))}
                      >
                        <AiTwotoneDelete />
                      </span>
                    </td>
                    <td>${cart.price * cart.quantity}</td>
                  </tbody>
                ))
              )}
            </table>
          </div>

          <div className="overview">
            <span>
              <p className="view">
                Delivery <span style={{ marginLeft: "15px" }}>$0.00</span>
              </p>
            </span>
            <span>
              <p className="view">
                Sub total{" "}
                <span style={{ marginLeft: "15px" }}>${totalPrice}</span>
              </p>
            </span>
            <span>
              <p className="view">
                Total <span style={{ marginLeft: "15px" }}>${totalPrice}</span>
              </p>
            </span>

            {carts.length > 0 && (
              <span>
                <p
                  className=" btn"
                  role="button"
                  onClick={() => dispatch(openModal())}
                >
                  Clear cart
                </p>
              </span>
            )}

            {isModalOpen && (
              <Modal text="Are you sure you want to clear the cart?">
                <button className="btn" onClick={() => dispatch(deleteCarts())}>
                  Yes
                </button>
              </Modal>
            )}
          </div>

          <div className="checkout">
            <button className="btn">
              <Link to="/dashboard">Continue shopping</Link>
            </button>

            <button
              type="submit"
              className="btn checkout-btn"
              disabled={paymentLoading}
              onClick={() => dispatch(payoutCarts())}
            >
              {paymentLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </main>
    </Base>
  );
}

export default Cart;
