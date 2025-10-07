//App.js
// 🧩 Import the tools we need from React
import React, { useState, useEffect } from 'react';

// 🌐 Axios helps us make product_app calls (send and receive data from backend)
import axios from 'axios';

function App() {
  // 🧠 These are like small storage boxes inside our app:
  const [products, setProducts] = useState([]);  // stores the list of all products
  const [name, setName] = useState('');          // stores what the user types for "name"
  const [price, setPrice] = useState('');        // stores what the user types for "price"

  // 🟢 This runs *once* when the page first loads
  // It calls our backend (Node.js) to get all products in the database
  useEffect(() => {
    axios.get('http://localhost:5000/product_app/products') // fetch products
      .then(res => setProducts(res.data))  // save them in state
      .catch(err => console.log('Error fetching products:', err));
  }, []);  // the empty [] means it runs only once at the start

  // 🟣 This function runs when someone clicks "Add Product"
  const addProduct = () => {
    // Send the product data to our backend
    axios.post('http://localhost:5000/product_app/products', { name, price })
      .then(res => {
        // Add the new product to our current list (so page updates immediately)
        setProducts([...products, res.data]);
        // Clear the input boxes after saving
        setName('');
        setPrice('');
      })
      .catch(err => console.log('Error adding product:', err));
  };

  // 🖼 What appears on the web page
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2> 🛍 Simple Product App 🛍</h2>

      {/* Input fields for typing product details */}
      <input
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}  // updates name as user types
        style={{ marginRight: '10px', padding: '5px' }}
      />

      <input
        placeholder="Product price"
        value={price}
        onChange={e => setPrice(e.target.value)} // updates price as user types
        type="number"
        style={{ marginRight: '10px', padding: '5px' }}
      />

      <button onClick={addProduct} style={{ padding: '6px 10px' }}>
        ➕ Add Product
      </button>

      <h3 style={{ marginTop: '20px' }}>📦 Product List</h3>

      {/* Display all the products we got from the database */}
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} — ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
