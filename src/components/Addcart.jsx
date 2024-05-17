import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  cartState,
  deleteCart,
  totalCartPrice,
} from "../redux/cartSlice";

function Addcart({ children, product }) {
  const dispatch = useDispatch();
  const { carts } = useSelector(cartState);

  const cart = carts.some((cart) => cart.product === product.id);

  const cartId = carts.find((cart) => cart.product === product.id);

  return (
    <div className="flex blk-md">
      {children}

      {cart ? (
        <button className="btn" onClick={() => dispatch(deleteCart(cartId.id))}>
          {"Remove from cart"}
        </button>
      ) : (
        <button
          className="btn"
          onClick={() => dispatch(addProductToCart(product))}
        >
          {"Add to cart"}
        </button>
      )}

    </div>
  );
}

export function CartAction({ dataId, dataQuantity, incAction, decAction }) {
  const dispatch = useDispatch();

  const handleInc = () => {
    dispatch(incAction({ dataId, update_item: "plus" }));
  };

  const handleDec = async () => {
    await dispatch(decAction({ dataId, update_item: "minus" }));
    dispatch(totalCartPrice());
  };

  return (
    <div className="inc">
      <span role="button" className="plus" onClick={handleInc}>
        +
      </span>
      <span className="quantity">{dataQuantity}</span>
      <span role="button" className="minus" onClick={handleDec}>
        &minus;
      </span>
    </div>
  );
}

export default Addcart;
