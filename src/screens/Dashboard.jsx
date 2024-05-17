import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";
import Loader from "../components/Loader";

import {
  getProduct,
  getSearchProducts,
  productState,
  setQuery,
  resetQuery,
} from "../redux/productSlice";
import { cartState, getCarts } from "../redux/cartSlice";
import { getProducts } from "../redux/productSlice";
import { categoryState, getCategories } from "../redux/categorySlice";
import { getUserState } from "../redux/getUserSlice";

import QueryProduct from "./Components/Dashboard/QueryProduct";
import ProductCategory from "./Components/Dashboard/ProductCategory";
import { BASEURL } from "../utils/useAxios";

function Dashboard() {
  const { loading, queryProducts, query, bestSelling, recentProducts } =
    useSelector(productState);
  const { categories } = useSelector(categoryState);
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
    if (userData) {
      dispatch(getProducts());
      dispatch(getCarts());
      dispatch(getCategories());
    }
  }, [userData, dispatch]);

  const handleSearch = (event) => {
    const query = event.target.value;
    dispatch(setQuery(query));
    if (query?.length > 0) {
      dispatch(getSearchProducts(query));
    } else {
      dispatch(resetQuery());
    }
  };

  const handleCancelSearch = () => {
    dispatch(setQuery(""));
    dispatch(resetQuery());
  };


  return (
    <Base>
      {loading ? (
        <Loader />
      ) : (
        <>
          {addCartLoading && <Loader />}
          <main className="dashboard">
            <div className="flex search">
              <Hamburger />

              <input
                type="text"
                placeholder="Search any"
                value={query}
                onChange={handleSearch}
              />
              {query?.length > 0 && (
                <div className="set-search-cancel">
                  <p
                    className="cancel-search"
                    role="button"
                    onClick={handleCancelSearch}
                  >
                    &times;
                  </p>
                </div>
              )}

              <button className="btn" type="submit">
                Search
              </button>
            </div>

            <h1>Welcome {userData?.first_name}</h1>
            <div className="products">
              {queryProducts.length > 0 && <h2>This what we have for you!</h2>}

              {query?.length > 0 ? (
                queryProducts.length > 0 ? (
                  <div className="flex wrap">
                    <QueryProduct
                      queryProducts={queryProducts}
                      handleProductClick={handleProductClick}
                    />
                  </div>
                ) : (
                  <div className="empty-product">
                    <h1>No product matching your search</h1>
                  </div>
                )
              ) : (
                categories.map((category) => (
                  <ProductCategory
                    category={category}
                    handleProductClick={handleProductClick}
                  />
                ))
              )}
            </div>
          </main>

          <section className="last-bar">
            <div className="recently card">
              <h2>Recently Added</h2>

              <div className="products">
                {recentProducts?.map((product) => (
                  <div
                    className="product flex"
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={BASEURL + product.image} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>
                        ⭐⭐⭐⭐⭐{" "}
                        <span style={{ marginLeft: "10px" }}>
                          {product.rating}
                        </span>
                      </p>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="best-selling card">
              <h2>Best Selling</h2>

              <div className="products">
                {bestSelling?.map((product) => (
                  <div
                    className="product flex"
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={BASEURL + product.image} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>
                        ⭐⭐⭐⭐⭐{" "}
                        <span style={{ marginLeft: "10px" }}>
                          {product.rating}
                        </span>
                      </p>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </Base>
  );
}

export default Dashboard;
