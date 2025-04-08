import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  applyTempUpdates,
  removeFromCart,
  updateTempQuantity,
} from "../features/ShopCart/cartSlice";

const Cart = () => {
  const {
    items: cartItems,
    tempItems,
    totalPrice,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateTempQuantity({ id, quantity }));
  };

  const handleApplyUpdates = (id) => {
    // tempItems.forEach((item) => {
    //   dispatch(applyTempUpdates(item.id));
    // });

    dispatch(applyTempUpdates(id));
  };
  return (
    <div className="wrapper">
      <div className="cart-page-container">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h3>Your Cart is Empty</h3>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        ) : (
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.map((cartitem) => (
              <div className="cart-item" key={cartitem.id}>
                <img src={cartitem.image} alt={cartitem.title} />
                <div className="cart-item-details">
                  <h3>{cartitem.title}</h3>
                  <p>Price : ${cartitem.price}</p>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={
                        tempItems.find(
                          (tempItem) => tempItem.id === cartitem.id
                        )?.quantity || cartitem.quantity
                      }
                      onChange={(e) =>
                        handleUpdateQuantity(
                          cartitem.id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <button onClick={() => handleApplyUpdates(cartitem.id)}>
                      Update{" "}
                    </button>
                    <button onClick={() => handleRemoveItem(cartitem.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <p>Total : ${totalPrice.toFixed(3)}</p>
            </div>
            <button className="back-button" onClick={() => navigate("/")}>
              Back to shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
