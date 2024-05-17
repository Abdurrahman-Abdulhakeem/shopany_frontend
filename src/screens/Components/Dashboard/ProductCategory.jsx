import React from "react";
import Addcart, { CartAction } from "../../../components/Addcart";
import {
  decrementProduct,
  incrementProduct,
  productState,
} from "../../../redux/productSlice";
import { useSelector } from "react-redux";
import { BASEURL } from "../../../utils/useAxios";

function ProductCategory({ category, handleProductClick }) {
  const { productsByCategories } = useSelector(productState);
  
  return (
    <div className="products" key={category.id}>
      <h2>{category.name}</h2>

      <div className="flex wrap">
        {productsByCategories[category.id] &&
          productsByCategories[category.id].products.map((product) => (
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
  );
}

export default ProductCategory;
