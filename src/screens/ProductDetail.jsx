import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";
import Addcart, { CartAction } from "../components/Addcart";
import Loader from "../components/Loader";

import {
  productState,
  incrementProduct,
  decrementProduct,
  getProduct,
  incrementSimilarProduct,
  decrementSimilarProduct,
} from "../redux/productSlice";

import { BASEURL } from "../utils/useAxios";
import errorToast from "../utils/errorToast";

function ProductDetail() {
  const { currentProduct, similarProducts, error } = useSelector(productState);

  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(similarProducts);

  // const selectedProduct = products.find(
  //   (product) => product.id === parseInt(productId)
  // );

  const handleProductClick = (id) => {
    dispatch(getProduct(id)).then(() => {
      navigate(`/product/${id}`);
    });
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [productId, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      errorToast(error)

        navigate(-1);
    }
  }, [error, navigate]);

  if (!currentProduct) {
    return (
      <Base>
        <Loader />
      </Base>
    );
  }
  return (
    <Base>
      <main className="dashboard">
        <Hamburger />

        <div className="product-container">
          <div className="product-detail card">
            <div className="flex">
              <div>
                <img
                  src={`${BASEURL + currentProduct?.image}`}
                  alt=""
                  className="cover-img"
                />
              </div>

              <div>
                <h1>{currentProduct?.name}</h1>
                <p>{currentProduct?.description}</p>
                <p>
                  ⭐⭐⭐⭐⭐{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {currentProduct?.rating} reviews
                  </span>
                </p>

                <h3>${currentProduct?.price}</h3>

                <Addcart product={currentProduct}>
                  <CartAction
                    dataId={currentProduct.id}
                    dataQuantity={currentProduct.quantity}
                    incAction={incrementProduct}
                    decAction={decrementProduct}
                  />
                </Addcart>
              </div>
            </div>
          </div>

          <div className="products in-detail">
            {/* Check for products in same category with the selected product  */}
            {similarProducts?.length > 0 && (
              <>
                <h2>Similar Products</h2>

                <div className="flex wrap">
                  {similarProducts?.map((product) => (
                    <div className="product" key={product.id}>
                      <img
                        src={`${BASEURL + product?.image}`}
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
                          incAction={incrementSimilarProduct}
                          decAction={decrementSimilarProduct}
                        />
                      </Addcart>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Base>
  );
}

export default ProductDetail;
