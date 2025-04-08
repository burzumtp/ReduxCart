import { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ShopCart/productSlice";
import { addToCart } from "../features/ShopCart/cartSlice";
const ProductList = () => {
  // const [products, setProducts] = useState([]);
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status == "loading") {
    return <p>Loading Products...</p>;
  }

  if (status == "failed")
    return <p>Failed to load the products. Please try again</p>;

  return (
    <>
      <Navbar />
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.title}>
            <img src={product.image} alt={product.title} />
            <h2>
              {product.title.length > 20
                ? `${product.title.slice(0, 20)}...`
                : product.title}
            </h2>
            <p>Price : ${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
