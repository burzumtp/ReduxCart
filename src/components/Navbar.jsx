import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { items } = useSelector((state) => state.cart);
  return (
    <nav>
      <h1>Shopping Cart </h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({items.length})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
