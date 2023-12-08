import React, { useState } from 'react';
import MensTshirtImage from './image/mens_tshirt.jpg';
import UnisexJoggerImage from './image/jogger.jpg';
import ShoesImage from './image/shoes.jpg';
import BagImage from './image/bags.jpg';


const products = [
  { id: 1, name: 'Mens T-shirt', price: 100.99, stock: 5, image: MensTshirtImage },
  { id: 2, name: 'Unisex Plain Jogger Pants', price: 200, stock: 3, image: UnisexJoggerImage},
  { id: 3, name: 'Shoes', price: 1500, stock: 10, image: ShoesImage},
  { id: 4, name: 'Bags', price: 1900, stock: 15, image: BagImage}
  
  // ... other products with their respective images
];

const TransManagement = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = (product) => {
    if (product.stock > 0) {
      const existingItemIndex = cart.findIndex((item) => item.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      product.stock -= 1;
      setMessage('Thank you for your purchase!');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      setMessage('Sorry, this product is out of stock.');
    }
  };
  
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };
  
  const showBuyNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '20px' }}>
      <h2 style={{ fontSize: '30px', marginBottom: '10px' }}>Available Products:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) =>
          product.stock > 0 ? (
            <li key={product.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', fontSize: '25px' }}>
              <div style={{ marginRight: '25px' }}>
                <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', boarderRadius: '10px' }} />
              </div>
              <div>
                <span>
                  {product.name} - ₱{product.price.toFixed(2)} | Stock: {product.stock}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: 'blue',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                    fontSize: '20px'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ) : null
        )}
      </ul>
      </div>
      <h2 style={{ fontSize: '40px', marginRight: '70px', marginBottom: '200px'}}>Cart:</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '25px'}}>
        {cart.map((cartItem) => (
          <li key={cartItem.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', height: '250px'}}>
             <div style={{ marginRight: '20px' }}>
              <img src={cartItem.image} alt={cartItem.name}/>
            </div>
            <div>
              {cartItem.name} - ₱{cartItem.price.toFixed(2)} | Quantity:
              <button onClick={() => decreaseQuantity(cartItem.id)} 
              style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginRight: '5px',
                  margin: '5px',
                  fontSize: '20px'
                }}>-</button>
              <span style={{ 
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '3px',
                margin: '0 5px',
              }}>
                {cartItem.quantity}
              </span>
              <button onClick={() => increaseQuantity(cartItem.id)} 
              style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginLeft: '5px',
                  margin: '5px',
                  fontSize: '20px'
                }}>+</button>
          
                  <button  onClick={() => {showBuyNotification();}} 
                     style={{margin: '7px', borderRadius: '10px', fontSize: '20px'}}>
                      Buy Now
                  </button> 
                  <button onClick={() => removeFromCart(cartItem.id)}>
                      Cancel
                  </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Notification */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: '9999'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default TransManagement;
