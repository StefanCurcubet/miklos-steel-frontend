import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Navbar from './Components/Navbar';
import Basket from './Pages/Basket';
import removeFromLocalStorage from './Utils/removeFromLocalStorage';
import { useEffect, useState } from 'react';

function App() {

  const storedBasket = localStorage.getItem('basket');
  const basketArray = storedBasket ? JSON.parse(storedBasket) : [];
  const basketItemCount = basketArray.length;

  const [products, setProducts] = useState([])
  const [basketItemNr, setBasketItemNr] = useState(basketItemCount)

  useEffect(() => {
    getProducts()
  },[basketItemNr])

  async function getProducts() {
    let response = await fetch('http://127.0.0.1:8000/getProducts/')
    let data = await response.json()
    setProducts(data)
  }

  async function addToBasket(name, orderAmount) {
    const response = await fetch('http://127.0.0.1:8000/addToBasket/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'product_name': name, 'quantity': orderAmount}),
    });
    const data = await response.json()
    if (response.status === 200) {
      if (data.message) {
        alert(data.message)
        window.location.reload()
        return
      }
      const storedBasket = localStorage.getItem('basket')
      const basketArray = storedBasket ? JSON.parse(storedBasket) : []
      basketArray.push(data.hold_id)
      localStorage.setItem('basket', JSON.stringify(basketArray))
      setBasketItemNr((prevNr) => prevNr + 1)
    }
  }

  async function removeFromBasket(id) {
    await fetch(`http://127.0.0.1:8000/removeBasketItem/${id}`,{
      method : "DELETE",
      headers : {
          'Content-type' : 'application/json'
      }
    })
    setBasketItemNr((prevNr) => prevNr - 1)
    removeFromLocalStorage(id)
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage products={products} addToBasket={addToBasket}/>} />
          <Route path='/cos' element={<Basket basketItemNr={basketItemNr} setBasketItemNr={setBasketItemNr} removeFromBasket={removeFromBasket}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
