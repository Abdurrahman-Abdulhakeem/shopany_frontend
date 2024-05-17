import React from 'react'
import { decrementQueryProduct, incrementQueryProduct } from '../../../redux/productSlice'
import { BASEURL } from "../../../utils/useAxios";
import Addcart, { CartAction } from '../../../components/Addcart';

function QueryProduct({queryProducts, handleProductClick}) {
  return (
    queryProducts.map((product) => (
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
              incAction={incrementQueryProduct}
              decAction={decrementQueryProduct}
            />
          </Addcart>
        </div>
      ))
  )
}

export default QueryProduct