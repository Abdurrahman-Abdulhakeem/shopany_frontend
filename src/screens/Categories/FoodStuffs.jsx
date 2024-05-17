import Base from "../../components/Base";
import Addcart, { CartAction } from "../../components/Addcart";
import { Hamburger } from "../../components/Sidebar";
import Loader from "../../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  decrementProduct,
  getProduct,
  getProductByCategory,
  incrementProduct,
  productState,
} from "../../redux/productSlice";
import { cartState } from "../../redux/cartSlice";
import { getUserState } from "../../redux/getUserSlice";

import { BASEURL } from "../../utils/useAxios";

function FoodStuffs() {
  const { loading, productCategory } = useSelector(productState);
  const { loading: addCartLoading } = useSelector(cartState);
  const { userData } = useSelector(getUserState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = (id) => {
    dispatch(getProduct(id)).then(() => {
      navigate(`/product/${id}`);
    });
  };

  useEffect(() => {
    dispatch(getProductByCategory("Foodstuffs"));
  }, [dispatch]);

  return (
    <Base>
      {loading ? (
        <Loader />
      ) : (
        <>
          {addCartLoading && <Loader />}
          <main className="dashboard category">
            <div className="flex search">
              <Hamburger />

            </div>

            <h1>Welcome {userData?.first_name}</h1>

            <div className="products">
              <h2>{productCategory?.category}</h2>

              <div className="flex wrap">
                {productCategory.data?.map((product) => (
                  <div className="product" key={product.id}>
                    <img
                      src={BASEURL + product.image}
                      alt={product.name}
                      onClick={() => handleProductClick(product.id)}
                      className="open-prod-detail"
                    />
                    <div
                      className="flex blk-md open-prod-detail"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                      </div>

                      <div className="rm-md">
                        <p>⭐⭐⭐⭐⭐</p>
                        <p>{product.rating}</p>
                      </div>
                    </div>

                    <Addcart product={product}>
                      <CartAction
                        dataId={product.id}
                        dataQuantity={product.quantity}
                        incAction={incrementProduct}
                        decAction={decrementProduct}
                      />
                    </Addcart>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </Base>
  );
}

export default FoodStuffs;
